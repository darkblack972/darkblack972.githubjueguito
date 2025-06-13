// Requiere: npm install ws
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

let clients = [];

wss.on('connection', ws => {
  if (clients.length >= 4) {
    ws.send(JSON.stringify({ type: 'error', message: 'Sala llena (máx. 4 jugadores).' }));
    ws.close();
    return;
  }

  const id = clients.length;
  clients.push({ ws, id });

  ws.send(JSON.stringify({ type: 'welcome', id }));

  ws.on('message', message => {
    // Broadcast a los demás jugadores
    clients.forEach(client => {
      if (client.ws !== ws) {
        client.ws.send(message);
      }
    });
  });

  ws.on('close', () => {
    clients = clients.filter(client => client.ws !== ws);
  });
});

console.log('Servidor WebSocket corriendo en ws://localhost:3000');
