import { useEffect, useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";
import { BiReset, BiSearch } from "react-icons/bi";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState({
    species: searchParams.get("species") || "",
    action: searchParams.get("action") || "",
    location: searchParams.get("location") || "",
    title: searchParams.get("title") || "",
    gender: searchParams.get("gender") || "",
    age: searchParams.get("age") || "",
    size: searchParams.get("size") || "",
    color: searchParams.get("color") || "",
  });
  // const [species, setSpecies] = useState(searchParams.get("species"));
  // const [action, setAction] = useState(searchParams.get("action"));
  // const [location, setLocation] = useState(searchParams.get("location"));
  // const [title, setTitle] = useState(searchParams.get("title"));
  // const [gender, setGender] = useState(searchParams.get("gender"));
  // const [age, setAge] = useState(searchParams.get("age"));
  // const [size, setSize] = useState(searchParams.get("size"));
  // const [color, setColor] = useState(searchParams.get("color"));

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setSearchParams(query);
  };

  // const handleReset = (e) => {
  //   e.preventDefault();
  //   setSearchParams({});
  //   setSize("");
  //   setAge("");
  //   setColor("");
  //   setSpecies("");
  //   setTitle("");
  //   setLocation("");
  //   setGender("");
  //   setAction("");
  // };

  return (
    <form className="filter">
      <div className="search-results">
        Rezultati pretrage za:{" "}
        <div>
          <span>{searchParams.get("location")}</span>
        </div>
        <div>
          <span>{searchParams.get("title")}</span>
        </div>
        <div>
          <span>{searchParams.get("species")}</span>
        </div>
        <div>
          <span>{searchParams.get("action")}</span>
        </div>
        <div>
          <span>{searchParams.get("age")}</span>
        </div>
        <div>
          <span>{searchParams.get("gender")}</span>
        </div>
        <div>
          <span>{searchParams.get("size")}</span>
        </div>
        <div>
          <span>{searchParams.get("color")}</span>
        </div>
      </div>
      <div className="top">
        <div className="item">
          <label htmlFor="location">Lokacija</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Lokacija: grad, ulica, naselje, mesto,..."
            onChange={handleChange}
            defaultValue={query.location}
            onKeyUp={(e) => e.key === "Enter" && handleFilter()}
            // required
          />
        </div>
        <div className="item">
          <label htmlFor="title">Naslov</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Ime, naslov posta,..."
            onChange={handleChange}
            defaultValue={query.title}
            onKeyUp={(e) => e.key === "Enter" && handleFilter()}
            // required
          />
        </div>
      </div>
      <div className="bottom">
        {/* <button onClick={() => handleReset}>
          <BiReset size={32} color="#fff" />
        </button> */}
        <div className="item">
          <label htmlFor="species">Vrsta</label>
          <select
            name="species"
            id="species"
            onChange={handleChange}
            defaultValue={query.species}
          >
            <option value="">Sve</option>
            <option value="dog">Pas</option>
            <option value="cat">Mačka</option>
            <option value="other">Ostalo</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="action">Akcija</label>
          <select
            name="action"
            id="action"
            onChange={handleChange}
            defaultValue={query.action}
          >
            <option value="">Sve</option>
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
          <select
            name="gender"
            id="gender"
            onChange={handleChange}
            defaultValue={query.gender}
          >
            <option value="">Sve</option>
            <option value="male">Mužjak</option>
            <option value="female">Ženka</option>
            <option value="unknown">Nepoznato</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="age">Uzrast</label>
          <select
            name="age"
            id="age"
            onChange={handleChange}
            defaultValue={query.age}
          >
            <option value="">Sve</option>
            <option value="puppy">Štene/Mače</option>
            <option value="young">Mlad</option>
            <option value="adult">Odrastao</option>
            <option value="old">Mator</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="size">Veličina</label>
          <select
            name="size"
            id="size"
            onChange={handleChange}
            defaultValue={query.size}
          >
            <option value="">Sve</option>
            <option value="small">Mali</option>
            <option value="medium">Srednji</option>
            <option value="large">Veliki</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="color">Izgled</label>
          <select
            name="color"
            id="color"
            onChange={handleChange}
            defaultValue={query.color}
          >
            <option value="">Sve</option>
            <option value="black">Crn</option>
            <option value="white">Beo</option>
            <option value="yellow">Žut</option>
            <option value="brown">Braon</option>
            <option value="colorful">Šaren</option>
          </select>
        </div>
        {/* <button onClick={() => handleReset}>
          <BiReset size={24} color="#ccc" />
        </button> */}
        <button onSubmit={handleFilter}>
          <BiSearch size={24} color="#fff" />
        </button>
      </div>
    </form>
  );
}

export default Filter;
