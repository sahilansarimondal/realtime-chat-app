"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var server = (0, http_1.createServer)();
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on("connection", function (socket) {
    socket.on("chat message", function (msg) {
        io.emit("chat message", msg);
    });
});
server.listen(5000, function () {
    console.log("Server running on port 5000");
});
