// import ws, { Server } from 'ws';
const WebSocket = require('ws');
const Server = WebSocket.Server;

const wss = new Server({ port: 3000 });

wss.on('connection', (client) => {
    console.log('Client connected');
    client.on('message', (msg) => {
        console.log(`Message:${msg}`);
        broadcast(msg);
    });

    client.on('close', function close() {
        console.log('Client disconnected');
    });
});

function broadcast(msg) {
  let clientCount = 0;
  for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
          try {
              client.send(msg);
              clientCount++;
          } catch (err) {
              console.error('Error sending message:', err);
          }
      }
  }
  console.log(`Broadcasted message to ${clientCount} clients`);
}

console.log('WebSocket server is running on ws://localhost:3000');