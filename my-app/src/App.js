import './App.css';
import { useState } from "react";
import Search from "./search.js";
import MainCards from './cards.js';
import GamePage from "./gamepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function HomePage() {
  const [filterQuery, setFilterQuery] = useState("");

  return (
    <div className="app-container">
      <header className="navbar">
        <h1 className="logo">Game<span>Lookup</span></h1>
        <Search onFilter={setFilterQuery} />
      </header>
      <MainCards filterQuery={filterQuery} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:id" element={<GamePage />} />
      </Routes>
    </Router>
  );
}