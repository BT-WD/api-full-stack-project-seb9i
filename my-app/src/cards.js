import './App.css';
import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
var currentNumber = 1
function usePopularGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/trending")
      .then(res => res.json())
      .then(setGames)
      .catch(console.error);
  }, []);


  return games;
}
function Card({ title, screenshot, id }) {
   const games = usePopularGames();

  <div>{games.length} games loaded</div>;

   const navigate = useNavigate();

  // Function to handle click
  const handleClick = () => {
    navigate(`/GamePage/${id}`); // Navigate to About page
  };
  return (
    
    <div
      onClick= {handleClick}

     style={{
    width: "250px",   // 👈 fixed width works best for scroll menus
    height: "500px",
    margin: "0 10px",
    background: "#eee",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "8px",
    }}
    >
        <img
        src={screenshot}
        alt="example"
        style={{
        width: "100%",
        height: "300px",
        objectFit: "cover"
        }}
    />
      <p style={{ padding: "10px", color: "black" }}>{title}</p>
    </div>
  );
}




export default function MainCards() {
  const [games, setGames] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchGames = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/trending?offset=${offset}`
      );
      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("Unexpected API response:", data);
        setHasMore(false);
        return;
      }

      if (data.length === 0) {
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
    fetchGames(); // initial load
  }, []);

  return (
    <div className="CardList">
      <div className="horizontal-container">
        
        <InfiniteScroll
          dataLength={games.length}
          next={fetchGames}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          style={{ display: "flex", flexDirection: "row" }}
        >
          {games.map((game) => (
            
            <div className="card-wrapper" key={game.name}>
              <Card title={game.name} screenshot={`${game.heroImage}`} id={game.id} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}