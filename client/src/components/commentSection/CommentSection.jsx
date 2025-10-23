import "./commentSection.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import Comment from "../../components/comment/Comment";
import CommentForm from "../../components/commentForm/CommentForm";

const CommentSection = ({ comments, postId, likeComment }) => {
  const [backendComments, setBackendComments] = useState(comments);
  const [comment, setComment] = useState("");
  const [rootComments, setRootComments] = useState([]);

  useEffect(() => {
    setRootComments(
      comments.filter((backendComment) => backendComment.parentId === null)
    );
  }, [comments]);
  console.log(rootComments);
  const getReplies = (commentId) => {
    const replies = backendComments.filter(
      (comment) => comment.parentId === commentId
    );
    return replies;
  };

  return (
    <div className="comments">
      <CommentForm postId={postId} item={comment} />
      <div className="comments_container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            item={rootComment}
            replies={getReplies(rootComment.id)}
            onLike={likeComment}
            getReplies={getReplies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
