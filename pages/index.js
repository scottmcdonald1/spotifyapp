import Head from 'next/head'
import Image from 'next/image';
import greenSpotifyLogo from '../public/spotify/Spotify_Logo_RGB_Green.png'


export default function Home() {

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <Head>
        <title>Spotify App</title>
      </Head>
      
      <div className="flex flex-col justify-center items-center m-4 px-5 py-3 border border-ombreNaturelle31/60 shadow-sharp rounded">
        <h1 className="font-bowlbyOneSC text-4xl">Spotify App</h1>
        <h2 className="font-monda text-xl">A Spotify Data Assistant</h2>
      </div>

    </div>
  )
}


