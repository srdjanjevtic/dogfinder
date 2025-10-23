import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { toast } from "react-toastify";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      toast.success("Nalog uspešno kreiran");
      navigate("/login");
    } catch (err) {
      toast.error("Doslo je do greške");
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError("");
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Otvori nalog</h1>
          <input name="username" type="text" placeholder="Username" required />
          <input name="email" type="text" placeholder="Email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <button disabled={isLoading}>Registracija</button>
          {error && <span className="error-message">{error}</span>}
          <Link className="redirect" to="/login">
            Već imate nalog?
          </Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/slavkomica.png" alt="moji dzukci" />
      </div>
    </div>
  );
}

export default Register;
