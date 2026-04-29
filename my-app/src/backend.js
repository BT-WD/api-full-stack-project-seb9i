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
      id: game.id,
      tagline: game.summary?.slice(0, 100) || "No tagline available",
      releaseDate: game.first_release_date
        ? new Date(game.first_release_date * 1000).toDateString()
        : "Unknown",
        backdrop:
  game.artworks?.length
    ? `https:${game.artworks[0].url.replace('t_thumb', 't_1080p')}`
    : game.screenshots?.length
      ? `https:${game.screenshots[0].url.replace('t_thumb', 't_screenshot_big')}`
      : game.cover
        ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`
        : null,
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

app.get('/api/game/:id', async (req, res) => {
  const id = req.params.id;

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
        where id = ${id};
      `
    });

    const data = await response.json();

    const game = data[0]; // 👈 extract single game

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const formatted = {
      name: game.name || "Unknown",
      id: game.id,
      tagline: game.summary?.slice(0, 100) || "No tagline available",
      releaseDate: game.first_release_date
        ? new Date(game.first_release_date * 1000).toDateString()
        : "Unknown",
        backdrop:
  game.artworks?.length
    ? `https:${game.artworks[0].url.replace('t_thumb', 't_1080p')}`
    : game.screenshots?.length
      ? `https:${game.screenshots[0].url.replace('t_thumb', 't_screenshot_big')}`
      : game.cover
        ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`
        : null,
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
    };

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/trending', async (req, res) => {
  try {
    // STEP 1: get trending IDsconst limit = 10;
    const limit = 10;
    const offset = req.query.offset || 0;

    
    const trendingRes = await fetch('https://api.igdb.com/v4/popularity_primitives', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `
      fields game_id,value;
      sort value desc;
      limit ${limit};
      offset ${offset};
      where popularity_type = 5;
    `
    });

    const trendingData = await trendingRes.json();
    const gameIds = trendingData.map(g => g.game_id);

    if (!gameIds.length) return res.json([]);

    // STEP 2: get game details
    const gamesRes = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `
        fields name, summary, rating, first_release_date, genres.name, platforms.name, cover.url, screenshots.url;
        where id = (${gameIds.join(',')});
      `
    });

    const data = await gamesRes.json();

    // STEP 3: format (reuse your logic)
    const formatted = data.map(game => ({
      name: game.name || "Unknown",
      id: game.id,
      tagline: game.summary?.slice(0, 100) || "No tagline available",
      releaseDate: game.first_release_date
        ? new Date(game.first_release_date * 1000).toDateString()
        : "Unknown",
        backdrop:
  game.artworks?.length
    ? `https:${game.artworks[0].url.replace('t_thumb', 't_1080p')}`
      : game.cover
        ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`
        : null,
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