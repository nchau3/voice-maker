// Log class from Thomas Foydel's tutorial on logarithmic sliders in React
// https://github.com/ThomasFoydel/logarithmic-range-input

interface logOptions {
  minPos: number;
  maxPos: number;
  minVal: number;
  maxVal: number;
}

class Log {
  minPos: number;
  maxPos: number;
  minVal: number;
  maxVal: number;
  scale: number;

  constructor(options: logOptions) {
    this.minPos = options.minPos || 0;
    this.maxPos = options.maxPos || 50;
    this.minVal = Math.log(options.minVal || 1);
    this.maxVal = Math.log(options.maxVal || 9000);
    this.scale = (this.maxVal - this.minVal) / (this.maxPos - this.minPos);
  }

  value(position: number) {
    return Math.exp((position - this.minPos) * this.scale + this.minVal);
  }

  position(value: number) {
    return this.minPos + (Math.log(value) - this.minVal) / this.scale;
  }
}

export default Log;