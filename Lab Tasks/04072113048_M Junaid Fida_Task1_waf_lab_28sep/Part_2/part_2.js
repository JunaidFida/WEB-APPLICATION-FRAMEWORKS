//Name : Muhammad Junaid Fida 
//Reg No:04072113048

import fs from "fs/promises";
import path from "path";

//Reading from IP.txt

try {
  const filePath = path.join(process.cwd(), "/Ips.txt");
  const data = await fs.readFile(filePath, "utf-8");
  const stringData = data.toString();

  const stringArray = stringData.split("\n");
console.log(stringArray);
  const fileA = path.join(process.cwd(), "/A.txt");
  const fileB = path.join(process.cwd(), "/B.txt");
  const fileC = path.join(process.cwd(), "/C.txt");
  const fileUnknown = path.join(process.cwd(), "/Unknown.txt");
  stringArray.forEach((ip) => {
    const IP = ip.split(".");
    if (IP[0] > 0 && IP[0] <= 126) {
      fs.appendFile(fileA, ip);
      console.log("Class A   " + IP);
    } else if (IP[0] >= 127 && IP[0] <= 191) {
      fs.appendFile(fileB, ip);
      console.log("Class B   " + IP);
    } else if (IP[0] >= 192 && IP[0] <= 223) {
      fs.appendFile(fileC, ip);
      console.log("Class C   " + IP);
    } else {
      fs.appendFile(fileUnknown, ip);
      console.log("Class Unknown   " + IP);
    }
  });
} catch (E) {
  console.log(E);
}
