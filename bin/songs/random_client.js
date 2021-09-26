const { JSB } = require("../src/jsb");
const { Chordinator } = require("../src/utils/chordinator");
const { Randomizer } = require("../src/utils/randomizer");
const { Note } = require("../src/shapes/note");
const Midi = require("jsmidgen");

class RandomClient {
  static randomSong() {
    console.log("Composing...");
    const track = JSB.randomNotes(20, function () {
      return JSB.generateNote();
    });

    const fileName = JSB.genFile("randomSong", [track]);

    console.log("\n--------------");
    console.log("Playing...");
    JSB.play(fileName);
  }

  static randomChords() {
    console.log("Composing...");
    const track = JSB.randomChords(30, function () {
      return JSB.generateChord();
    });
    const fileName = JSB.genFile("randomChords", [track]);

    console.log("\n--------------");
    console.log("Playing...");
    JSB.play(fileName);
  }

  static randomMajorChords() {
    console.log("Composing...");
    const track = JSB.randomChords(30, function () {
      return Chordinator.generateMajorChord([128], function () {
        return Randomizer.randomInt(36, 60);
      });
    });
    const fileName = JSB.genFile("randomMajorChords", [track]);

    console.log("\n--------------");
    console.log("Playing...");
    JSB.play(fileName);
  }

  static randomChordAndMelody() {
    console.log("Composing...");

    console.log("track1 =>");
    const track1 = JSB.randomNotes(100, function () {
      return JSB.generateNote();
    });

    console.log("\ntrack2 =>");
    const track2 = JSB.randomChords(50, function () {
      return Chordinator.generateMajorChord([128], function () {
        return Randomizer.randomFromArray([43, 48]);
      });
    });

    const midiFileName = JSB.genFile("randomMajorChord", [track1, track2]);

    console.log("\n--------------");
    console.log("Playing...");
    JSB.play(midiFileName);
  }

  static randomX() {
    console.log("Composing...");

    console.log("track1 =>");
    let ncounter = 0;
    const track1 = JSB.randomNotesByDuration(12800, function () {
      ncounter++;
      return Chordinator.generateMajorNote([32, 64], function () {
        return Randomizer.randomFromArray([60, 65, 67]);
      });
    });
    console.log(`Generated ${ncounter} notes`);

    console.log("\ntrack2 =>");
    let ccounter = 0;
    const track2 = JSB.randomChordsByDuration(12800, function () {
      ccounter++;
      return Chordinator.generateMajorChord([32, 64, 128], function () {
        return Randomizer.randomFromArray([43, 48, 41]);
      });
    });
    console.log(`Generated ${ccounter} chords`);

    const midiFileName = JSB.genFile("randomMajorChord", [track1, track2]);

    console.log("\n--------------");
    console.log("Playing...");
    JSB.play(midiFileName);
  }

  static techBass(tempo) {
    const genNotes = () => {
      const note = new Note("D", "#", "1", 96);
      const notes = [];

      for (var i = 1; i <= 8; i++) {
        notes.push(note);
      }
      notes.push(new Note("D", "#", "1", 256));
      return notes;
    };

    const notes = genNotes().concat(genNotes());

    var track1 = new Midi.Track();
    track1.setInstrument(1, "33");
    for (var j = 0; j < notes.length; j++) {
      const note = notes[j];
      track1.addNote(1, note.note(), note.duration);
      //process.stdout.write(note.toString());
      //console.log(note.toString());
    }
    track1.setTempo(tempo);
    return track1;
  }

  static techDrum(tempo) {
    const kick01 = new Note("B", "", "1", 128);
    var track01 = new Midi.Track();
    for (var i = 1; i <= 16; i++) {
      track01.addNote(9, kick01.note(), kick01.duration);
      //process.stdout.write(kick01.toString());
      //console.log(kick01.toString());
    }
    track01.setTempo(tempo);
    return track01;
  }

  static techHouse() {
    console.log("Composing...");

    const tempo = 121;

    const midiFileName = JSB.genFile("techHouse", [
      this.techDrum(tempo),
      //this.techDrum(tempo),
      this.techBass(tempo),
    ]);

    console.log("\n--------------");
    console.log("Playing...");
    JSB.play(midiFileName);
  }
}

exports.RandomClient = RandomClient;
