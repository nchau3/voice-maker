//opted for A3 to C5 as default, octaves are calculated upon switching

export default function createNoteTable() {
  const noteFreq = [];
  for (let i = 0; i < 5; i++) {
    if (i >= 3) {
      noteFreq[i] = {
        "C": 0,
        "C#": 0,
        "D": 0,
        "Eb": 0,
        "E": 0,
        "F": 0,
        "F#": 0,
        "G": 0,
        "Ab": 0,
        "A": 0,
        "Bb": 0,
        "B": 0
      };
    }
  }

  noteFreq[3]["A"] = 220;
  noteFreq[3]["Bb"] = 233.0819;
  noteFreq[3]["B"] = 246.9417;
  noteFreq[4]["C"] = 261.6256;
  noteFreq[4]["C#"] = 277.1826;
  noteFreq[4]["D"] = 293.6648;
  noteFreq[4]["Eb"] = 311.127;
  noteFreq[4]["E"] = 329.6276;
  noteFreq[4]["F"] = 349.2282;
  noteFreq[4]["F#"] = 369.9944;
  noteFreq[4]["G"] = 391.9954;
  noteFreq[4]["Ab"] = 415.3047;
  noteFreq[4]["A"] = 440;
  noteFreq[4]["Bb"] = 466.1638;
  noteFreq[4]["B"] = 493.8833;
  noteFreq[5]["C"] = 523.2511;

  return noteFreq;
}