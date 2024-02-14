import React from "react";

function Comments({ currentUser, comments }) {
  const handleCommentList = () => {
    console.log(comments);
    if (comments.length === 0) {
      return <div>No Comments</div>;
    } else {
      return comments.map((comment) => {
        if (comment.user_id === currentUser.id) {
          return <div key={comment.id}>{comment.comment_text}</div>;
        }
        return null; // Returning null for comments not belonging to the current user
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
