import { Server } from "socket.io";

export default function SocketHandler(req, res) {
    // It means that socket server was already initialised
    if (res.socket.server.io) {
        console.log("Socket.io server is already running.");
        res.end();
        return;
    }

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    const onConnection = (socket) => {
        socket.on("createdMessage", (msg) => {
            socket.broadcast.emit("newIncomingMessage", msg)
        });
    };

    // Define actions inside
    io.on("connection", onConnection);

    console.log("Setting up socket");
    res.end();
}