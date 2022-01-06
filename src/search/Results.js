import React, { useState } from "react";
import Image from "next/image";

import logo from '../../public/logo.png'
import Link from "next/link";

export default function Results({trackData, artistData, albumData, searchType}) {

  let resultsList = null;
  
  if (searchType === 'all') {
    resultsList = (
      <AllData 
        trackData={trackData} 
        artistData={artistData}
        albumData={albumData}
      />
    ) 
  } else if (searchType === 'track') {
    let key = 0;
    resultsList = (
      trackData.tracks.items.map(item => {
        key++;
        return (
          <TrackData data={item} key={key} />
        )
      })
    )
  } else if (searchType === 'artist') {
    let key = 0;
    resultsList = (
      artistData.artists.items.map(item => {
        key++;
        return (
          <ArtistData data={item} key={key} />
        )
      })
    )
  } else if (searchType === 'album') {
    let key = 0;
    resultsList = (
      albumData.albums.items.map(item => {
        key++;
        return (
          <AlbumData data={item} key={key} />
        )
      })
    )
  }

  return ( 
    <div className="w-full grid gap-6 p-2 break-words">
      {resultsList}
    </div>
  )

}

function AllData({trackData, artistData, albumData}) {

  const [displayAllTracks, setDisplayAllTracks] = useState(false);

  let artistKey = 0;
  let trackKey = 0;
  let albumKey = 0;

  const trackItems = displayAllTracks ? trackData.tracks.items : trackData.tracks.items.slice(0,5)

  const trackDataList = trackItems.map(item => {
    trackKey++;
    return (
      <TrackData data={item} key={trackKey} />
    )
  })

  const artistDataList = artistData.artists.items.map(item => {
    artistKey++;
    return (
      <ArtistData data={item} key={artistKey} />
    )
  })

  const albumDataList = albumData.albums.items.map(item => {
    albumKey++;
    return (
      <AlbumData data={item} key={albumKey} />
    )
  })

  return (
    <>
    <div className="w-full grid gap-6 break-words">

      <h1 className="font-bowlbyOneSC text-vert59 text-4xl text-right border-b border-orangeVif">tracks</h1>
      <div className="border border-ombreNaturelle31/60 shadow-sharp rounded px-2 pb-4">
        {trackDataList}
        <div className="w-full grid justify-center pt-3">
          <button 
            className="rounded-full border hover:border-spotifyBlack hover:shadow-smallSpread text-ombreNaturelle31/70 hover:text-ombreNaturelle31 p-2 transition duration-150 ease-out"
          >
              view more
          </button>
        </div>
      </div>

      <h1 className="font-bowlbyOneSC text-vert59 text-4xl text-right border-b border-orangeVif">Artists</h1>
      <div className="border border-ombreNaturelle31/60 shadow-sharp rounded px-2 pb-4">
        {artistDataList}
        <div className="w-full grid justify-center pt-3">
          <button 
            className="rounded-full border hover:border-spotifyBlack hover:shadow-smallSpread text-ombreNaturelle31/70 hover:text-ombreNaturelle31 p-2 transition duration-150 ease-out"
          >
            view more
          </button>
        </div>
      </div>

      <h1 className="font-bowlbyOneSC text-vert59 text-4xl text-right border-b border-orangeVif">Albums</h1>
      <div className="border border-ombreNaturelle31/60 shadow-sharp rounded px-2 pb-4">
        {albumDataList}
        <div className="w-full grid justify-center pt-3">
          <button 
            className="rounded-full border hover:border-spotifyBlack hover:shadow-smallSpread text-ombreNaturelle31/70 hover:text-ombreNaturelle31 p-2 transition duration-150 ease-out"
          >
            view more
          </button>
        </div>
      </div>

    </div>
    </>
  )
}

function DataCell({label, data}) {
  const info = data !== '' ? (
    <h1 className="font-monda text-lg">{data}</h1>
  ) : (
    <h1 className="font-monda text-lg text-spotifyBlack/70">nothing listed</h1>
  );
  return (
    <div className="my-2">
      <label className="block">
        <span className="block text-sm font-monda mb ml-1 text-spotifyBlack/50">{label}</span>
        <h1 className="font-monda text-xl sm:break-words"><i>{info}</i></h1>
      </label>
    </div>
  )
}

