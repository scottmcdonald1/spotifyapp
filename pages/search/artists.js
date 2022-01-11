import React, { useState } from "react";
import Head from "next/head";
import cookie from 'cookie'
import Iron from '@hapi/iron'
import Image from "next/image";

import { getSessionCookie } from "..";

export default function Artists({user, data, albumData, id}) {

  const albumItems = albumData.items.map(item => {

    const [displayTracks, setDisplayTracks] = useState(false)

    const trackList = displayTracks ? (
      <div className="w-full grid grid-cols-1 px-8 py-2">
        <div className="w-full border border-ombreNaturelle31/60 shadow-sharp rounded px-2 py-2">
          <h1>tracks will go here</h1>
        </div>
      </div>
    ) : (<></>);

    const showTracks = (e) => {
      e.preventDefault();
      setDisplayTracks(!displayTracks)
    }

    return (
      <>
      <div className="grid grid-cols-4 bg-white border border-ombreNaturelle/60 rounded px-2 py-2 shadow-sharp items-end">

        <div className="col-span-2">
          <h1 className="font-monda text-xl text-ombreNaturelle31"><i>{item.name}</i></h1>
        </div>

        <div className="col-span-1">
          <h1 className="font-moda text-md text-ombreNaturelle31/70">{item.release_date}</h1>
        </div>

        <div className="col-span-1 grid justify-end">
          <button 
          onClick={showTracks}
          className="rounded-full border hover:border-spotifyBlack hover:shadow-smallSpread text-ombreNaturelle31/70 hover:text-ombreNaturelle31 p-2 transition duration-150 ease-out">
            view tracks
          </button>
        </div>
      </div>

      {trackList}
      </>
    )
  })

  const artwork = data.images[1] !== undefined ? (
    <div className="rounded-full overflow-hidden border border-ombreNaturelle31">
      <Image src={data.images[1].url} width={300} height={300} />
    </div>
  ) : (
    <>
      <Image src={logo} width={200} height={200} />
      <h1 className="font-monda">no artwork available</h1>
    </>
  )

  return (
    <div className="w-full min-h-screen grid gap-2 grid-cols-1 justify-center items-center py-20">

      <Head>
        <title>Search - Spotify App</title>
      </Head>

      <div className="w-full grid grid-cols-3 border border-ombreNaturelle31/60 shadow-sharp rounded px-2 py-4">

        <div className="col-span-1 flex sm:flex-row md:flex-col justify-center items-center">
          <div className="flex flex-col items-center p-2 bg-white border-l border-b border-orangeVif shadow-spread rounded-full overflow-hidden">
            {artwork}
         </div>
        </div>

        <div className="col-span-2 grid grid-cols-1 grid-rows-3 bg-white border-l border-b border-orangeVif shadow-spread rounded px-2 py-4">
          <div className="grid col-span-1 row-span-1 justify-center items-center">
            <h1 className="font-bowlbyOneSC text-5xl text-orangeVif">{data.name}</h1>
          </div>
          <div className="grid col-span-1 row-span-2">
          <label className="block">
            <span className="block text-sm font-monda mb ml-1 text-spotifyBlack/50">genres</span>
            <h1 className="font-monda text-xl text-ombreNaturelle31/70 sm:break-words"><i>{data.genres.join(', ')}</i></h1>
          </label>
          </div>
        </div>

      </div>


      <div className="w-full py-8 break-words grid gap-4 grid-cols-1">

        <div className="w-full grid col-span-1 justify-end items-center border-b border-orangeVif">
          <h1 className="font-bowlbyOneSC text-3xl text-vert59">Albums</h1>
        </div>

        <div className="grid gird-cols-1 gap-3 px-8">
          {albumItems}
        </div>

      </div>

    </div>
    );
    
}

async function getAlbumData(id, token) {
  const url = `	https://api.spotify.com/v1/artists/${id}/albums`

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

    const url = `https://api.spotify.com/v1/artists/${id}`;

    const data = await fetch(url, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => response.json());

    const albumData = await getAlbumData(id, token);
    console.log(albumData)

    return {
      props: {
        user: session.user,
        data: data,
        albumData: albumData,
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