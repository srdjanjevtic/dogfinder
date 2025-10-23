import "./updatePost.scss";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import CommentSection from "../../components/commentSection/CommentSection";
import GridLoader from "react-spinners/GridLoader";
import { toast } from "react-toastify";

const UpdatePost = () => {
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const post = useLoaderData();
  // console.log("post: ", post);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const {
      title,
      location,
      species,
      action,
      desc,
      price,
      size,
      color,
      gender,
      age,
    } = Object.fromEntries(formData);
    try {
      await apiRequest.put(`/posts/${post.id}`, {
        title,
        location,
        species,
        action,
        desc,
        price: parseInt(price),
        size,
        color,
        gender,
        age,
      });
      toast.success("Objava uspešno izmenjena", {
        autoClose: 2500,
      });
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error("Došlo je do greške", { autoClose: 2500 });
      setError(err.response.data.message);
    }
  };

  return (
    <div className="update-post-wrapper">
      <div className="formContainer">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Promeni objavu</h1>
          <div className="items">
            <div className="item">
              <label htmlFor="title">Naslov</label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={post.title}
              />
            </div>
            <div className="item">
              <label htmlFor="location">Lokacija</label>
              <input
                id="location"
                name="location"
                type="text"
                defaultValue={post.location}
              />
            </div>
            <div className="item">
              <label htmlFor="species">Vrsta</label>
              <input
                id="species"
                name="species"
                type="text"
                defaultValue={post.species}
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Opis</label>
              <textarea
                rows="8"
                cols="50"
                id="desc"
                name="desc"
                type="text"
                defaultValue={post.desc}
              />
            </div>
            <div className="item">
              <label htmlFor="action">Sekcija</label>
              <input
                id="action"
                name="action"
                type="text"
                defaultValue={post.action}
              />
            </div>
            <div className="item">
              <label htmlFor="size">Veličina</label>
              <input
                id="size"
                name="size"
                type="text"
                defaultValue={post.size}
              />
            </div>
            <div className="item">
              <label htmlFor="age">Uzrast</label>
              <input id="age" name="age" type="text" defaultValue={post.age} />
            </div>
            <div className="item">
              <label htmlFor="gender">Pol</label>
              <input
                id="gender"
                name="gender"
                type="text"
                defaultValue={post.gender}
              />
            </div>

            <div className="item">
              <label htmlFor="color">Izgled</label>
              <input
                id="color"
                name="color"
                type="text"
                defaultValue={post.color}
              />
            </div>
            <div className="item">
              <label htmlFor="price">Cena</label>
              <input
                id="price"
                name="price"
                type="number"
                defaultValue={post.price}
              />
            </div>
            <div className="item">
              <button>Promeni</button>
              {error && <span className="error">{error}</span>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
