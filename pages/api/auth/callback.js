import axios from 'axios';
import URLSearchParams from '@ungap/url-search-params'
import { NextApiRequest, NextApiResponse } from 'next';

import createSpotifyApi from '../../../utils/spotify';
import { setAuthCookie } from '../../../utils/cookies';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } = process.env;

const sendRefreshRedirect = (res, path = '/') => {
  res.status(200)

  return res.send(
    `<html><head><meta http-equiv="refresh" content=1;url="${path}"></head></html>`,
  )
}

export default async (req, res) => {
  const { code } =req.query;

  try {
    const { data } = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
        redirect_uri: SPOTIFY_REDIRECT_URI,
      }),
    )

    const spotify = createSpotifyApi(data.access_token)

    const profile = await spotify.getMe()

    const session = {
      user: profile,
      token: data,
    }

    await setAuthCookie(res, session, {
      maxAge: data.expires_in * 1000,
    })

    return sendRefreshRedirect(res);
  } catch(error) {
    console.error('Failed to sendRefreshRedirect', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Something went wrong',
    })
  }
}