const { Randomizer } = require("./randomizer");
const { Chord } = require("../shapes/chord");
const { Note } = require("../shapes/note");
const { MIDI_DATA } = require("../data/midi-data");

class Chordinator {
  static getNoteByValue(value) {
    return MIDI_DATA.find((note) => {
      return note.value === value;
    });
  }

  static getNameByValue(value) {
    const foundNode = Chordinator.getNoteByValue(value);
    return foundNode.name.split("")[0];
  }

  static getAccidentalByValue(value) {
    const foundNode = Chordinator.getNoteByValue(value);
    return foundNode.name.includes("#") ? "#" : "";
  }

  static getAltitudeByValue(value) {
    const foundNode = Chordinator.getNoteByValue(value);
    return foundNode.name.split("").pop();
  }

  static generateChordByIntervals(durations, createBaseNote, intervals) {
    const duration = Randomizer.randomFromArray(durations);

    let noteValues = [];
    const baseNote = createBaseNote();
    noteValues.push(baseNote);

    for (var i = 0; i < intervals.length; i++) {
      noteValues.push(baseNote + intervals[i]);
    }

    let values = [];
    let accidentals = [];
    let altitudes = [];
    for (var j = 0; j < noteValues.length; j++) {
      values.push(Chordinator.getNameByValue(noteValues[j]));
      accidentals.push(Chordinator.getAccidentalByValue(noteValues[j]));
      altitudes.push(Chordinator.getAltitudeByValue(noteValues[j]));
    }
    return new Chord(values, accidentals, altitudes, duration);
  }

  static generateMajorChord(durations, createBaseNote) {
    return Chordinator.generateChordByIntervals(durations, createBaseNote, [
      4,
      7,
    ]);
  }

  static generateMinorChord(durations, createBaseNote) {
    return Chordinator.generateChordByIntervals(durations, createBaseNote, [
      3,
      7,
    ]);
  }

  static generateMajorNote(durations, createBaseNote) {
    const baseNote = createBaseNote();
    const intervalsUp = [0, 2, 4, 5, 7, 9, 11];
    const intervalsDown = [0, -1, -3, -5, -7, -8, -10];

    const duration = Randomizer.randomFromArray(durations);

    const nextIntervalUp = Randomizer.randomFromArray(intervalsUp);
    const nextIntervalDown = Randomizer.randomFromArray(intervalsDown);
    const isUp = Randomizer.randomBool();
    const nextInterval = isUp ? nextIntervalUp : nextIntervalDown;
    const nextNote = baseNote + nextInterval;

    const name = Chordinator.getNameByValue(nextNote);
    const accidental = Chordinator.getAccidentalByValue(nextNote);
    const altitude = Chordinator.getAltitudeByValue(nextNote);

    return new Note(name, accidental, altitude, duration);
  }
}

exports.Chordinator = Chordinator;
