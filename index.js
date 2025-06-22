const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend from public folder (optional)
app.use(express.static('public'));

// Root route (so "Cannot GET /" doesn't appear)
app.get('/', (req, res) => {
  res.send("✅ GitHub Scorer API is running! Use /score/:username");
});

// GitHub score route
app.get('/score/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const { data } = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });

    const score = data.public_repos * 2 + data.followers * 3;
    res.json({ username, score });
  } catch (error) {
    res.status(404).json({ error: 'User not found or API error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
