import React from "react";
import Image from "next/image";
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
      </div>
    )
}

export async function getStaticProps() {

  const data = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", 
  {
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_OAUTH_TOKEN}`
    }
  }).then(response => response.json());

  console.log(data);

  return {
    props: {
      genres: ["test", "test2"]
    }
  }
}