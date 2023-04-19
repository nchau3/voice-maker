interface SliderBarProps {
  active: boolean;
  value: number;
  onChange: Function;
}

export default function SliderBar(props: SliderBarProps) {
  return (
    <div 
      className={`slider-bar ${props.active ? "active" : ""}`}
      onClick={() => props.onChange(props.value)}
      onMouseOver={() => props.onChange(props.value)}
      >
    </div>
  )
}