const { exec } = require("child_process");
var fs = require("fs");

const Midi = require("jsmidgen");

const { Randomizer } = require("./utils/randomizer");
const { Note } = require("./shapes/note");
const { Chord } = require("./shapes/chord");

class JSB {
  static generateNote() {
    const notes = ["C", "D", "E", "F", "G", "A", "B"];
    const accidentals = ["#", "b", "", "", ""];
    const altitudes = ["0", "1", "2", "3", "4", "5", "6", "7"];
    //const durations = [64, 128, 256];
    const durations = [64];

    const name = Randomizer.randomFromArray(notes);
    const accidental = Randomizer.randomFromArray(accidentals);
    const altitude = Randomizer.randomFromArray(altitudes);
    const duration = Randomizer.randomFromArray(durations);

    return new Note(name, accidental, altitude, duration);
  }

  static generateChord() {
    const notes = ["C", "D", "E", "F", "G", "A", "B"];
    const accidentals = ["#", "b", "", "", "", "", ""];
    const altitudes = ["0", "1", "2", "3", "4", "5", "6", "7"];
    const durations = [128];

    const name = [
      Randomizer.randomFromArray(notes),
      Randomizer.randomFromArray(notes),
      Randomizer.randomFromArray(notes),
    ];
    const accidental = [
      Randomizer.randomFromArray(accidentals),
      Randomizer.randomFromArray(accidentals),
      Randomizer.randomFromArray(accidentals),
    ];
    const altitude = [
      Randomizer.randomFromArray(altitudes),
      Randomizer.randomFromArray(altitudes),
      Randomizer.randomFromArray(altitudes),
    ];
    const duration = Randomizer.randomFromArray(durations);

    return new Chord(name, accidental, altitude, duration);
  }

  static randomNotes(notes, createNote) {
    var track = new Midi.Track();
    for (var i = 0; i < notes; i++) {
      const note = createNote(i);
      track.addNote(0, note.note(), note.duration);
      process.stdout.write(note.toString());
    }
    return track;
  }

  static randomNotesByDuration(duration, createNote) {
    var track = new Midi.Track();
    let currentDuration = duration;
    while (currentDuration > 0) {
      const note = createNote();
      track.addNote(0, note.note(), note.duration);
      process.stdout.write(note.toString());
      currentDuration -= note.duration;
    }
    return track;
  }

  static randomChords(chords, createChord) {
    var track = new Midi.Track();
    for (var i = 0; i < chords; i++) {
      const chord = createChord(i);
      track.addChord(0, chord.chord(), chord.duration);
      process.stdout.write(chord.toString());
    }
    return track;
  }

  static randomChordsByDuration(duration, createChord) {
    var track = new Midi.Track();
    let currentDuration = duration;
    while (currentDuration > 0) {
      const chord = createChord();
      track.addChord(0, chord.chord(), chord.duration);
      process.stdout.write(chord.toString());
      currentDuration -= chord.duration;
    }
    return track;
  }

  static genFile(name, tracks) {
    var file = new Midi.File();
    const fileName = JSB.genFileName(name);
    for (var i = 0; i < tracks.length; i++) {
      file.addTrack(tracks[i]);
    }
    fs.writeFileSync(fileName, file.toBytes(), "binary");
    return fileName;
  }

  static genScore(name, tracks) {

  }

  static genFileName(name) {
    const date = new Date();
    const now =
      date.getFullYear() +
      "_" +
      (date.getMonth() + 1) +
      "_" +
      date.getDate() +
      "_" +
      date.getHours() +
      "_" +
      date.getMinutes() +
      "_" +
      date.getSeconds();
    const fileName = `compositions/${name}_${now}.mid`;
    return fileName;
  }

  static play(fileName) {
    exec(`timidity '${fileName}'`, function (err, stdout, stderr) {
      console.log("stdout:", stdout);
      if (err) {
        console.log("err:", err);
      }
      if (stderr) {
        console.log("stderr:", stderr);
      }
    });
  }
}

exports.JSB = JSB;
