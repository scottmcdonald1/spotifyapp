import React from "react";
import Head from "next/head";

export default function Search(props) {

  const data = props.data;

    return (
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <Head>
          <title>Search - Spotify App</title>
        </Head>

        <div>
          <h1>{JSON.stringify(data)}</h1>
        </div>
            
      </div>
    )
}

export async function getServerSideProps({query}) {

    const url = `https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V`;
    const client_id = '6e1ace36d5234c8abc1998551ebb313f';
    const client_secret = '7cdb9e8cf609466fac348e74c2afd88c';

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + (client_id + ':' + client_secret),
      },
      json: true
    });
    const data = await res.json();

    return {
        props: {
            data: data
        }
    }
}