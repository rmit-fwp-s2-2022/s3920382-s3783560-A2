import React from "react";
import logo from "../logo.svg";
import "../index.css"

export default function Home(props) {
  return (
    <div className="text-center custom-subheading">
      <div>
        <h1 className="display-2" style={{display:'inline'}}>Loop &#x25AA; Agile &#x25AA;</h1>
        <p className="display-2 custom-subheading-bold"style={{display:'inline'}}> Now</p>
      </div>
      <br/>
      <p className="custom-content">Lorem ipsum ostrud magna ex exercitation tempor.</p>
      {props.user !== null && <h4><strong>Hello {props.user.first_name} {props.user.last_name}!</strong></h4>}
      <img src={logo} className="w-75" alt="logo" />
    </div>
  );
}