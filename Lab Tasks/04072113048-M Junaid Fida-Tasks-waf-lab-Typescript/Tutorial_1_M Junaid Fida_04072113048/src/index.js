"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 3000;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// GET endpoint
app.get('/', function (req, res) {
    var message = {
        text: 'Hello, TypeScript with Express!',
        author: 'Your Name',
    };
    res.json(message);
});
// Start the server
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
