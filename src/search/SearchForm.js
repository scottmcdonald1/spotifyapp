import React from "react";
import { useRouter } from "next/router"

export default function SearchForm() {
  const router = useRouter();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (e.target.searchQuery.value === '' || e.target.searchQuery.value === undefined) {
      alert("please enter search query")
    } else {
      const query = e.target.searchQuery.value;
      const param = e.target.searchParameter.value;
      let path = `/search?q=${query}&type=${param}`
      router.push(path);
    }
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit} id="searchForm" className="grid grid-cols-3 items-center">
        <div className="col-span-1">
          <input 
            id="searchQuery"
            name="searchQuery"
            type="text" 
            placeholder="search"
            className="form-input rounded peer mt-1 w-full"
          />
        </div>

      <div className="col-span-1 grid grid-cols-2 grid-rows-2 m-4">

        <label>
          <input 
            id="track"
            name="searchParameter"
            value="all"
            type="radio" 
            className="form-radio rounded peer"
            defaultChecked
          />
          <span className="text-sm font-medium text-ombreNaturelle31/70 ml-1">All</span>
        </label>

        <label >
          <input 
            id="track"
            name="searchParameter"
            value="track"
            type="radio" 
            className="form-radio rounded peer"
          />
          <span className="text-sm font-medium text-ombreNaturelle31/70 ml-1">Track</span>
        </label>

        <label>
          <input 
            id="artist"
            name="searchParameter"
            value="artist"
            type="radio" 
            className="form-radio rounded peer"
          />
          <span className="text-sm font-medium text-ombreNaturelle31/70 ml-1">Artist</span>
        </label>

        <label>
          <input 
            id="artist"
            name="searchParameter"
            value="album"
            type="radio" 
            className="form-radio rounded peer"
          />
          <span className="text-sm font-medium text-ombreNaturelle31/70 ml-1">Album</span>
        </label>
      </div>

      <button 
        type="submit"
        form="searchForm"
        className="w-48 rounded-full border-2 px-6 py-2 leading-tight hover:border-2 hover:border-spotifyBlack/80 hover:shadow-smallSpread transition-all duration-300 ease-in-out"      >
        search
      </button>

      </form>
    </div>
  )
}