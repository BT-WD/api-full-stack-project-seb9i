import './App.css';

export default function searchBar() {
     return (
    <div className="search-container">
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search For Game" 

      />
      <button className="search-button" type="button">
        Search
      </button>
    </div>
  );
}