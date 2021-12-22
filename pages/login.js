import React from "react";
import Image from "next/image";
import querystring from 'querystring'
import greenSpotifyLogo from '../public/spotify/Spotify_Logo_RGB_Green.png'

export default function Login({genres}) {

  const getTrack = async (e) => {
    e.preventDefault();
    alert('pressed!')
  }

    return (
      <div className="flex flex-col justify-center items-center w-full h-screen">

        <div className="border border-ombreNaturelle31/60 shadow-sharp rounded m-4 px-5 py-3">
          <label className="block">
            <span className="block text-sm font-medium mb-2 text-ombreNaturelle31/70">Login with</span>

            <button 
              type="submit"
              onClick={getTrack}
              className="w-48 rounded-full border-2 px-6 py-2.5 leading-tight hover:border-2 hover:border-spotifyBlack/80 hover:shadow-smallSpread transition-all duration-300 ease-in-out"
            >
              <Image src={greenSpotifyLogo} layout='intrinsic' />
            </button>

          </label>
        </div>

        <div className="border border-ombreNaturelle31/60 shadow-sharp rounded m-4 px-5 py-3">
          {/* <p>ALBUM: { genres.album.name }</p>
          <p>ARTIST: { genres.artists[0].name }</p>
          <p>ISRC: { genres.external_ids.isrc }</p> */}
        </div>

      </div>
    )
}

// const getAccessToken = async () => {

//   const client_id = process.env.SPOTIFY_CLIENT_ID;
//   const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
//   const refresh_token = process.env.SPOTIFY_OAUTH_TOKEN;

//   const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
//   const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

//   const response = await fetch(TOKEN_ENDPOINT, {
//     method: 'POST',
//     headers: {
//       Authorization: `Basic ${basic}`,
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: URLSearchParams.toString({
//       grant_type: 'refresh_token'
//     })
//   })

//   return response.json();
// }

export const getStaticProps = async () => {

  const { SPOTIFY_OAUTH_TOKEN } = process.env;

  const link1 = 'https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl'
  const link2 = 'https://api.spotify.com/v1/recommendations/available-genre-seeds'

  const data = await fetch(link1, 
  {
    headers: {
      Authorization: `Bearer ${SPOTIFY_OAUTH_TOKEN}`
    }
  }).then(response => response.json());

  console.log(data)

  return {
    props: {
      genres: data
    }
  }
}