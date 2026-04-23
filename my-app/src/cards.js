import './App.css';
import React, { useRef, useEffect, useState, useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import "react-horizontal-scrolling-menu/dist/styles.css";
const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);


function Card({ title }) {
  return (
    <div
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
      <p style={{ padding: "10px" }}>{title}</p>
    </div>
  );
}




export default function MainCards() {
  const apiRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const { isLastItem } = useContext(VisibilityContext);    

  useEffect(() => {
    // Set up the interval
    
    const timer = setInterval(() => {
      console.log(isLastItem)
      if (!isPaused && apiRef.current) {
        if (isLastItem) {
            
          // If we hit the end, jump back to the start
          apiRef.current.scrollToItem(apiRef.current.getItemById(items[0]));
        } else {
          apiRef.current.scrollNext();
        }
      }
    }, 1000); // Scrolls every 3 seconds

    // Clean up timer on unmount
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div 
      className="CardList" 
      // Pause scrolling when mouse enters, resume when it leaves
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <ScrollMenu apiRef={apiRef}>
        {items.map((item) => (
          <Card itemId={item} key={item} title={item} />
        ))}
      </ScrollMenu>
    </div>
  );
}