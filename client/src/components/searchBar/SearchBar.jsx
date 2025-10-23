import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const typesOfSpecies = ["dog", "cat", "other"];
const typesOfActions = ["adopt", "lost", "found", "sale", "help", "news"];

function SearchBar() {
  const [query, setQuery] = useState({
    age: "",
    species: "",
    action: "",
    location: "",
    title: "",
    gender: "",
    size: "",
    color: "",
  });

  const switchSpeciesType = (val) => {
    setQuery((prev) => ({ ...prev, species: val }));
  };
  const switchActionType = (val) => {
    setQuery((prev) => ({ ...prev, action: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("query: ", query);
  };

  return (
    <div className="searchBar">
      <div className="top">
        <div className="species">
          {typesOfSpecies.map((species) => (
            <button
              key={species}
              onClick={() => switchSpeciesType(species)}
              className={query.species === species ? "active" : ""}
            >
              {species === "dog"
                ? "Pas"
                : species === "cat"
                ? "Mačka"
                : "Ostalo"}
            </button>
          ))}
        </div>
        <div className="action">
          {typesOfActions.map((action) => (
            <button
              key={action}
              onClick={() => switchActionType(action)}
              className={query.action === action ? "active" : ""}
            >
              {action === "adopt"
                ? "Usvajanje"
                : action === "lost"
                ? "Izgubljen"
                : action === "found"
                ? "Nadjen"
                : action === "news"
                ? "Novosti"
                : action === "help"
                ? "Pomoc"
                : "Prodaja"}
            </button>
          ))}
        </div>
      </div>
      <form>
        <input
          type="text"
          name="location"
          placeholder="Lokacija"
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Naslov"
          onChange={handleChange}
        />
        <select
          name="gender"
          id="gender"
          onChange={handleChange}
          defaultValue={query.gender}
        >
          <option value="">Pol</option>
          <option value="male">Mužjak</option>
          <option value="female">Ženka</option>
          <option value="unknown">Nepoznato</option>
        </select>
        <select
          name="age"
          id="age"
          onChange={handleChange}
          defaultValue={query.age}
        >
          <option value="">Uzrast</option>
          <option value="puppy">Štene::Mače</option>
          <option value="young">Mlad</option>
          <option value="adult">Odrastao</option>
          <option value="old">Mator</option>
        </select>
        <select
          name="size"
          id="size"
          onChange={handleChange}
          defaultValue={query.size}
        >
          <option value="">Veličina</option>
          <option value="small">Mali</option>
          <option value="medium">Srednji</option>
          <option value="large">Veliki</option>
        </select>
        <select
          name="color"
          id="color"
          onChange={handleChange}
          defaultValue={query.color}
        >
          <option value="">Izgled</option>
          <option value="black">Crni</option>
          <option value="white">Beli</option>
          <option value="yellow">Žuti</option>
          <option value="brown">Braon</option>
          <option value="colorful">Šareni</option>
        </select>
        <div className="search">
          <Link
            to={`/list?species=${query.species}&location=${query.location}&title=${query.title}&action=${query.action}&gender=${query.gender}&age=${query.age}&size=${query.size}&color=${query.color}`}
          >
            <button>
              <img src="/search.png" alt="" />
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
