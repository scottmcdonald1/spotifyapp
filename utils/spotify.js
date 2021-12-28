import Spotify from 'spotify-web-api-node';

const createSpotifyApi = (token) => {
  const spotify = new Spotify({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  })

  spotify.setAccessToken(token)

  return spotify;
}

export default createSpotifyApi;