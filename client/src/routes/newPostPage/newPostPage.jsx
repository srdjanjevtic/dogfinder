import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          location: inputs.location,
          species: inputs.species,
          action: inputs.action,
          gender: inputs.gender,
          age: inputs.age,
          images: images,
          desc: value,
          size: inputs.size,
          color: inputs.color,
          price: parseInt(inputs.price),
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Dodaj oglas</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Naslov</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Postavi naslov radi lakše kasnije pretrage"
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Opis</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="location">Lokacija</label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Grad, naselje, ulica, selo,..."
              />
            </div>
            <div className="item">
              <label htmlFor="species">Vrsta</label>
              <select name="species">
                <option value="dog" defaultChecked>
                  Pas
                </option>
                <option value="cat">Mačka</option>
                <option value="other">Ostalo</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="action">Akcija</label>
              <select required name="action">
                <option value=""></option>
                <option value="adopt">Usvajanje</option>
                <option value="lost">Izgubljeni</option>
                <option value="found">Nađeni</option>
                <option value="help">Pomoć</option>
                <option value="news">Vesti</option>
                <option value="sell">Prodaja</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="gender">Pol</label>
              <select required name="gender">
                <option value=""></option>
                <option value="male">Mužjak</option>
                <option value="female">Ženka</option>
                <option value="unknown">Nepoznato</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="age">Uzrast</label>
              <select required name="age">
                <option value=""></option>
                <option value="puppy">Štene/Mače</option>
                <option value="young">Mlad</option>
                <option value="adult">Odrastao</option>
                <option value="old">Star</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="size">Veličina</label>
              <select name="size">
                <option value=""></option>
                <option value="large">Veliki</option>
                <option value="medium">Srednji</option>
                <option value="small">Mali</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="color">Boja/Izgled</label>
              <select name="color">
                <option value=""></option>
                <option value="black">Crni</option>
                <option value="white">Beli</option>
                <option value="yellow">Žuti</option>
                <option value="brown">Braon</option>
                <option value="colorful">Šareni</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="price">Cena</label>
              <input id="price" name="price" type="number" />
            </div>
            <button className="sendButton">Postavi</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dzrqx9vqf",
            uploadPreset: "estate",
            folder: "posts",
            maxImageFileSize: 5000000,
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
