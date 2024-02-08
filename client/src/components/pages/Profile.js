import React, { useState, useEffect } from "react";
import Clovers from "../Clovers";
import Comments from "../Comments";
import { useLocation } from "react-router-dom";

function Profile() {
  const { state } = useLocation();
  const { currentUser } = state;
  const [clovers, setClovers] = useState([]);
  const [comments, setComments] = useState([]);
  const [refreshPage, setRefreshPage] = useState([]);

  useEffect(() => {
    console.log("Fetching clovers...");
    fetch("/clovers")
      .then((res) => res.json())
      .then((data) => {
        setClovers(() => {
          return data.filter((clover) => {
            return (
              // clover.sender.user_id === currentUser.user_id ||
              clover.founder_id === currentUser.id
            );
          });
        });
      });

    console.log("Fetching comments...");
    fetch("/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(() => {
          return data.filter((comment) => {
            return (
              // comment.sender.user_id === currentUser.user_id ||
              comment.user_id === currentUser.id
            );
          });
        });
      });
  }, [refreshPage]);

  return (
    <div>
      <h1>Profile</h1>
      <Comments currentUser={currentUser} comments={comments} />
      <Clovers currentUser={currentUser} clovers={clovers} />
    </div>
  );
}

export default Profile;
