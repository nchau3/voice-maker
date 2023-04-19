import { useState } from "react";
import createNoteTable from "../utils/noteTable";
import voiceLibrary from "../utils/voiceSelect";
import delayInSeconds from "../utils/delay-in-seconds";

//set up context and main nodes
const audioContext = new AudioContext();
const mainGainNode = audioContext.createGain();
const splitterNode = audioContext.createChannelSplitter();
const compressorNode = new DynamicsCompressorNode(audioContext, {
  attack: 0.001,
  threshold: -55
});

//routing
splitterNode.connect(audioContext.destination);
compressorNode.connect(splitterNode);
mainGainNode.connect(compressorNode);

//note frequencies array
const noteFreq = createNoteTable();

//set empty octave objects to manage active pitches
const oscList: any[] = [];

for (let i = 0; i < 9; i++) {
  oscList[i] = {};
  const noteIds = [
    "A",
    "Ab",
    "B",
    "Bb",
    "C",
    "C#",
    "D",
    "E",
    "Eb",
    "F",
    "F#",
    "G",
  ];
  for (const noteId of noteIds) {
    oscList[i][noteId] = [];
  }
}

export default function useAudioContext() {
  const [sliders, setSliders] = useState({
    masterGain: 0.1048
  });

  const [voice, setVoice] = useState(voiceLibrary[1]);
  const [octaveModifier, setOctaveModifier] = useState(0);

  mainGainNode.gain.value = sliders.masterGain / 10;

  const changeSliders = (slider: string, newValue: number) => {
    setSliders(prev => ({...prev, [slider]: newValue}));
  };

  const convertOctave = (modifier: number) => {
    switch (modifier) {
      case -2:
        return 0.25;
      case -1:
        return 0.5;
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return 4;
      default:
        return 0;
    }
  };

  const playTone = (freq: number) => {
    const actualFreq = freq * convertOctave(octaveModifier);
    const harmonics = voice.harmonics;
    const attack = voice.envelope.attack;

    const voiceNode = audioContext.createChannelMerger(harmonics.length);

    for (let i = 1; i <= harmonics.length; i++) {
      //stack oscillators according to specified harmonics
      const osc = audioContext.createOscillator();

      //multiples of fundamental frequency
      osc.frequency.value = actualFreq * i;

      //set gain of each harmonic
      const oscGainNode = audioContext.createGain();
      oscGainNode.gain.value = voice.harmonics[i - 1];

      osc.connect(oscGainNode);
      osc.start();
      oscGainNode.connect(voiceNode);
    }

    // We make a separate voice gain node,
    // so that we can fade out the voice just before we cut it off
    const voiceGainNode = audioContext.createGain();
    voiceGainNode.gain.value = 0;
    voiceNode.connect(voiceGainNode);

    // We connect the voice gain node to the main gain node
    voiceGainNode.connect(mainGainNode);

    //attack envelope
    voiceGainNode.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + attack);

    return { voiceNode, voiceGainNode };
  };

  const notePressed = (octave: string, note: string, freq: number) => {
    const octaveIndex = Number(octave);
    oscList[octaveIndex][note].push(playTone(freq));
  }

  const noteReleased = async (octave: string, note: string) => {
    const octaveIndex = Number(octave);
    const oldestPlayedNode = oscList[octaveIndex][note].shift();
    if (oldestPlayedNode) {
      const release = voice.envelope.release;
      oldestPlayedNode.voiceGainNode.gain.exponentialRampToValueAtTime(
        0,
        audioContext.currentTime + release
      );
      // delay to allow for release to complete before node is disconnected
      await delayInSeconds(release);
      oldestPlayedNode.voiceNode.disconnect();
    }
  }

  return {
    audioContext,
    noteFreq,
    mainGainNode,
    sliders,
    changeSliders,
    setSliders,
    playTone,
    notePressed,
    noteReleased
  }
}