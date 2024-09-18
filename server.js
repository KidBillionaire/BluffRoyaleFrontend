const express = require('express');
const { PeerServer } = require('peer');
const app = express();
const PORT = 3000;

// Serve static HTML and JS files
app.use(express.static('public'));

// Create PeerJS server
const peerServer = PeerServer({ port: 9000, path: '/peerjs' });

// Predefined user IDs and logic to return Peer IDs
const predefinedPeerIds = {
  user1: 'user1-peer-id',
  user2: 'user2-peer-id',
};

app.get('/get-peer-id/:username', (req, res) => {
  const username = req.params.username;
  if (predefinedPeerIds[username]) {
    res.json({ peerId: predefinedPeerIds[username] });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
