const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 8000;

const path = require('path');
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

const korisnikRuta = require('./routes/korisnik');
const piceRuta = require('./routes/pice');
const stoRuta = require('./routes/sto');

app.use('/', korisnikRuta);
app.use('/', piceRuta);
app.use('/', stoRuta);

// WebSocket rukovanje
wss.on('connection', (ws) => {
    console.log('Novi WebSocket klijent povezan.');

    // Slušajte poruke od klijenta
    ws.on('message', (message) => {
        console.log(`Primljeno: ${message}`);

        // Emitirajte poruku prema svim klijentima
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Slušajte zatvaranje veze
    ws.on('close', () => {
        console.log('WebSocket veza zatvorena.');
    });
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
