const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const app = express();
const PORT = 3000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/callback'; // Must be configured in your Spotify Developer Dashboard

// Route for initiating Spotify login
app.get('/login', (req, res) => {
    const queryParams = querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: 'user-library-read playlist-read-private', // Scope required for accessing the user's saved tracks
        redirect_uri: REDIRECT_URI
    });

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// Route for handling the callback from Spotify
app.get('/callback', async (req, res) => {
    const { code } = req.query;

    try {
        // Exchange the authorization code for an access token
        const { data } = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = data.access_token;

        // Fetch user's playlists
        const playlistsResponse = await axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const playlists = playlistsResponse.data.items.map(playlist => playlist.name);
        console.log(playlists)
        res.json(playlists);
    } catch (error) {
        console.error('Error exchanging code for access token:', error.response.data);
        res.status(500).send('Failed to authenticate with Spotify');
    }
});
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
