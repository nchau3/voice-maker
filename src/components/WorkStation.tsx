//components
import Slider from "./Slider";

//styles
import "../styles/component-styles/work-station.scss";
import "../styles/component-styles/controls.scss";
import useAudioContext from "../hooks/useAudioContext";
import Controls from "./Controls";

export default function WorkStation() {
  const { 
    sliders,
    changeSliders,
    noteFreq,
    notePressed,
    noteReleased,
   } = useAudioContext();

  return (
    <div id="work-station">
      <Controls sliders={sliders} onChange={changeSliders}/>
    </div>
  )
}