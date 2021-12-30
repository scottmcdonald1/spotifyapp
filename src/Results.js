import React from "react";
import Image from "next/image";

export default function Results({data, searchType}) {

  let key = 0;

  const resultsList = searchType === "artist" ? (
    data.artists.items.map(item => {
      key++;
      return (
        <ArtistData data={item} listNumber={key} key={key} />
      )
    })
  ) : (
    data.tracks.items.map(item => {
      key++;
      return (
        <TrackData data={item} listNumber={key} key={key} />
      )
    })
  )

  return ( 
    <div className="w-full grid gap-8 break-words">
      {resultsList}
    </div>
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

function ArtistData({data, listNumber}) {
  const thumbnail = data.images[1].url

  return (
    <div className="w-full grid grid-cols-5 justify-center m-4 px-5 py-3 border border-ombreNaturelle31/60 shadow-sharp rounded">
      <div className="flex items-center">
        <Image src={thumbnail} width={300} height={300} />
      </div>

      <div className="col-span-4 grid sm:grid-cols-1 md:grid-cols-3 m-4 px-5 py-3 border border-ombreNaturelle31/60 shadow-sharp rounded">
        <div className="px-2">
          <DataCell label="name" data={data.name} />
        </div>
        <div className="px-2">
          <DataCell label="genres" data={data.genres.join(', ')} />
        </div>
      </div>
      {/* <h1 className="m-1 font-monda"><span className="text-vert59">{data.name}</span></h1> */}
    </div>
  )
}

function millisToMinutesAndSeconds(millis) {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function TrackData({data, listNumber}) {
  const trackName = data.name;
  const artistName = data.artists[0].name;
  const thumbnail = data.album.images[1].url;
  const albumName = data.album.name;

  const trackNumber = `${data.track_number} out of ${data.album.total_tracks}`;
  const duration = millisToMinutesAndSeconds(data.duration_ms)
  const releaseDate = data.album.release_date;

  const isrc = data.external_ids.isrc;
  const albumId= data.album.id;

  return (
    <div className="w-full grid gap-2 sm:grid-cols-1 md:grid-cols-6 justify-center px-6 py-8 border border-ombreNaturelle31/60 shadow-sharp rounded">
      
      <div className="col-span-2 flex sm:flex-row md:flex-col justify-center items-center">
        <div className="p-2 bg-white pb-0 shadow-spread rounded">
          <Image src={thumbnail} layout="intrinsic" width={300} height={300} />
        </div>
      </div>

      <div className="w-full bg-white sm:col-span-1 md:col-span-4 grid sm:grid-cols-1 md:grid-cols-3 sm:ml-0 ml-2 px-2 py-3 shadow-spread rounded">        
          <DataCell label="title" data={trackName} />
          <DataCell label="artist" data={artistName} />
          <DataCell label="album" data={albumName} />
          <DataCell label="track number" data={trackNumber} />
          <DataCell label="duration" data={duration} />
          <DataCell label="release date" data={releaseDate} />
          <DataCell label="ISRC" data={isrc} />
          <DataCell label="album id" data={albumId} />
      </div>
    </div>
  )
}