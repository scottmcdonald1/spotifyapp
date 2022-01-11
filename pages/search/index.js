import React from "react";
import Head from "next/head";
import cookie from 'cookie'

import { getSessionCookie } from "..";
import Results from "../../src/search/Results";


export default function Search({user, trackData, artistData, albumData, searchQuery, searchType}) {

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen py-20">
      <Head>
        <title>Search - Spotify App</title>
      </Head>

      <div className="w-full p-4 mb-10 border-b border-ombreNaturelle31">
        <h1 className="font-bowlbyOneSC">
          Results for <span className="text-orangeVif">{searchQuery}</span> in <span className="text-orangeVif">{searchType}</span>
        </h1>
      </div>

      <Results 
        trackData={trackData}
        artistData={artistData}
        albumData={albumData}
        searchType={searchType} 
      />
          
    </div>
  )
}

async function getRefreshToken(refreshToken) {
  const newToken = await fetch('https://accounts.spotify.com/api/token', 
    {
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }
    }
  ).then(response => response.json());
  return newToken.access_token;
}

async function getArtistData(searchQuery, accessToken, refreshToken) {

  const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=artist`;

  // const newToken = await getRefreshToken(refreshToken);
  // console.log(newToken)

  const artistData = await fetch(url, 
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  ).then(response => response.json());

  return artistData;
}

async function getTrackData(searchQuery, accessToken) {
  const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`;

  const trackData = await fetch(url, 
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  ).then(response => response.json());

  return trackData;
}

async function getAlbumData(searchQuery, accessToken) {
  const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=album`;

  const albumData = await fetch(url, 
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  ).then(response => response.json());

  return albumData;
}

export async function getServerSideProps({req, query}) {
  const searchQuery = query.q;
  const searchType = query.type;

  try {

    const cookies = cookie.parse(req.headers.cookie || '')
    const session = await getSessionCookie(cookies)

    const accessToken = session.token.access_token;
    const refreshToken = session.token.refresh_token;

    const artistData = await getArtistData(searchQuery, accessToken, refreshToken);
    const trackData = await getTrackData(searchQuery, accessToken);
    const albumData = await getAlbumData(searchQuery, accessToken);

    return {
      props: {
        user: session.user,
        artistData: artistData,
        trackData: trackData,
        albumData: albumData,
        searchQuery: searchQuery,
        searchType: searchType
      }
    }
      
  } catch {

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  }

}