import { NextApiRequest, NextApiResponse } from "next";

const scopes = [
  'streaming',
  'user-read-playback-state',
  'user-read-email',
  'user-read-private',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
]

const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } = process.env;

const buildURL = (scopes, callback) => {
  return (
    'https://accounts.spotify.com/authorize?response_type=code' +
    `&client_id=${SPOTIFY_CLIENT_ID}` +
    `&scope=${encodeURIComponent(scopes.join(' '))}` +
    `&redirect_uri=${encodeURIComponent(callback)}`
  );
}

export default async (req, res) => {
  return res.redirect(buildURL(scopes, SPOTIFY_REDIRECT_URI));
}