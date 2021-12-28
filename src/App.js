import React from 'react'
import Image from "next/image";

import SearchForm from '../src/SearchForm'

import greenSpotifyLogo from '../public/spotify/Spotify_Logo_RGB_Green.png'

export default function App({ user }) {
  
  return (
    <div>
      {user ? (
        <Landing displayName={user.body.display_name} spotifyURL={user.body.external_urls.spotify} />
      ) : (
        <LoginButton />
      )}
    </div>
  )
}

function Landing(props) {
  return (
    <>
      <div className='bg-white m-4 px-5 py-3 border border-ombreNaturelle31/60 shadow-sharp rounded'>
        <div className='flex justify-center'>
          <h2 className='font-monda text-xl text-vert59 whitespace-nowrap hover:underline transition-all'>
            <a href={props.spotifyURL} target="_blank">{props.displayName}</a>
          </h2>
        </div>
      </div>
      <SearchForm />
    </>
  )
} 

function LoginButton() {

  return (

    <>
      <div className='bg-white m-4 px-5 py-3 border border-ombreNaturelle31/60 shadow-sharp rounded'>

        <label className="block">
          <span className="block text-sm font-medium mb-2 text-spotifyBlack/50">Login with</span>
          <a href="/api/auth/login">
            <button 
              type="submit"
              className="w-48 rounded-full border-2 px-6 py-2.5 leading-tight hover:border-2 hover:border-spotifyBlack/80 hover:shadow-smallSpread transition-all duration-300 ease-in-out"
            >
              <Image src={greenSpotifyLogo} layout='intrinsic' />
            </button>
          </a>

        </label>

      </div>
    </>
  )
}