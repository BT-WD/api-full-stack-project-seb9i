import Search from "./search";
import "./App.css";
import { useState, useEffect } from "react";

export default function GamePage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/games")
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error(err));
  }, []);

  const gameData = games[0]; // use first game

  if (!gameData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="game-container">

      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">Game Lookup</h1>
        <Search />
      </header>

      {/* Hero */}
      <div className="hero">
        {gameData.heroImage && (
          <img src={gameData.heroImage} alt="Game Banner" className="hero-image" />
        )}

        <div className="hero-overlay">
          <h2 className="game-title">{gameData.name}</h2>
          <p className="game-tagline">{gameData.tagline}</p>
          <button className="trailer-btn">▶ Watch Trailer</button>
        </div>
      </div>

      {/* Content */}
      <div className="content">

        <div className="main">
          <h3>About the Game</h3>
          <p>{gameData.description}</p>

          <h3>Screenshots</h3>
          <div className="screenshots">
            {gameData.screenshots?.map((img, i) => (
              <img key={i} src={img} alt={`screenshot-${i}`} />
            ))}
          </div>
        </div>

        <aside className="sidebar">
          <div className="info-box">
            <h4>Release Date</h4>
            <p>{gameData.releaseDate}</p>
          </div>

          <div className="info-box">
            <h4>Genre</h4>
            <p>{gameData.genre}</p>
          </div>

          <div className="info-box">
            <h4>Platforms</h4>
            <p>{gameData.platforms}</p>
          </div>

          <div className="info-box rating">
            <p>{gameData.rating}</p>
          </div>
        </aside>

      </div>
    </div>
  );
}