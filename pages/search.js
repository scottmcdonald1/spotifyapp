import React from "react";
import Head from "next/head";
import SearchForm from "../src/SearchForm";

export default function Search(props) {

    return (
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <Head>
          <title>Search - Spotify App</title>
        </Head>

        <SearchForm />

        <div>
          <h1>Data will go here</h1>
        </div>
            
      </div>
    )
}

// export async function getServerSideProps({query}) {

// }