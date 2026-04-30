import Search from "./search";
import "./App.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/game/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="game-container">
      <header className="navbar">
        <h1 className="logo">Game<span>Lookup</span></h1>
        <Search />
      </header>

      {loading && <p className="loading-text">Loading…</p>}

      {!loading && game && (
        <>
          <div className="hero">
            {(game.backdrop || game.heroImage) && (
              <img
                src={game.backdrop || game.heroImage}
                alt={game.name}
                className="hero-image"
              />
            )}
            <div className="hero-overlay">
              <h2 className="game-title">{game.name}</h2>
              <p className="game-tagline">{game.tagline}</p>
              <button className="trailer-btn">▶ Watch Trailer</button>
            </div>
          </div>

          <div className="content">
            <div className="main">
              <h3>About the Game</h3>
              <p>{game.description}</p>

              {game.screenshots?.length > 0 && (
                <>
                  <h3>Screenshots</h3>
                  <div className="screenshots">
                    {game.screenshots.map((img, i) => (
                      <img key={i} src={img} alt={`screenshot-${i}`} />
                    ))}
                  </div>
                </>
              )}
            </div>

            <aside className="sidebar">
              {game.rating && game.rating !== "N/A" && (
                <div className="info-box rating-box">
                  <p className="rating-label">Score</p>
                  <p className="rating-value">{parseFloat(game.rating).toFixed(0)}</p>
                </div>
              )}

              <div className="info-box">
                <h4>Release Date</h4>
                <p>{game.releaseDate}</p>
              </div>

              <div className="info-box">
                <h4>Genre</h4>
                <p>{game.genre}</p>
              </div>

              <div className="info-box">
                <h4>Platforms</h4>
                <p>{game.platforms}</p>
              </div>
            </aside>
          </div>
        </>
      )}

      {!loading && !game && (
        <p className="loading-text">Game not found.</p>
      )}
    </div>
  );
}