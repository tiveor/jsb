const Midi = require("jsmidgen");
const { Note } = require("../src/shapes/note");
const { JSB } = require("../src/jsb");

//The “Bam-Bam-Bam” in the second bar.
//https://promusicproducers.com/7-deep-house-bassline-patterns-and-techniques/
//https://soundcloud.com/promusicproducers/deep-house-maniac-kit-01-121bpm-d-demo

class DemoCodeTalk {
  static genNotesBass(track) {
    track.addNote(0, new Note("D", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("D", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("F", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("F", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("F", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("F", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("F", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("F", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("F", "#", "1", 128).note(), 128);
    track.addNote(0, new Note("B", "", "0", 64).note(), 64);
    track.addNote(0, new Note("F", "#", "0", 32).note(), 32);
    track.addNote(0, new Note("D", "#", "1", 32).note(), 32);
    track.addNote(0, new Note("F", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("F", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("G", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("G", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("A", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("A", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("A", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("A", "#", "1", 96).note(), 96);
    track.addNote(0, new Note("F", "#", "1", 128).note(), 128);
    track.addNote(0, new Note("D", "#", "1", 64).note(), 64);
    track.addNote(0, new Note("G", "#", "1", 32).note(), 32);
    track.addNote(0, new Note("F", "#", "1", 32).note(), 32);
  }

  static genBass(tempo) {
    const track = new Midi.Track();
    track.setInstrument(0, 34);
    track.setTempo(tempo);

     this.genNotesBass(track);
    this.genNotesBass(track);
    return track;
  }

  static genNotesBeat(track) {
    const channel = 9;
    const x = [];
    x.push(new Note("C", "", "2").note());
    x.push(new Note("B", "", "1").note());
    track.addNote(channel, x, 128);
    track.addNote(channel, x, 128);
    track.addNote(channel, x, 128);
    track.addNote(channel, x, 128);
    track.addNote(channel, x, 128);
    track.addNote(channel, x, 128);
    track.addNote(channel, x, 128);
    track.addNote(channel, x, 128);
    track.addNote(channel, x, 128);
    track.addNote(channel, x, 128);
    track.addNote(channel, x, 128);
    track.addNote(channel, x, 128);
    track.addNote(channel, x, 128);
    track.addNote(channel, x, 128);
    track.addNote(channel, x, 128);
    track.addNote(channel, x, 128);
  }

  static genBeat(tempo) {
    const track = new Midi.Track();
    track.setTempo(tempo);
    this.genNotesBeat(track);
    this.genNotesBeat(track);
    return track;
  }

  static run() {
    const tempo = 121;
    const midiFileName = JSB.genFile("demoCodeTalk", [
      this.genBass(tempo),
      this.genBeat(tempo),
    ]);

    console.log("\n--------------");
    console.log("Playing...");
    JSB.play(midiFileName);
  }
}

exports.DemoCodeTalk = DemoCodeTalk;
