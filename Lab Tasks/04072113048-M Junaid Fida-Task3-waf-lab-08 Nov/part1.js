// 1. Use the os module to print information about your computer system's uptime.
// Also, use the path module to parse and display information about the .js file you are working in. 

// const os =require("os");
import os from "os";
import path from "path";

//OS module
console.log("The uptime of this PC is ",os.uptime());
console.log("Host Name :",os.hostname());
console.log("Platform :",os.platform());
console.log("Available Memory :",os.freemem());

//Path module
const filepath=(path.resolve("./part1.js"))

console.log(path.parse(filepath)); //__filename gives the filepath of current file in execution
console.log("The current working directory is ",path.dirname(filepath));