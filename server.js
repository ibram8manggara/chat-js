const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Mengirim pesan selamat datang ketika user terhubung
  socket.emit('chatMessage', 'Selamat datang di ruang chat!');

  // Menangani pesan yang dikirim oleh user
  socket.on('chatMessage', (message) => {
    // Mengirim pesan yang diterima dari satu user ke semua user yang terhubung
    io.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(80, () => {
  console.log('Server started on http://localhost:80');
});
