

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    
    socket.on("sendMessage", (data) => {
        io.emit("receiveMessage", data);
    });
    
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
    });
});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});


