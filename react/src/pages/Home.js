import React from "react";
import image from "../stock-laptop-forum.png";
import "../index.css"

export default function Home(props) {
  return (
    <div className="d-flex justify-content-between home-main">  {/* Flex to float image to the right, text to the left */}
      <div className="d-flex align-items-center home-left" >    {/* Flex to float text vertically */}    
        <div className="hero-title-box d-flex flex-column align-items-center">    {/* Vertically floated text div */}
          <h1 className="hero-title-text">Loop Agile</h1>
          <p className="hero-title-bold hero-title-text"><em>Now</em></p>
        </div>
      </div>
      <div>
        <img src={image} className="w-75 hero-image" alt="logo" />
      </div>
    </div>
  ) 
}