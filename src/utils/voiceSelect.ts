//each voice has an array of values which represent the relative gain of each overtone above the fundamental frequency

interface voiceOptions {
  id: number;
  name: string;
  harmonics: number[];
  envelope: {
    attack: number;
    release: number;
  }
}

class Voice {
  id: number;
  name: string;
  harmonics: number[];
  envelope: {
    attack: number;
    release: number;
  }

  constructor(options: voiceOptions) {
    this.id = options.id;
    this.name = options.name;
    this.harmonics = options.harmonics;
    this.envelope = options.envelope;
  }
}

const voiceLibrary = [
  new Voice({
    id: 1,
    name: "organ",
    harmonics: [1, 0.8, 0.6, 1.3, 0.02, 0.04, 0.03, 0.001, 0.001, 0.002],
    envelope: {
      attack: 0.003,
      release: 0.2
    }
  }
  ),
  new Voice({
    id: 2,
    name: "clarinet",
    harmonics: [1.4, 0.1, 0.8, 0.06, 0.09, 0.02, 0.003, 0.003, 0.001, 0.001, 0.002],
    envelope: {
      attack: 0.01,
      release: 0.35
    }
  }
  ),
  new Voice({
    id: 3,
    name: "accordion",
    harmonics: [1.7, 1.4, 0.07, 0.05, 0.003, 0.1, 0.001, 0.002, 0.01, 0.01, 0.001, 0.002, 0.006],
    envelope: {
      attack: 0.2,
      release: 0.08
    }
  }
  )
];

export default voiceLibrary;