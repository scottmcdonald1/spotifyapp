import React from "react";
import Head from "next/head";
import cookie from 'cookie'
import Iron from '@hapi/iron'

import SearchForm from "../../src/SearchForm";
import Results from "../../src/Results";


export default function Search({data, searchQuery, searchType}) {

    return (
      <div className="flex flex-col justify-center items-center w-full min-h-screen px-8">
        <Head>
          <title>Search - Spotify App</title>
        </Head>

        <SearchForm />

        {data != null ? (
          
          <Results data={data} searchQuery={searchQuery} searchType={searchType} />
          
        ) : (
          <>
            <h1 className="font-oxygenMono">No results found</h1>
          </>
        )}
            
      </div>
    )
}

export const getSessionCookie = async (cookies) => {

  const cookie = cookies['auth.session'];

  if (!cookie) {
    throw new Error('Auth session not found')
  }

  const decoded = await Iron.unseal(cookie, process.env.SESSION_SECRET, Iron.defaults)

  return decoded;
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

    console.log('data: ', data)
    console.log('dataItems: ', data.items)

    // console.log('YOOOO: ', data.tracks.items[0]);

    return {
      props: {
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