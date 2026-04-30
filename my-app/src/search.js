import { useState, useRef, useEffect } from "react";
import './App.css';
import { useNavigate } from "react-router-dom";

export default function SearchBar({ onFilter }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (value) => {
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/games?search=${value}`);
      const data = await res.json();
      setSuggestions(data.slice(0, 8));
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Debounce API calls
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 250);

    // If a filter callback was provided (homepage), filter cards in real time
    if (onFilter) {
      onFilter(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    setSuggestions([]);
    // If we have a filter callback, just filter — don't navigate
    if (onFilter) {
      onFilter(query);
    }
  };

  const handleSuggestionClick = (game) => {
    navigate(`/game/${game.id}`);
    setQuery("");
    setSuggestions([]);
    if (onFilter) onFilter("");
  };

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search games…"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((game) => (
            <div
              key={game.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(game)}
            >
              {game.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}