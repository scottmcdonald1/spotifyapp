import React from "react";
import Head from "next/head";
import cookie from 'cookie'
import Iron from '@hapi/iron'

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

async function getArtistData(searchQuery, token) {

  const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=artist`;

  const artistData = await fetch(url, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).then(response => response.json());

  return artistData;
}

async function getTrackData(searchQuery, token) {
  const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`;

  const trackData = await fetch(url, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).then(response => response.json());

  return trackData;
}

async function getAlbumData(searchQuery, token) {
  const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=album`;

  const albumData = await fetch(url, 
    {
      headers: {
        Authorization: `Bearer ${token}`
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

    const token = session.token.access_token;

    const artistData = await getArtistData(searchQuery, token);
    const trackData = await getTrackData(searchQuery, token);
    const albumData = await getAlbumData(searchQuery, token);

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