import { Link } from "react-router-dom";
import "./card.scss";
import TimeAgo from "timeago-react";
import DOMPurify from "dompurify";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { FaList, FaDog, FaCat, FaKiwiBird, FaRegClock } from "react-icons/fa";
import { LiaRainbowSolid } from "react-icons/lia";
import { RxSize } from "react-icons/rx";

function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.location}</span>
        </p>
        <h1 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h1>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(item?.desc, {
              ALLOWED_ATTR: ["style", "class", "ClassName"],
            }),
          }}
        ></div>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              {item.species === "dog" ? (
                <FaDog />
              ) : item.species === "cat" ? (
                <FaCat />
              ) : (
                <FaKiwiBird />
              )}
              <span>
                {item.species && item.species === "dog"
                  ? "pas"
                  : item.species === "cat"
                  ? "mačka"
                  : "ostalo"}{" "}
              </span>
            </div>
            <div className="feature">
              <FaList />
              <span>
                {item.action === "news"
                  ? "info"
                  : item.action === "lost"
                  ? "izgubljen"
                  : item.action === "found"
                  ? "nadjen"
                  : item.action === "help"
                  ? "pomoć"
                  : item.action === "adopt"
                  ? "usvajanje"
                  : "prodaja"}{" "}
              </span>
            </div>
            <div className="feature">
              <FaRegClock />
              <span>
                {item.age === "puppy"
                  ? "bebica"
                  : item.age === "young"
                  ? "mlad"
                  : item.age === "adult"
                  ? "odrastao"
                  : "star"}
              </span>
            </div>
            <div className="feature">
              {item.gender === "male" ? <BsGenderMale /> : <BsGenderFemale />}
              <span>{item.gender === "male" ? "mužjak" : "ženka"} </span>
            </div>
            <div className="feature">
              <RxSize />
              <span>
                {item.size === "large"
                  ? "veliki"
                  : item.size === "medium"
                  ? "srednji"
                  : "mali"}{" "}
              </span>
            </div>
            <div className="feature">
              <LiaRainbowSolid />
              <span>
                {item.color === "black"
                  ? "crn"
                  : item.color === "white"
                  ? "beo"
                  : item.color === "yellow"
                  ? "žut"
                  : item.color === "brown"
                  ? "braon"
                  : "šaren"}
              </span>
            </div>
            {item.price ? <p className="price">$ {item.price}</p> : null}
          </div>
          <div className="icons">
            {/* <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div> */}
            <TimeAgo datetime={item.createdAt} locale="sr-RS" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
