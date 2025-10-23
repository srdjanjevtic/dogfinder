import "./commentForm.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

const CommentForm = ({ postId, item, parentId }) => {
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [maxLength, setMaxLength] = useState(250);
  const commentFormRef = useRef(null);
  const textAreaRef = useRef(null);

  const handleSubmit = async (e) => {
    console.log("comment from inside", comment);
    try {
      e.preventDefault();
      const res = await apiRequest.post("/comments", {
        content: comment,
        postId,
        userId: currentUser?.id,
        parentId: parentId,
      });
      if (res.status === 201) {
        setComment("");
        window.location.reload(true);
      }
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
      console.log(error.message);
    }
  };

  const hideCommentForm = () => {
    commentFormRef.current.style.display = "none";
  };

  const resetCommentForm = () => {
    setComment("");
    <button onClick={hideCommentForm}>Cancel</button>;
    textAreaRef.current.focus();
  };

  return (
    <div className="comments" ref={commentFormRef}>
      {currentUser ? (
        <div className="comment">
          <div className="left_section">
            <div className="username">{currentUser?.username}</div>
            <div className="avatar_container">
              <img
                className="avatar"
                src={currentUser?.avatar || "noavatar.jpg"}
                alt=""
              />
            </div>
          </div>
          <div className="comment_form">
            <textarea
              ref={textAreaRef}
              // autoFocus
              placeholder="Postavi komentar..."
              rows="10"
              maxLength={maxLength}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              className="comment_input"
            />
            {error && <div className="error">{error}</div>}
            <div className="bottom">
              <p>{maxLength - comment.length} karaktera preostalo</p>
              <button onClick={hideCommentForm}>Otkaži</button>
              <button onClick={resetCommentForm}>Izbriši</button>
              <button onClick={handleSubmit}>Pošalji</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/login">Uloguj se da bi mogao da komentarišeš</Link>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
