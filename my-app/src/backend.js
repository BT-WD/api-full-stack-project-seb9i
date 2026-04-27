import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/games', async (req, res) => {
  try {
    const response = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `
        fields name, summary, rating, first_release_date, genres.name, platforms.name, cover.url, screenshots.url;
        limit 10;
      `
    });

    const data = await response.json();

    const formatted = data.map(game => ({
      name: game.name || "Unknown",
      tagline: game.summary?.slice(0, 100) || "No tagline available",
      releaseDate: game.first_release_date
        ? new Date(game.first_release_date * 1000).toDateString()
        : "Unknown",
      genre: game.genres?.map(g => g.name).join(", ") || "Unknown",
      platforms: game.platforms?.map(p => p.name).join(", ") || "Unknown",
      rating: game.rating ? game.rating.toFixed(1) : "N/A",
      description: game.summary || "No description available",
      heroImage: game.cover
        ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`
        : null,
      screenshots: game.screenshots
        ? game.screenshots.map(s =>
            `https:${s.url.replace('t_thumb', 't_screenshot_med')}`
          )
        : []
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log(`Server running on port 5000 ${process.env.CLIENT_ID}${process.env.ACCESS_TOKEN}`));