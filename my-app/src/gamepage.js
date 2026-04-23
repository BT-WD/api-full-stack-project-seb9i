import Search from "./search";
import "./App.css";

export default function GamePage() {
  const gameData = {
    name: "Elden Ring",
    tagline: "An epic open-world action RPG set in a dark fantasy universe.",
    releaseDate: "February 25, 2022",
    genre: "Action RPG",
    platforms: "PC, PS5, Xbox",
    rating: "9.5 / 10",
    description:
      "Elden Ring is an action RPG developed by FromSoftware and published by Bandai Namco Entertainment. Explore a vast open world filled with powerful enemies, hidden secrets, and deep lore written by George R. R. Martin in collaboration with Hidetaka Miyazaki.",
    heroImage:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=500&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=180&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=301&h=180&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=302&h=180&fit=crop&q=80",
    ],
  };

  return (
    <div className="game-container">

      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">Game Lookup</h1>
        <Search />
      </header>

      {/* Hero */}
      <div className="hero">
        <img src={gameData.heroImage} alt="Game Banner" className="hero-image" />

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
            {gameData.screenshots.map((img, i) => (
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