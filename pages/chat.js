// React
import React, { useEffect, useState } from 'react';
// Other components
import Layout from '../components/Layout';
// Mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// Socket.io
import io from "socket.io-client";
// Axios
import axios from 'axios';

let socket;

export default function ChatPage() {
    const [message, setMessage] = useState("");
    const socketInitializer = async () => {
        // We just call it because we don't need anything else out of it
        await axios.get("/api/socket");

        socket = io();

        socket.on("newIncomingMessage", (msg) => {
            setMessage(msg.message);
        });
        console.log("Socket connected");
    };
    useEffect(() => {
        socketInitializer();
    }, []);
    const inputHandler = (value) => {
        socket.emit("createdMessage", { message: value });
        setMessage(value);
        console.log("Message sent");
    }

    return (
        <Layout>
            <Container maxWidth="xl">
                <Typography variant="h5" sx={{ mt: 4 }}>
                    {message}
                </Typography>
                <TextField label="" variant="outlined" onChange={(event) => inputHandler(event.target.value)} fullWidth sx={{ mt: 4 }} />
            </Container>
        </Layout >
    )
}