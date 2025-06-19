const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static('public'));

// API route
app.get('/score/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const { data } = await axios.get(`https://api.github.com/users/${username}`);
    const score = data.public_repos * 2 + data.followers * 3;
    res.json({ username, score });
  } catch (error) {
    res.status(404).json({ error: 'User not found' });
  }
});

// Root route (serves index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
