const util = require("util");
const fs = require("fs");

const Write = util.promisify(fs.writeFile);
const Read = util.promisify(fs.readFile);

const writeFile = async (path: string, text: string) => {
  return await Write(path, text);
};
const readFile = async (path: string) => {
  return await Read(path, "utf-8");
};

export { writeFile, readFile };
