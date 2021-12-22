import React from "react";

export default function SearchForm() {

    const handleFormSubmit = (e) => {
      e.preventDefault();
      alert("works!")
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