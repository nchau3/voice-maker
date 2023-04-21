//components
import Slider from "./Slider";

//styles
import "../styles/component-styles/work-station.scss";
import "../styles/component-styles/controls.scss";
import useAudioContext from "../hooks/useAudioContext";
import Controls from "./Controls";
import PlayButton from "./PlayButton";

export default function WorkStation() {
  const { 
    sliders,
    changeSliders,
    notePressed,
    noteReleased,
   } = useAudioContext();

  return (
    <div id="work-station">
      <PlayButton notePressed={notePressed} noteReleased={noteReleased} />
      <Controls sliders={sliders} onChange={changeSliders}/>
    </div>
  )
}