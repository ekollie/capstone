import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Map from "../Map.js";
import Navbar from "../Navbar.js";

function Main() {
  const { state } = useLocation();
  const { currentUser } = state;

  return (
    <div>
      <Navbar currentUser={currentUser} />
      <Map currentUser={currentUser} />
    </div>
  );
}

export default Main;
