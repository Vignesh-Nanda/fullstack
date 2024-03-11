import React from "react";
import Navbar from "./Navbar";
import Carousel from "./Caurosel";
import Card from "./Card";
import Footer from "./Footer"; 
import Page2 from "./Page2";

function Front() {
  return <div>
    <Navbar/>
    <Carousel />
      <Card />
      <Page2/>
      <Footer />
  </div>;
}

export default Front;
