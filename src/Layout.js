import React from "react";
import Footer from "./Footer";
import App from "./App";

export default function Layout({children}) {

  return (
    <div className="bg-outremerGris">
      <App user={children.props.user} />
  
      <main className="px-8 min-h-screen">
        {children}
      </main>
      
      <Footer />
    </div>
  )
}