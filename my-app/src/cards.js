import './App.css';
import React, { useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import GamePage from './gamepage';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";



function Card({ title }) {
   const navigate = useNavigate();

  // Function to handle click
  const handleClick = () => {
    navigate("/GamePage"); // Navigate to About page
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
        src="https://picsum.photos/200/300"
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
  const [items, setItems] = useState(
    Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`)
  );
  const [hasMore, setHasMore] = useState(true);

  const fetchData = () => {
  setTimeout(() => {
    const nextItems = Array.from(
      { length: 10 },
      (_, i) => `Item ${items.length + i + 1}`
    );

    setItems((prev) => [...prev, ...nextItems]);

    // stop after 50 items (example)
    if (items.length >= 50) {
      setHasMore(false);
    }
  }, 1000);
};
  return (
  <div className="CardList">
    <div className="horizontal-container">
        <InfiniteScroll
            dataLength={items.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {items.map((item) => (
              <div className="card-wrapper" key={item}>
                <Card title={item} />
              </div>
            ))}
          </InfiniteScroll>
  
</div>
  </div>
);
}