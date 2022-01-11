import React, { useState } from "react";
import Head from "next/head";
import cookie from 'cookie'
import Iron from '@hapi/iron'
import Image from "next/image";

import { getSessionCookie } from "..";
import { millisToMinutesAndSeconds } from "../../src/search/Results";
import Link from "next/link";

export default function Track({user, data, id}) {

  const albumArtwork = data.album.images[1].url;
  const artist = data.artists[0].name;
  const album = data.album.name;

  const [displayApiInfo, setDisplayApiInfo] = useState(false)
  const toggleButton = displayApiInfo ? "hide" : "show";

  const toggleApiInfo = () => {
    if (displayApiInfo) {
      setDisplayApiInfo(false);
    } else {
      setDisplayApiInfo(true);
    }
  }

  return (

    <div className="w-full grid gap-2 grid-cols-1 justify-center pt-20">

      <div className="grid grid-cols-3 gap-4">

        <div className="col-span-1">
          <Image src={albumArtwork} width={300} height={300} />
        </div>

        <div className="col-span-2">
          <h1 className="font-bowlbyOneSC text-3xl text-vert59"><i>{data.name}</i></h1>
          <h2 className="font-bowlbyOneSC text-xl text-ombreNaturelle31">
            by <span className="text-orangeVif">{artist}</span> on <span className="text-orangeVif"><i>{album}</i></span>
          </h2>
          <h2 className="font-monda text-xl text-ombreNaturelle31">track number <span className="text-orangeVif">{data.track_number}</span> out of <span className="text-orangeVif">{data.album.total_tracks}</span></h2>
        </div>

      </div>

      <div>

        <div className="bg-white grid grid-cols-2 items-center border border-ombreNaturelle/60 rounded px-2 py-2 shadow-sharp rounded">
          <div className="col-span-1">
            <h1 className="font-monda text-xl text-orangeVif">API information</h1>
          </div>

          <div className="grid col-span-1 justify-end">
            <button
              onClick={toggleApiInfo}
              className="bg-white rounded-full border hover:border-spotifyBlack hover:shadow-smallSpread text-ombreNaturelle31/50 hover:text-ombreNaturelle31 p-2 transition duration-150 ease-out"
            >
              {toggleButton}
            </button>
          </div>
        </div>
      </div>

        {displayApiInfo ? (
          <>
            <ApiInfo data={data} />
          </>
        ) : (
          <></>
        )}

    </div>

  )

}

function ApiInfo({data}) {

  return (
    <div className="px-4">

      <h2 className="font-monda text-vert59">album: </h2>
      <ul className="list-outside font-monda text-ombreNaturelle31 px-4">

            <li>album_type: <span className="text-orangeVif">{data.album.album_type}</span></li>

      </ul>
    {JSON.stringify(data)}
    </div>
  )
}

export async function getServerSideProps({req, query}) {
  const id = query.id;

  try {

    const cookies = cookie.parse(req.headers.cookie || '')
    const session = await getSessionCookie(cookies)

    const token = session.token.access_token;

    const url = `https://api.spotify.com/v1/tracks/${id}`;

    const data = await fetch(url, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => response.json());


    return {
      props: {
        user: session.user,
        data: data,
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