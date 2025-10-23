import "./profilePage.scss";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import GridLoader from "react-spinners/GridLoader";

function ProfilePage() {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>Informacije o korisniku</h1>
            <Link to="/profile/update">
              <button>Izmeni profil</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "noavatar.jpg"} alt="" />
            </span>
            <span>
              Korisničko ime: <b>{currentUser.username}</b>
            </span>
            <span>
              Email: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Odjavi se</button>
          </div>
          <div className="title">
            <h1>Moje objave</h1>
            <Link to="/profile/addPost">
              <button>Postavi novu objavu</button>
            </Link>
          </div>
          <Suspense fallback={<GridLoader />}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Objave koje pratim</h1>
          </div>
          <Suspense fallback={<GridLoader />}>
            <Await
              resolve={data.postResponse}
              errorElement={
                <p className="error">Greška pri učitavanju postova!</p>
              }
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<GridLoader />}>
            <Await
              resolve={data.chatResponse}
              errorElement={
                <p className="error">Greška pri učitavanju podataka!</p>
              }
            >
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
