import "./comment.scss";
import TimeAgo from "timeago-react";
import { BiLike } from "react-icons/bi";
import { RiReplyLine } from "react-icons/ri";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
// import _ from "lodash";
import CommentForm from "../commentForm/CommentForm";
// import CommentSection from "../commentSection/CommentSection";
import Reply from "../reply/Reply";

function Comment({ item, onLike, replies, getReplies }) {
  const { currentUser } = useContext(AuthContext);
  const [isReplying, setIsReplying] = useState(false);

  const btnStyleLiked = {
    color: "#0000ff",
    border: "none",
    outline: "none",
    fontSize: "1.5em",
  };
  const btnStyleDefault = {
    color: "#aaa",
    border: "none",
    outline: "none",
    fontSize: "1.5em",
  };

  return (
    <div className="single_comment">
      <div className="left_section">
        <div className="user">{item.user.username || "Nepoznat"}</div>
        <div>
          <img
            className="avatar"
            src={item.user.avatar || "/noavatar.jpg"}
            alt="avatar"
          />
        </div>
        <div className="timeago">
          <TimeAgo datetime={item.createdAt} locale="sr_RS" />
        </div>
      </div>
      <div className="right_section">
        <div className="content">{item.content}</div>
        <div className="replies">
          {replies &&
            replies.length > 0 &&
            replies.map((reply) => (
              <Comment
                item={reply}
                key={reply.id}
                onLike={onLike}
                parentId={item.id}
                replies={getReplies(reply.id)}
                getReplies={getReplies}
              />
            ))}
        </div>
        <div className="right_bottom">
          <div className="likes">
            <BiLike
              className="like"
              onClick={() => {
                onLike(item.id);
              }}
              style={
                item.likes.includes(currentUser?.id)
                  ? btnStyleLiked
                  : btnStyleDefault
              }
              title="like"
            />
            <p className="numberOfLikes">{item?.likes.length}</p>
          </div>
          <RiReplyLine
            title="reply"
            className="reply"
            onClick={() => setIsReplying((prev) => !prev)}
          />
          {isReplying && (
            <div className="replying">
              <CommentForm
                userId={currentUser?.id}
                postId={item.postId}
                parentId={item.id}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
