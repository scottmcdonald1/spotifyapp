import React from "react";
import Head from "next/head";
import SearchForm from "../src/SearchForm";
import cookie from 'cookie'
import Iron from '@hapi/iron'
import Image from "next/image";


export default function Search(props) {

    return (
      <div className="flex flex-col justify-center items-center w-full px-8">
        <Head>
          <title>Search - Spotify App</title>
        </Head>

        <SearchForm />

        <Data data={props.data} />
            
      </div>
    )
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
      <div>
        <Image src={thumbnail} width={300} height={300} />
      </div>
      <div className="col-span-4 grid grid-cols-3 m-4 px-5 py-3 border border-ombreNaturelle31/60 shadow-sharp rounded">
        
        <div>
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

// async function getAccessToken() {
//   const client_id = process.env.SPOTIFY_CLIENT_ID;
//   const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

//   const authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//       'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//     },
//     form: {
//       grant_type: 'client_credentials'
//     },
//     json: true
//   };
  
//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       const token = body.access_token;
//       return token;
//     } else {
//       console.error(error);
//     }
//   });
// }

export const getSessionCookie = async (cookies) => {

  console.log('working... 2')
  const cookie = cookies['auth.session'];
  // console.log('cookie: ', cookie)

  if (!cookie) {
    throw new Error('Auth session not found')
  }

  const decoded = await Iron.unseal(cookie, process.env.SESSION_SECRET, Iron.defaults)
  // console.log('decoded: ', decoded)

  return decoded;
}

export async function getServerSideProps({req}) {
  console.log('working... 1')
  const cookies = cookie.parse(req.headers.cookie || '')
  console.log('cookies: ',cookies)

  try {
    const cookies = cookie.parse(req.headers.cookie || '')
    const session = await getSessionCookie(cookies)

    console.log('working... 3')

    const token = session.token.access_token;
    console.log('token: ', token)
    const token2 = process.env.SPOTIFY_OAUTH_TOKEN;
    console.log('token2: ',token2)

    const url = 'https://api.spotify.com/v1/tracks/7CAfYCFKkoKPwfn9OzWXua';

    const data = await fetch(url, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => response.json());

    return {
      props: {
        data: data
      }
    }
      
  } catch {
    return {
      props: {
        data: 'poopoopeepee'
      }
    }
  }

}