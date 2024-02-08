import React from "react";

function Clovers({ currentUser, clovers }) {
  const handleCloverList = () => {
    if (!clovers) {
      return <div>No Clovers</div>;
    }
    {
      clovers.map((clover) => {
        if (clover.user_id == currentUser.id) {
          return <span>{`${clover.location}`}</span>;
        }
      });
    }
  };

  return (
    <div>
      <h1>Clovers</h1>
      {handleCloverList}
    </div>
  );
}

export default Clovers;
