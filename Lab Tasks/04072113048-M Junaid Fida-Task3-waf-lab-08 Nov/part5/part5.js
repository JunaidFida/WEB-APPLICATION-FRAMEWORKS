const express = require('express')
const http=require('http')
const fs= require('fs');
const app = express()

app.get("/",(req, res)=>{
    const text = req.query.msg;
    console.log(text)
     // Log the request details to textlog.txt
    
     const log = `\n ${new Date().getHours().toString()}: ${new Date().getMinutes().toString()} \t ${text} `;

     fs.appendFile("textlog.txt", log, (err) => {
         if (err) {
             console.error("Failed to write to file");
         }
     });
    res.send(`Message received: ${text}`);
})

const myServer=http.createServer(app);
myServer.listen(8080,"10.141.205.204",()=>{
    console.log("Server running on port 8084...");
    })