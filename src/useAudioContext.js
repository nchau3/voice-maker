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