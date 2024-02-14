import React from "react";

function Clovers({ currentUser, clovers }) {
  const handleCloverList = () => {
    console.log(clovers);
    if (clovers.length === 0) {
      return <div>No Clovers</div>;
    } else {
      return clovers.map((clover) => {
        if (clover.founder_id === currentUser.id) {
          return <div key={clover.id}>{clover.location}</div>;
        }
        return null; // Returning null for clovers not belonging to the current user
      });
    }
  };

  return (
    <div>
      <h1>Clovers</h1>
      {handleCloverList()}
    </div>
  );
}

export default Clovers;
