import { useState } from "react";
import "./updateUser.scss";
import { useNavigate, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import apiRequest from "../../lib/apiRequest";

const UpdateUser = () => {
  const { user } = useLoaderData();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email } = Object.fromEntries(formData);
    try {
      await apiRequest.put(`/users/${user.id}`, {
        username,
        email,
      });
      toast.success("Podaci korisnika uspešno izmenjeni", { autoClose: 2500 });
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error("Došlo je do greške", { autoClose: 2500 });
      setError(err.response.data.message);
    }
  };

  return (
    <div className="updateUser">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Promeni podatke</h1>
          <div className="item">
            <label htmlFor="username">Korisničko ime</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={user.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
            />
          </div>
          <button>Promeni</button>
          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
