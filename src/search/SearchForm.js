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
    <div className="px-4">
      <form onSubmit={handleFormSubmit} id="searchForm" className="grid grid-cols-4 gap-2 items-center">

        <div className="col-span-2"> 

          <input 
            id="searchQuery"
            name="searchQuery"
            type="text" 
            placeholder="search"
            className="form-input rounded peer w-full"
          />

        </div>

        <div className="col-span-1">

          <select 
            id="searchParameter" 
            name="searchParameter"
            className="form-select rounded w-full"
          >
            <option value="all">all</option>
            <option value="track">track</option>
            <option value="artist">artist</option>
            <option value="album">album</option>
          </select>

        </div>

        <div className="col-span-1">
          <button 
            type="submit"
            form="searchForm"
            className="w-full h-full rounded-full border-2 px-6 py-2 hover:border-2 hover:border-spotifyBlack/80 hover:shadow-smallSpread transition-all duration-300 ease-in-out" 
          >
            search
          </button>
        </div>

      </form>
    </div>
  )
}