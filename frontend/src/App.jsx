import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Common/Header.jsx";
import Footer from "./Components/Common/Footer.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 container mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;