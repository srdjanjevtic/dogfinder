import "./recentPost.scss";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

function RecentPost({ item }) {
  // console.log("item: ", item);
  return (
    <div className="post_card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <Link to={`/${item.id}`}>
          <h2 className="title">{item.title}</h2>
        </Link>
        <p className="location">
          <img src="/pin.png" alt="" />
          <span>{item.location}</span>
        </p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <span>
                {item.action &&
                  (item.action === "news"
                    ? "info"
                    : item.action === "lost"
                    ? "izgubljen"
                    : item.action === "found"
                    ? "nadjen"
                    : item.action === "help"
                    ? "pomoć"
                    : item.action === "adopt"
                    ? "usvajanje"
                    : "prodaja")}
              </span>
            </div>
            <div className="feature">
              <span>
                {item.species &&
                  (item.species === "dog"
                    ? "pas"
                    : item.species === "cat"
                    ? "mačka"
                    : "ostalo")}
              </span>
            </div>
            <div className="feature">
              <span>
                {item.gender && (item.gender === "male" ? "mužjak" : "ženka")}
              </span>
            </div>{" "}
            <div className="feature">
              <span>
                {item.age && item.age === "puppy"
                  ? "bebica"
                  : item.age === "young"
                  ? "mlad"
                  : item.age === "adult"
                  ? "odrastao"
                  : "star"}
              </span>
            </div>
          </div>
          <div className="icons">
            <TimeAgo datetime={item.createdAt} locale="sr-RS" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentPost;
