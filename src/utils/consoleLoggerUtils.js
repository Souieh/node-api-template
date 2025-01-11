const clc = require("cli-color");

function getLogger(prefix, color) {
  return function (...args) {
    const p1 = (clc[color] ?? clc.white)("[" + prefix + "]");
    console.log(`${p1} ${args.map((arg) => JSON.stringify(arg))}`);
  };
}

module.exports = getLogger;
