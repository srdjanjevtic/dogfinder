import "./reply.css";
import Comment from "../comment/Comment";

const Reply = ({ rootId, onLike, childComments }) => {
  console.log(childComments);
  return (
    <>
      {childComments.map((item) => (
        <>
          <div>{item.user.username}</div>
          <div>{item.content}</div>
        </>
      ))}
      {/* <Reply childComments={childComments} /> */}
    </>
  );
};

export default Reply;
