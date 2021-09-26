class Randomizer {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  static random(min, max) {
    return Math.random() * (max - min) + min;
  }

  static randomInt(min, max) {
    return parseInt(Randomizer.random(min, max));
  }

  static randomBool = () => {
    return Math.random() >= 0.5;
  };

  static randomFromArray(array) {
    const index = Randomizer.randomInt(0, array.length);
    return array[index];
  }
}

exports.Randomizer = Randomizer;
