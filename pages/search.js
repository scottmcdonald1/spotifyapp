import React from "react";
import Head from "next/head";
import SearchForm from "../src/SearchForm";
import cookie from 'cookie'
import Iron from '@hapi/iron'
import Image from "next/image";


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

function Results({data, searchQuery, searchType}) {


  
  if (searchType === "artist") {

    let key = 0;

    const resultsList = data.artists.items.map(item => {
      key++;
      return (
        <h1 className="m-1 font-monda">{key}. <span className="text-vert59">{item.name}</span></h1>
      )
      
    })

    return ( 
      <div className="w-full px-5 break-words">
        <h1 className="font-bowlbyOneSC">Results for <span className="text-orangeVif">{searchQuery}</span> in <span className="text-orangeVif">{searchType}</span></h1>
        {resultsList}
      </div>
    )
  } else {
    const resultsList = data.tracks.items.map(item => {
      return (
        <Data data={item} />
      )
    })
    return (
      <div className="w-full px-5 break-words">
        <h1 className="font-bowlbyOneSC">Results for <span className="text-orangeVif">{searchQuery}</span> in <span className="text-orangeVif">{searchType}</span></h1>

        {resultsList}
      </div>
    )
  }
}

function DataCell(props) {
  return (
    <>
      <label className="block">
        <span className="block text-sm font-medium mb-2 text-spotifyBlack/50">{props.label}</span>
        <h1 className="font-monda text-xl"><i>{props.data}</i></h1>
      </label>
    </>
  )
}

function millisToMinutesAndSeconds(millis) {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function Data({data}) {
  const trackName = data.name;
  const artistName = data.artists[0].name;
  const thumbnail = data.album.images[1].url;
  const albumName = data.album.name;

  const trackNumber = `${data.track_number} out of ${data.album.total_tracks}`;
  const duration = millisToMinutesAndSeconds(data.duration_ms)
  const releaseDate = data.album.release_date;

  const isrc = data.external_ids.isrc;

  return (
    <div className="w-full grid grid-cols-5 justify-center m-4 px-5 py-3 border border-ombreNaturelle31/60 shadow-sharp rounded">
      <div className="flex items-center">
        <Image src={thumbnail} width={300} height={300} />
      </div>
      <div className="col-span-4 grid grid-cols-3 m-4 px-5 py-3 border border-ombreNaturelle31/60 shadow-sharp rounded">
        
        <div className="px-2">
          <DataCell label="title" data={trackName} />
          <DataCell label="artist" data={artistName} />
          <DataCell label="album" data={albumName} />
        </div>

        <div>
          <DataCell label="track number" data={trackNumber} />
          <DataCell label="duration" data={duration} />
          <DataCell label="release date" data={releaseDate} />
        </div>
  
        <div>
          <DataCell label="ISRC" data={isrc} />

        </div>

      </div>
    </div>
  )
}

export const getSessionCookie = async (cookies) => {

  console.log('working... 2')
  const cookie = cookies['auth.session'];

  if (!cookie) {
    throw new Error('Auth session not found')
  }

  const decoded = await Iron.unseal(cookie, process.env.SESSION_SECRET, Iron.defaults)

  return decoded;
}

export async function getServerSideProps({req, query}) {
  const cookies = cookie.parse(req.headers.cookie || '')
  // const searchQuery = query.q.replaceAll(' ', '%20');
  const searchQuery = query.q;
  const searchType = query.type;

  try {
    const cookies = cookie.parse(req.headers.cookie || '')
    const session = await getSessionCookie(cookies)

    // console.log('working... 3')

    const token = session.token.access_token;
    // console.log('token: ', token)
    const token2 = process.env.SPOTIFY_OAUTH_TOKEN;
    // console.log('token2: ',token2)

    const url = `https://api.spotify.com/v1/tracks/${searchQuery}`;
    const url2 = `https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}`
    console.log('url: ', url2)

    const data = await fetch(url2, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => response.json());

    console.log('data: ', data)
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