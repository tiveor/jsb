#!/usr/bin/env node
console.log("Welcome to JSB");
console.log("--------------");

console.log("║░█░█░║░█░█░█░║░█░█░║");
console.log("║░█░█░║░█░█░█░║░█░█░║");
console.log("║░║░║░║░║░║░║░║░║░║░║");
console.log("╚═╩═╩═╩═╩═╩═╩═╩═╩═╩═╝");

const { DemoCodeTalk } = require("./songs/demo_code_talk");
//DemoCodeTalk.run();


const { RandomClient } = require("./songs/random_client");

//Client.randomSong();
//Client.randomChords();
//Client.randomMajorChords();
//Client.randomChordAndMelody();
RandomClient.randomX();
