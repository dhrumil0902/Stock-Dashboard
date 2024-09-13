import React, { useState, useEffect } from 'react';
import StockChart from './components/StockChart';
import StockNews from './components/StockNews';
import Watchlist from './components/Watchlist';
import RedditThreads from './components/RedditThreads';
import './App.css'; // Add some global styles

const App = () => {
    const [ticker, setTicker] = useState(() => {
        return localStorage.getItem('selectedTicker') || 'TSLA'; // Default to 'TSLA'
    });

  // Retrieve the ticker from localStorage when the app loads
  useEffect(() => {
    const savedTicker = localStorage.getItem('selectedTicker');
    if (savedTicker) {
      setTicker(savedTicker);
    }
  }, []);

  // Save the selected ticker to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedTicker', ticker);
  }, [ticker]);

  return (
    <div className="app-container">
      <header>
        <h1>Stock Dashboard for {ticker}</h1>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter stock ticker"
          className="ticker-input"
        />
      </header>

      <div className="dashboard">
        {/* Watchlist and chart in the first row */}
        <div className="watchlist-container">
          <Watchlist onSelectTicker={setTicker} />
        </div>

        <div className="chart-container">
          <StockChart ticker={ticker} />
        </div>

        {/* Reddit threads below the watchlist and chart */}
        <div className="reddit-threads-container">
          <RedditThreads ticker={ticker} />
        </div>

        {/* Latest news spanning across both rows */}
        <div className="news-container">
          <StockNews ticker={ticker} />
        </div>
      </div>
    </div>
  );
};

export default App;
