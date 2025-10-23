import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import CommentSection from "../../components/commentSection/CommentSection";
import GridLoader from "react-spinners/GridLoader";

function SinglePage() {
  const { currentUser } = useContext(AuthContext);
  const post = useLoaderData();
  // console.log("post: ", post);
  const [saved, setSaved] = useState(post.isSaved);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  const handleChat = async () => {
    if (!currentUser) {
      return navigate("/login");
    }
    try {
      const findUnique = await apiRequest.get(`/chats/find/${post.userId}`);
      // console.log("findUnique: ", findUnique);
      if (findUnique.data) {
        console.log(findUnique);
        return navigate("/profile");
      } else {
        await apiRequest.post("/chats", {
          receiverId: post.userId,
        });
        return navigate("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikeComment = async (commentId) => {
    console.log("currentUser", currentUser);
    try {
      if (!currentUser) {
        return navigate("/login");
      } else {
        const res = await apiRequest.put(`/comments/likeComment/${commentId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(
            comments.map((comment) => {
              comment.id === commentId
                ? {
                    ...comment,
                    likes: data.likes,
                    numberOfLikes: data.likes.length,
                  }
                : comment;
              comment.id === data.id ? data : comment;
            })
          );
        }
        console.log("liked comment", res);
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await apiRequest.get("/comments/" + post.id);
        setComments(res.data);
        // console.log("comments: ", comments);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <>
      {post ? (
        <div className="singlePage">
          <div className="details">
            <div className="wrapper">
              <Slider images={post.images} />
              <div className="info">
                <div className="top">
                  <div className="post">
                    <h1>{post.title}</h1>
                    <div className="address">
                      <img src="/pin.png" alt="" />
                      <span>{post.location}</span>
                    </div>
                  </div>
                  <div className="user">
                    <img src={post.user.avatar} alt="user image" />
                    <span>{post.user.username}</span>
                  </div>
                </div>
                <div
                  className="bottom"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.desc),
                  }}
                ></div>
                <div className="created">
                  {/* Created: <TimeAgo datetime={post.createdAt} locale="sr-RS" /> */}
                  Postavljeno:{" "}
                  {dateFormatter.format(Date.parse(post.createdAt))}
                </div>
              </div>
              {loading ? (
                <div
                  style={{
                    display: "grid",
                    placeContent: "center",
                    width: "100%",
                  }}
                >
                  <GridLoader
                    color="#fece51"
                    size={75}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                <CommentSection
                  likeComment={handleLikeComment}
                  comments={comments}
                  postId={post.id}
                />
              )}
            </div>
          </div>
          <div className="features">
            <div className="wrapper">
              <p className="title">Opšti podaci</p>
              <div className="listVertical">
                <div className="feature">
                  <span>
                    Vrsta:{" "}
                    {post.species
                      ? post.species === "dog"
                        ? "pas"
                        : post.species === "cat"
                        ? "mačka"
                        : "ostalo"
                      : "nema podataka"}
                  </span>
                </div>
                <div className="feature">
                  <span>
                    Sekcija:{" "}
                    {post.action
                      ? post.action === "news"
                        ? "info"
                        : post.action === "lost"
                        ? "izgubljen"
                        : post.action === "found"
                        ? "nadjen"
                        : post.action === "help"
                        ? "pomoć"
                        : post.action === "adopt"
                        ? "usvajanje"
                        : "prodaja"
                      : "nema podataka"}
                  </span>
                </div>
                <div className="feature">
                  <span>
                    Pol:{" "}
                    {post.gender
                      ? post.gender === "male"
                        ? "mužjak"
                        : "ženka"
                      : "nema podataka"}
                  </span>
                </div>
                <div className="feature">
                  <span>
                    Uzrast:{" "}
                    {post.age
                      ? post.age === "puppy"
                        ? "bebica"
                        : post.age === "young"
                        ? "mlad"
                        : post.age === "adult"
                        ? "odrastao"
                        : "star"
                      : "nema podataka"}
                  </span>
                </div>
              </div>
              <p className="title">Detalji</p>
              <div className="listVertical">
                <div className="feature">
                  <span>
                    Izgled:{" "}
                    {post.color
                      ? post.color === "black"
                        ? "crn"
                        : post.color === "white"
                        ? "beo"
                        : post.color === "yellow"
                        ? "žut"
                        : post.color === "brown"
                        ? "braon"
                        : "šaren"
                      : "nema podataka"}
                  </span>
                </div>
                <div className="feature">
                  <span>
                    Veličina:{" "}
                    {post.size
                      ? post.size === "large"
                        ? "veliki"
                        : post.size === "medium"
                        ? "srednji"
                        : "mali"
                      : "nema podataka"}
                  </span>
                </div>
              </div>
              {post.price ? (
                <>
                  <p className="title">Ostalo</p>
                  <div className="listVertical">
                    <div className="feature">
                      <span>Cena: {post.price}</span>
                    </div>
                  </div>
                </>
              ) : null}

              <div className="buttons">
                <button onClick={handleChat}>
                  <img src="/chat.png" alt="" />
                  Pošalji poruku
                </button>
                <button
                  onClick={handleSave}
                  style={{
                    backgroundColor: saved ? "#fece51" : "white",
                  }}
                >
                  <img src="/save.png" alt="save post" />
                  {saved ? "Sačuvano" : "Sačuvaj oglas"}
                </button>
              </div>

              <div className="listHorizontal">
                <div className="feature">
                  <img src="/bed.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span>Objava sa id {post.id} ne postoji</span>
      )}
    </>
  );
}

export default SinglePage;
