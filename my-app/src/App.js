import './App.css';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import "react-horizontal-scrolling-menu/dist/styles.css";
import Search from "./search.js"
const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

function Card({ title }) {
  return (
    <div
      style={{
        width: "150px",
        height: "100px",
        margin: "0 10px",
        background: "#eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
      }}
    >
      {title}
    </div>
  );
}



export default function App() {
  return (
    <div className="app-container">
      <header className="navbar">
        <h1 className="logo">Game</h1>
        <Search />
      </header>
       <ScrollMenu>
        {items.map((item) => (
          <Card itemId={item} key={item} title={item} />
        ))}
      </ScrollMenu>
    </div>
    
  );
}

