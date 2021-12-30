import React from 'react'
import Image from "next/image";

import SearchForm from '../src/SearchForm'

import greenSpotifyLogo from '../public/spotify/Spotify_Logo_RGB_Green.png'
import homeIcon from '../public/home.png';
import Link from 'next/link';

export default function App({ user }) {
  
  return (
    <div className='w-screen py-3 mb-5'>
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
    <div className='w-full fixed top-0 z-20 bg-white grid grid-cols-12 border-b border-ombreNaturelle31/60 shadow-smallSpread'>

      <div className='flex items-center justify-start col-span-2 pl-5'>
        <label className="block">
          <span className="block text-sm font-medium mb-2 text-spotifyBlack/50">Logged in as</span>
            <h2 className='font-monda text-xl text-vert59 whitespace-nowrap hover:underline transition-all'>
              <a href={props.spotifyURL} target="_blank">{props.displayName}</a>
            </h2>
        </label>
      </div>

      <Link href={'/'}>
      <div className='h-full py-3 flex items-center justify-center cursor-pointer hover:shadow-insetSmallSpread'>
          <Image src={homeIcon} width={48} height={48} />
      </div>
      </Link>
      
      <div className='col-span-6 col-start-7 justify-end py-3'>
        <SearchForm />
      </div>
    </div>
  )
} 

function LoginButton() {

  return (

    <>
      <div className='w-full py-3 fixed top-0 z-20 bg-white pl-5 border border-ombreNaturelle31/60 shadow-sharp rounded'>

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