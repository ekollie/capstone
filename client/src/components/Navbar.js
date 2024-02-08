import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ currentUser }) => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="user">
        <span>{currentUser.username}</span>
        <button onClick={() => navigate("/profile", {
          state: { currentUser }
        })}>Profile</button>
      </div>
    </div>
  );
};

export default Navbar;
