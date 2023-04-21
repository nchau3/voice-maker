import { useState } from "react";
import "../styles/component-styles/play-button.scss";

interface playButtonProps {
  notePressed: Function;
  noteReleased: Function;
}

export default function PlayButton (props: playButtonProps) {
  const { notePressed, noteReleased } = props;
  const [playState, setPlayState] = useState("paused");

  const octave = 4;
  const note = "A";
  const freq = 440;

  const iconClassName = playState === "paused" ? "play" : "pause";

  const handleClick = () => {
    if (playState === "paused") {
      notePressed(octave, note, freq);
      setPlayState("playing");
    } else if (playState === "playing") {
      noteReleased(octave, note);
      setPlayState("paused");
    }
  }

  return (
    <button 
      id="play-button"
      onClick={() => handleClick()}
      ><i className={`fa-solid fa-${iconClassName}`}></i></button>
  )
}