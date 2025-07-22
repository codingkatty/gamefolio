const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const port = 43625;
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

let players = {};

io.on('connection', (socket) => {
    players[socket.id] = { x: -300, y: -200, state: 'idle' };
    io.emit('players', players);

    socket.on('move', (data) => {
        players[socket.id] = { x: data.x, y: data.y, state: data.state };

        const sortedPlayers = Object.entries(players).sort((a, b) => a[1].y - b[1].y);
        players = Object.fromEntries(sortedPlayers);

        io.emit('players', players);
    });
    
    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('players', players);
    });
});

app.get('/status', (req, res) => {
    res.json({ status: 'ok', players: Object.keys(players).length });
});

server.listen(port, () => {
  console.log(`server running at port ${port}`);
});