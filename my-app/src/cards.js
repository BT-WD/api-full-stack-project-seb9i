import './App.css';
import { useState, useEffect, useMemo } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from "react-router-dom";

function Card({ title, screenshot, id }) {
  const navigate = useNavigate();

  return (
    <div className="game-card" onClick={() => navigate(`/game/${id}`)}>
      <img
        src={screenshot}
        alt={title}
        onError={(e) => { e.target.style.display = 'none'; }}
      />
      <div className="game-card-body">
        <p className="game-card-title">{title}</p>
      </div>
    </div>
  );
}

export default function MainCards({ filterQuery = "" }) {
  const [games, setGames] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchGames = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/trending?offset=${offset}`);
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setHasMore(false);
        return;
      }

      setGames((prev) => [...prev, ...data]);
      setOffset((prev) => prev + 10);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // Filter games client-side based on search query
  const filtered = useMemo(() => {
    if (!filterQuery.trim()) return games;
    const q = filterQuery.toLowerCase();
    return games.filter((g) => g.name.toLowerCase().includes(q));
  }, [games, filterQuery]);

  return (
    <div className="CardList">
      <div className="section-header">
        <h2>Trending Now</h2>
        {filterQuery && (
          <span className="count">{filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{filterQuery}"</span>
        )}
      </div>

      <div className="horizontal-container">
        <InfiniteScroll
          dataLength={games.length}
          next={fetchGames}
          hasMore={hasMore}
          loader={<p className="loading-text">Loading…</p>}
          style={{ display: "flex", flexDirection: "row", gap: "16px" }}
        >
          {filtered.map((game) => (
            <div className="card-wrapper" key={game.id}>
              <Card title={game.name} screenshot={game.heroImage} id={game.id} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}