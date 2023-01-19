import { Server } from "socket.io";

export default function SocketHandler(req, res) {
    if (res.socket.server.io) {
        // Socket.io server is already running.
        res.end();
        return;
    }

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    const handleConnection = (socket) => {
        // Message handler
        socket.on("createdMessage", (msg) => {
            socket.broadcast.emit("newIncomingMessage", msg)
        });
        socket.on("REGISTER_MEETING", () => {
            socket.broadcast.emit('REGISTER_MEETING');
        })
    };

    io.on("connection", handleConnection);

    res.end();
}