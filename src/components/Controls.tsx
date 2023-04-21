//components
import Slider from "./Slider";

//styles
import "../styles/component-styles/controls.scss"

interface controlsProps {
  sliders: {
    masterGain: number;
  };
  onChange: Function;
}

export default function Controls(props: controlsProps) {
  const { masterGain } = props.sliders;

  return (
    <div className="controls">
      <Slider 
        name={"masterGain"}
        minPos={1}
        maxPos={75}
        minVal={0}
        maxVal={100}
        value={masterGain}
        onChange={props.onChange} />
    </div>
  )
}