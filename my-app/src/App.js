import './App.css';
import "react-horizontal-scrolling-menu/dist/styles.css";
import Search from "./search.js"
import MainCards from './cards.js';




export default function App() {
  return (
    <div className="app-container">
      <header className="navbar">
        <h1 className="logo">Game</h1>
        <Search />
      </header>
       <MainCards/>
    </div>
    
  );
}

