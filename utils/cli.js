const process = require("process");
const readln = require("readline");

// Command Line
const cli = readln.createInterface(process.stdin, process.stdout);

// Input from CLI
function input(message) {
  return new Promise((res, rej) => {
    cli.question(message, (answer) => {
      res(answer);
    });
  });
}

module.exports = {
  input,
};
