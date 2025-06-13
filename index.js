const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/score/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const { data } = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'github-score-mcp'
      }
    });
    const score = data.public_repos * 2 + data.followers * 3;
    res.json({ username, score });
  } catch (error) {
    res.status(404).json({ error: 'User not found or API rate limit exceeded' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
