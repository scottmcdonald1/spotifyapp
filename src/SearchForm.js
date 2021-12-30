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
      <form onSubmit={handleFormSubmit} id="searchForm" className="grid grid-cols-3">

        <input 
          id="searchQuery"
          name="searchQuery"
          type="text" 
          placeholder="search"
          className="form-input rounded peer mt-1 w-full"
        />

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
        className="w-48 rounded-full border-2 px-6 py-2 leading-tight hover:border-2 hover:border-spotifyBlack/80 hover:shadow-smallSpread transition-all duration-300 ease-in-out"      >
        search
      </button>

      </form>
    </div>
  )
}