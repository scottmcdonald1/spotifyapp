import React from "react";
import { useRouter } from "next/router"

export default function SearchForm() {
  const router = useRouter();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const query = e.target.searchQuery.value;
    const param = e.target.searchParameter.value;
    let path = `/search?q=${query}&type=${param}`
    router.push(path);
  }

  return (
    <div className="border border-ombreNaturelle31/60 shadow-sharp rounded m-4 px-5 py-3">
      <form onSubmit={handleFormSubmit} id="searchForm" className="flex flex-col">

      <label className="block">
        <span className="block text-sm font-medium text-ombreNaturelle31/70">Search</span>

        <input 
          id="searchQuery"
          name="searchQuery"
          type="text" 
          className="form-input rounded peer mt-1 w-full"
        />

        <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm"></p>
      </label>

      <div className="grid grid-cols-2 m-4">

        <label className="flex justify-center items-center">
          <input 
            id="track"
            name="searchParameter"
            value="track"
            type="radio" 
            className="form-radio rounded peer"
            defaultChecked
          />
          <span className="text-sm font-medium text-ombreNaturelle31/70 ml-1">Track</span>
        </label>

        <label className="flex justify-center items-center">
          <input 
            id="artist"
            name="searchParameter"
            value="artist"
            type="radio" 
            className="form-radio rounded peer"
          />
          <span className="text-sm font-medium text-ombreNaturelle31/70 ml-1">Artist</span>
        </label>
      </div>

      <button 
        type="submit"
        form="searchForm"
        className="w-full rounded-full shadow-sharp hover:shadow-sharpHover px-6 py-2.5 text-ombreNaturelle31/90 font-oxygenMono leading-tight hover:border-2 hover:border-vert59 hover:text-ombreNaturelle31 border-2 border-ombreNaturelle31/70 active:bg-vert59 active:text-white active:border-2 active:border-ombreNaturelle31/50 transition duration-150 ease-in-out"
      >
        search
      </button>

      </form>
    </div>
  )
}