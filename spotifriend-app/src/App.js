import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // Fetch user profile from your backend
    axios.get('/api/user')
      .then(response => setUsername(response.data.username))
      .catch(error => console.log(error));

    // Fetch top artists from your backend
    axios.get('/api/top-artists')
      .then(response => setTopArtists(response.data))
      .catch(error => console.log(error));

    // Fetch top tracks from your backend
    axios.get('/api/top-tracks')
      .then(response => setTopTracks(response.data))
      .catch(error => console.log(error));

    // Fetch public playlists from your backend
    axios.get('/api/playlists')
      .then(response => setPlaylists(response.data))
      .catch(error => console.log(error));

    setTopArtists([
      { name: 'Artist 1' },
      { name: 'Artist 2' },
      { name: 'Artist 3' },
      { name: 'Artist 4' },
      { name: 'Artist 5' }
    ]);
    setTopTracks([
      { name: 'Track 1', artists: ['Artist 1'] },
      { name: 'Track 2', artists: ['Artist 2'] },
      { name: 'Track 3', artists: ['Artist 3'] },
      { name: 'Track 4', artists: ['Artist 4'] },
      { name: 'Track 5', artists: ['Artist 5'] }
    ]);
    setPlaylists([
      { name: 'Playlist 1' },
      { name: 'Playlist 2' },
      { name: 'Playlist 3' },
      { name: 'Playlist 4' },
      { name: 'Playlist 5' }
    ]);
    setUsername('Username');
  }, []);

  return (
    <div>
      <h1>{username}</h1>
      <div>
        <h3>Top 5 Artists:</h3>
        <ul>
          {topArtists.map((artist, index) => (
            <li key={index}>{artist.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Top 5 Tracks:</h3>
        <ul>
          {topTracks.map((track, index) => (
            <li key={index}>{track.name} by {track.artists.join(', ')}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Public Playlists:</h3>
        <ul>
          {playlists.map((playlist, index) => (
            <li key={index}>{playlist.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
