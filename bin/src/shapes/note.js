class Note {
  constructor(name, accidental, altitude, duration) {
    this.name = name;
    this.accidental = accidental;
    this.altitude = altitude;
    this.duration = duration;
  }

  note() {
    return `${this.name}${this.accidental}${this.altitude}`;
  }

  toString() {
    return `| ${this.note()} - ${this.duration} |`;
  }
}

exports.Note = Note;
