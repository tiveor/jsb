const names = ["A", "B", "C", "D", "E", "F", "G"];
const namesWithSharps = ["A", "C", "D", "F", "G"];
const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8];

class MidiX {
  static nextName(iname) {
    if (iname < names.length - 1) {
      iname++;
    } else {
      iname = 0;
    }
    return names[iname];
  }

  static gen() {
    let run = true;

    let value = 21; //started value
    let iname = 0;
    let ilevel = 0;
    let name = "";
    let fullName = "";
    let sharp = "";
    let res = "[";
    let bname;

    while (run) {
      name = names[iname];
      fullName = name + sharp + levels[ilevel];
      bname = fullName;

      if (sharp.length > 0) {
        bname = this.nextName(iname) + "b" + levels[ilevel];
      }

      res += `{value:${value}, name: "${fullName}", bname: "${bname}"},`;

      if (value < 108) {
        value++;
      } else {
        run = false;
      }

      if (fullName.includes("#")) {
        sharp = "";
        if (iname < names.length - 1) {
          iname++;
        } else {
          iname = 0;
        }
      } else if (namesWithSharps.includes(name)) {
        sharp = "#";
      } else {
        if (iname < names.length - 1) {
          iname++;
        } else {
          iname = 0;
        }
      }

      if (name === "B") {
        ilevel++;
      }
    }

    res += "]";

    console.log(res);
  }
}

exports.MidiX = MidiX;
