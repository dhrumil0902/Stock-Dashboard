import React, { useState, useEffect } from 'react';

const StockSearch = ({ onSearch }) => {
  // Load the ticker from localStorage or set to an empty string
  const [ticker, setTicker] = useState(() => {
    return localStorage.getItem('selectedTicker') || '';
  });

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (ticker) {
      // Save the ticker to localStorage when searched
      localStorage.setItem('selectedTicker', ticker);
      onSearch(ticker); // Trigger search
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter stock ticker"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default StockSearch;
