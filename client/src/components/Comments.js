import React from "react";

function Comments({ currentUser, comments }) {
  const handleCommentList = () => {
    if (!comments) {
      return <div>No Comments</div>;
    }
    {
      comments.map((comment) => {
        if (comment.user_id == currentUser.id) {
          return <span>{`${comment.comment_text}`}</span>;
        }
      });
    }
  };

  return (
    <div>
      <h1>Comments</h1>
      {handleCommentList()}
    </div>
  );
}

export default Comments;
