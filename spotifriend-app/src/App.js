import React, { useState } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([
    { id: 1, imageUrl: 'https://fastly.picsum.photos/id/352/200/300.jpg?hmac=JRE6d4eB1tvPUpBESG8XEM2_22EaXNe2luRrVkydr2E', name: 'Card 1' },
    { id: 2, imageUrl: 'https://fastly.picsum.photos/id/922/200/300.jpg?hmac=8jYf_4IHA1W1IEWKcG0gSoMAP1LKJ7QzAsSTVIYjwXM', name: 'Card 2' },
    { id: 3, imageUrl: 'https://fastly.picsum.photos/id/427/200/300.jpg?hmac=3a8xqsGEgfpWKYUhKjkcHRNP0NcEsi0Oyvw5gT6Kpc8', name: 'Card 3' }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    // Handle swipe left action
    console.log('Swiped left');
    setCurrentIndex(currentIndex + 1);
  };

  const handleSwipeRight = () => {
    // Handle swipe right action
    console.log('Swiped right');
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="App">
      <h1>Spotifriend</h1>
      <h2>A new way to connect</h2>

      {currentIndex < cards.length && (
        <div className="card-container">
          <div key={cards[currentIndex].id} className="card">
            <img src={cards[currentIndex].imageUrl} alt={cards[currentIndex].name} className="card-image" />
            <div className="card-info">
              <h3>{cards[currentIndex].name}</h3>
              <div className="actions">
                <button onClick={handleSwipeLeft} className="swipe-left">❌</button>
                <button onClick={handleSwipeRight} className="swipe-right">✔️</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;