import './App.css';
import "react-horizontal-scrolling-menu/dist/styles.css";
import Search from "./search.js"
import MainCards from './cards.js';

import GamePage from "./gamepage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Home page */}
        <Route
          path="/"
          element={
            <div className="app-container">
              <header className="navbar">
                <h1 className="logo">Game Lookup</h1>
                <Search />
              </header>
              <MainCards />
            </div>
          }
        />

        {/* Game page */}
        <Route path="/gamepage" element={<GamePage />} />

      </Routes>
    </Router>
  );
}
