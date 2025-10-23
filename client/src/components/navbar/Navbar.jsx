import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import { BiMenu } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) {
    // console.log(currentUser.id);
    fetch();
  }
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo-light.svg" alt="logo" />
          <span>DogFinder</span>
        </a>
        <a href="/">Početna</a>
        <a href="/about">O nama</a>
        <a href="/contact">Kontakt</a>
        <a href="/donation">Donacija</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="avatar" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profil</span>
            </Link>
            {currentUser.id === "66450faf485ae26af92ab044" && (
              <Link to="/dashboard" className="profile">
                <span>Kontrole</span>
              </Link>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="login">
              <FiLogIn title="prijava" size={32} />
            </Link>
            {/* <Link to="/register" className="register">
              Registracija
            </Link> */}
          </>
        )}
        <div className="menuIcon">
          <BiMenu onClick={() => setOpen((prev) => !prev)} size={36} />
          {/* <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          /> */}
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Početna</a>
          <a href="/about">O nama</a>
          <a href="/contact">Kontakt</a>
          <a href="/donation">Donacija</a>
          {currentUser ? (
            <div className="user">
              {/* <span>{currentUser.username}</span> */}
              <a href="/profile" className="profile">
                {number > 0 && <div className="notification">{number}</div>}
                <img src={currentUser.avatar || "/noavatar.jpg"} alt="avatar" />
              </a>
            </div>
          ) : (
            <>
              <a href="/login">Prijava</a>
              <a href="/register" className="register">
                Registracija
              </a>
            </>
          )}
          {/* <a href="/profile">Profil</a> */}
          {/* <a href="/login">Uloguj se</a>
            <a href="/register">Registruj se</a> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
