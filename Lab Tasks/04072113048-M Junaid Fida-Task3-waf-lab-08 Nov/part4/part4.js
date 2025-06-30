const fs = require('fs');
const prompt = require('prompt');
const validator = require('validator');
const whiteList=require("./White.json");
const blackList=require("./Black.json");
const express = require('express');


function validateInput(email, ip) {
    if (!validator.isEmail(email)) {
        console.log("Invalid email format.");
        return false;
    }
    if (!validator.isIP(ip, 4)) {
        console.log("Invalid IPv4 address format.");
        return false;
    }
    return true;
}

function authenticateIP(ip) {
    console.log(`Authenticating IP: ${ip}`);  
// console.log(typeof(ip));
// console.log(typeof(blackList));

const isBlackListed = blackList.some(item => item.ip === ip);
if (isBlackListed) {
    console.log("Error: The IP address is blocked.");
    return;
}

const isWhiteListed = whiteList.some(item => item.ip === ip);
if (isWhiteListed) {
    console.log("Authentication Success: The IP address is authorized.");
    return;
}

   
    fs.appendFileSync('Pending.txt', ip + '\n');
    console.log("Error: The system is unable to authenticate the IP address. It has been added to Pending.txt.");
}



function main() {
    prompt.start();

    prompt.get(['email', 'ip'], (err, result) => {
        if (err) {
            console.error("Error getting input.");
            return;
        }
        const { email, ip } = result;
        if (validateInput(email, ip)) {
            authenticateIP(ip);
        }
    });
}

main();
