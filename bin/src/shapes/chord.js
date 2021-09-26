class Chord {
  constructor(names, accidentals, altitudes, duration) {
    this.names = names;
    this.accidentals = accidentals;
    this.altitudes = altitudes;
    this.duration = duration;
  }

  chord() {
    if (
      this.names.length !== this.accidentals.length ||
      this.names.length !== this.altitudes.length
    ) {
      throw Error("Names, Accidentals and Altitudes must be the same size");
    }

    let notes = [];
    for (let i = 0; i < this.names.length; i++) {
      notes.push(`${this.names[i]}${this.accidentals[i]}${this.altitudes[i]}`);
    }

    return notes;
  }

  toString() {
    return `| ${this.chord()} - ${this.duration} |`;
  }
}

exports.Chord = Chord;
