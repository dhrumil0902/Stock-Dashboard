import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockNews = ({ ticker }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsApiKey = '14b73ba596fb47468de8ddb30a9b1555'; // Replace with your News API key
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${ticker}&apiKey=${newsApiKey}`
        );
        setNews(response.data.articles.slice(0, 6)); // Get the top 5 news articles
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    if (ticker) {
      fetchNews();
    }
  }, [ticker]);

  return (
    <div>
      <h3>Latest News</h3>
      {loading ? (
        <p>Loading news...</p>
      ) : news.length > 0 ? (
        <div style={styles.newsContainer}>
          {news.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.newsBox}
            >
              <div style={styles.newsContent}>
                <h4 style={styles.newsTitle}>{article.title}</h4>
                <p style={styles.newsDescription}>{article.description}</p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
};

// Basic styling for the news layout
const styles = {
  newsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  newsBox: {
    display: 'block',
    textDecoration: 'none',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    transition: 'all 0.3s ease',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  },
  newsBoxHover: {
    boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
  },
  newsContent: {
    color: '#333',
  },
  newsTitle: {
    fontSize: '16px',
    margin: '0 0 10px 0',
    fontWeight: 'bold',
    color: '#0077cc', // Blue color for the title to make it stand out
  },
  newsDescription: {
    fontSize: '14px',
    margin: 0,
  },
};

export default StockNews;
