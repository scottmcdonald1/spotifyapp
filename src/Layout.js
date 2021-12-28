import React from "react";
import Footer from "./Footer";

export default function Layout({children}) {
    return (
      <>
        <main className="px-8 min-h-screen">
          {children}
        </main>
        
        <Footer />
      </>
    )
}