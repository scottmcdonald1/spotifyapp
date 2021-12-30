import React from "react";
import Head from "next/head";
import cookie from 'cookie'
import Iron from '@hapi/iron'

import SearchForm from "../../src/SearchForm";
import { getSessionCookie } from "..";
import Results from "../../src/Results";


export default function Search({user, data, searchQuery, searchType}) {

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen pt-20">
      <Head>
        <title>Search - Spotify App</title>
      </Head>

      <div className="w-full p-4 mb-10 border-b border-ombreNaturelle31">
        <h1 className="font-bowlbyOneSC">
          Results for <span className="text-orangeVif">{searchQuery}</span> in <span className="text-orangeVif">{searchType}</span>
        </h1>
      </div>

      {data != null ? (
        
        <Results data={data} searchType={searchType} />
        
      ) : (
        <>
          <h1 className="font-oxygenMono">No results found</h1>
        </>
      )}
          
    </div>
  )
}

async function getArtistResults(searchQuery) {
  const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=artist`;
  return 'hello';
}

export async function getServerSideProps({req, query}) {
  // const cookies = cookie.parse(req.headers.cookie || '')
  const searchQuery = query.q;
  const searchType = query.type;

  try {
    const cookies = cookie.parse(req.headers.cookie || '')
    const session = await getSessionCookie(cookies)

    const token = session.token.access_token;
    // console.log('token: ', token)
    const token2 = process.env.SPOTIFY_OAUTH_TOKEN;
    // console.log('token2: ',token2)

    const url = `https://api.spotify.com/v1/tracks/${searchQuery}`;
    const url2 = `https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}`
    // console.log('url: ', url2)

    const data = await fetch(url2, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => response.json());

    // console.log('data: ', data)
    // console.log('dataItems: ', data.items)
    // console.log('YOOOO: ', data.tracks.items[0]);

    return {
      props: {
        user: session.user,
        data: data,
        searchQuery: searchQuery,
        searchType: searchType
      }
    }
      
  } catch {
    return {
      props: {
        data: null
      }
    }
  }

}