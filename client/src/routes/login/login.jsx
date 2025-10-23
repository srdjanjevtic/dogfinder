import { useContext, useEffect, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";

function Login() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const { updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(user?.primaryEmailAddress?.emailAddress || "");
  // const { user } = useUser();
  // console.log(user.emailAddresses[0].emailAddress);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      updateUser(res.data);
      toast.success("Uspešno ste se ulogovali");
      navigate("/");
    } catch (err) {
      toast.error("Došlo je do greške");
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
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Dobrodošli</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Uloguj se</button>
          {error && <span className="error-message">{error}</span>}
          <Link className="redirect" to="/register">
            Nemate nalog?
          </Link>
        </form>
      </div>
      <div className="imgContainer">
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <img src="/slavkomica.png" alt="slavko i mica" />
      </div>
    </div>
  );

  // return (
  //   <div className="login-container">
  //     <SignedOut>
  //       <SignInButton mode="modal" />
  //       <SignUpButton mode="modal" />
  //     </SignedOut>

  //     <SignedIn>
  //       <UserButton />
  //       {/* afterSignOutUrl="/" */}
  //       <p>{user?.primaryEmailAddress?.emailAddress || ""}</p>
  //     </SignedIn>
  //   </div>
  // );
}

export default Login;