function ArtistData({data}) {

  const artwork = data.images[1] !== undefined ? (
    <Image src={data.images[1].url} width={300} height={300} />
  ) : (
    <>
      <Image src={logo} width={200} height={200} />
      <h1 className="font-monda">no artwork available</h1>
    </>
  )

  return (
    <div className="w-full grid gap-2 sm:grid-cols-1 md:grid-cols-6 justify-center px-6 py-8 border-b border-vert59/50">
      <div className="col-span-2 flex sm:flex-row md:flex-col justify-center items-center">
        <div className="flex flex-col items-center p-2 bg-white border-l border-b border-orangeVif shadow-spread rounded">
          {artwork}
        </div>
      </div>

      <div className="w-full bg-white sm:col-span-1 md:col-span-4 grid sm:grid-cols-1 md:grid-cols-2 sm:ml-0 ml-2 px-2 py-3 border-l border-b border-orangeVif shadow-spread rounded">
        <DataCell label="name" data={data.name} />
        <DataCell label="genres" data={data.genres.join(', ')} />
      </div>
    </div>
  )
}

function millisToMinutesAndSeconds(millis) {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function TrackData({data}) {
  const trackName = data.name;
  const artistName = data.artists[0].name;
  const artistId = data.artists[0].id;
  const thumbnail = data.album.images[1].url;
  const albumName = data.album.name;

  const trackNumber = `${data.track_number} out of ${data.album.total_tracks}`;
  const duration = millisToMinutesAndSeconds(data.duration_ms)
  const releaseDate = data.album.release_date;

  const isrc = data.external_ids.isrc;
  const albumId= data.album.id;
  const artistPageUrl = `/search/artists?id=${artistId}`

  return (
    <div className="w-full grid gap-2 sm:grid-cols-2 md:grid-cols-6 justify-center px-6 py-6 border-b border-vert59/50">
      
      <div className="col-span-2 flex sm:flex-row md:flex-col justify-center items-center">
        <div className="bg-white p-2 pb-0 border-l border-b border-orangeVif shadow-spread rounded">
          <Image src={thumbnail} layout="intrinsic" width={300} height={300} />
        </div>
      </div>

      <div className="w-full bg-white sm:col-span-2 md:col-span-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 sm:ml-0 ml-2 px-2 py-3 border-l border-b border-orangeVif shadow-spread rounded">        
          <DataCell label="title" data={trackName} />
          <DataCell label="artist" data={artistName} />
          <DataCell label="album" data={albumName} />
          <DataCell label="track number" data={trackNumber} />
          <DataCell label="duration" data={duration} />
          <DataCell label="release date" data={releaseDate} />
          <DataCell label="ISRC" data={isrc} />
          <DataCell label="album id" data={albumId} />
          <DataCell label="artist id" data={artistId} />
          <Link href={artistPageUrl} >Page</Link>
      </div>
    </div>
  )
}

function AlbumData({data}) {
  const thumbnail = data.images[1].url
  const albumName = data.name;
  const artist = data.artists[0].name;
  const releaseDate = data.release_date;

  return (
    <div className="w-full grid gap-2 sm:grid-cols-1 md:grid-cols-6 justify-center px-6 py-8 border-b border-vert59/50">
      <div className="col-span-2 flex sm:flex-row md:flex-col justify-center items-center">
        <div className="p-2 bg-white pb-0 border-l border-b border-orangeVif shadow-spread rounded">
          <Image src={thumbnail} layout="intrinsic" width={300} height={300} />
        </div>
      </div>
      <div className="w-full bg-white sm:col-span-1 md:col-span-4 grid sm:grid-cols-1 md:grid-cols-3 sm:ml-0 ml-2 px-2 py-3 border-l border-b border-orangeVif shadow-spread rounded">        
        <DataCell label="album title" data={albumName} />
        <DataCell label="artist" data={artist} />
        <DataCell label="release date" data={releaseDate} />
      </div>
    </div>
  )
}