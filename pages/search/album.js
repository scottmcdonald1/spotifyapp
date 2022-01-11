import React, { useState } from "react";
import Head from "next/head";
import cookie from 'cookie'
import Iron from '@hapi/iron'
import Image from "next/image";

import { getSessionCookie } from "..";
import { millisToMinutesAndSeconds } from "../../src/search/Results";
import Link from "next/link";

export default function Album({user, data, trackData, id}) {
  const albumName = data.name;
  const artist = data.artists[0].name;
  const albumArtwork = data.images[1].url;

  const [displayApiInfo, setDisplayApiInfo] = useState(false)

  const toggleInfoDisplay = () => {
    if (displayApiInfo) {
      setDisplayApiInfo(false);
    } else {
      setDisplayApiInfo(true);
    }
  }

  const trackList = trackData.items.map((item, i) => {
    const trackPageUrl = `/search/track?id=${item.id}`

    return (
      <div key={i} className="grid grid-cols-3">
        <h1>{item.name}</h1>
        <h1>{millisToMinutesAndSeconds(item.duration_ms)}</h1>
        <Link href={trackPageUrl}>Track Page</Link>
      </div>
    )
  })

  return (
    <div className="w-full min-h-screen grid gap-2 grid-cols-1 justify-center items-center py-20">
      <div>
        <Image src={albumArtwork} width={300} height={300} />
      </div>
      <h1 className="font-bowlbyOneSC text-3xl text-vert59">{albumName}</h1>
      <h1 className="font-bowlbyOneSC text-xl text-ombreNaturelle31">by <span className="text-orangeVif">{artist}</span></h1>
      
      <div>
        <h1 className="font-monda text-xl text-orangeVif">tracks</h1>
        <div>
          {trackList}
        </div>
      </div>

      <div>
        <h1 className="font-monda text-xl text-orangeVif">API information</h1>
        {displayApiInfo ? (
          <>
            <div>{JSON.stringify(data)}</div>
            <button
              onClick={toggleInfoDisplay}
              className="rounded-full border hover:border-spotifyBlack hover:shadow-smallSpread text-ombreNaturelle31/70 hover:text-ombreNaturelle31 p-2 transition duration-150 ease-out"
            >
              hide -
            </button>
          </>
        ) : (
          <button
            onClick={toggleInfoDisplay}
            className="rounded-full border hover:border-spotifyBlack hover:shadow-smallSpread text-ombreNaturelle31/70 hover:text-ombreNaturelle31 p-2 transition duration-150 ease-out"
          >
            show +
          </button>
        )}
        
      </div>
    </div>
  )

}

async function getAlbumTrackData(id, token) {
  const url = `https://api.spotify.com/v1/albums/${id}/tracks`;

  const data = await fetch(url, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }  
  ).then(response => response.json());

  return data;
}

export async function getServerSideProps({req, query}) {
  const id = query.id;

  try {

    const cookies = cookie.parse(req.headers.cookie || '')
    const session = await getSessionCookie(cookies)

    const token = session.token.access_token;

    const url = `https://api.spotify.com/v1/albums/${id}`;

    const data = await fetch(url, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => response.json());

    const trackData = await getAlbumTrackData(id, token);
    console.log(trackData)

    return {
      props: {
        user: session.user,
        data: data,
        trackData: trackData,
        id: id,
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