import "./dashboard.scss";
import { AuthContext } from "../../context/AuthContext";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
import { toast } from "react-toastify";
import apiRequest from "../../lib/apiRequest";
import Modal from "../../components/modal/Modal";
import Confirm from "../../components/confirm/Confirm";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [chats, setChats] = useState([]);
  const [removedMessage, setRemovedMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [chatToInspect, setChatToInspect] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const dashboardRef = useRef(null);
  const usersRef = useRef(null);
  const postsRef = useRef(null);
  const chatsRef = useRef(null);

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  // const data = useLoaderData();
  // console.log("isAdmin?", currentUser.isAdmin);
  // console.log("currentUser", currentUser);
  // console.log(data.postResponse);

  // UNAUTHORIZED
    if (!currentUser.isAdmin) {
      return <div className="unauthorized">
      <h1>Unauthorized</h1>
      <button className="back-button" onClick={() => navigate("/")}>Home</button>
      </div>
    }

  const showOnlyUsers = () => {
    dashboardRef.current.style.gridTemplateColumns = "1fr";
    usersRef.current.style.display = "block";
    chatsRef.current.style.display = "none";
    postsRef.current.style.display = "none";
  };
  const showOnlyPosts = () => {
    dashboardRef.current.style.gridTemplateColumns = "1fr";
    postsRef.current.style.display = "block";
    chatsRef.current.style.display = "none";
    usersRef.current.style.display = "none";
  };
  const showOnlyChats = () => {
    dashboardRef.current.style.gridTemplateColumns = "1fr";
    chatsRef.current.style.display = "block";
    postsRef.current.style.display = "none";
    usersRef.current.style.display = "none";
  };

  const showAll = () => {
    dashboardRef.current.style.gridTemplateColumns = "repeat(3, 1fr)";
    postsRef.current.style.display = "block";
    usersRef.current.style.display = "block";
    chatsRef.current.style.display = "block";
  };

  const editUser = () => {
    toast.info("Promena podataka u toku", {
      autoClose: 1000,
    });
  };
  const deleteUser = async (id) => {
    try {
      const res = await apiRequest.delete(`/users/delete/${id}`);
      setUsers(res.data.data);
      toast.success(`Korisnik sa id ${id} uspešno obrisan`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const editPost = () => {
    toast.info("Promena podataka u toku");
  };
  const deletePost = async (id) => {
    try {
      const res = await apiRequest.delete(`/posts/delete/${id}`);
      // console.log(res.data.data);
      setPosts(res.data.data);
      toast.success(`Objava sa id ${id} uspešno obrisana`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const editChat = async (id) => {
    toast.info("Promena podataka u toku");
    try {
      const chat = await apiRequest.get(`/chats/single/${id}`);
      // console.log(chat.data);
      setOpenModal(true);
      setChatToInspect(chat.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteChat = async (id) => {
    try {
      const res = await apiRequest.delete(`/chats/delete/${id}`);
      // console.log(res.data.data);
      setChats(res.data.data);
      toast.success(`Chat sa id ${id} uspešno obrisan`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await apiRequest.delete(`/messages/delete/${id}`);
      setRemovedMessage(id);
      toast.success(`Poruka sa id ${id} uspešno obrisana`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userResponse = await apiRequest.get("/users");
        const postResponse = await apiRequest.get("/posts");
        const chatResponse = await apiRequest.get("/chats/get/all");
        // console.log(chatResponse.data);
        return { userResponse, postResponse, chatResponse };
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
        setLoading(false);
      } finally {
        setError(null);
        setLoading(false);
      }
    };
    fetchData().then((data) => {
      // console.log(data.chatResponse.data);
      setUsers(data.userResponse.data);
      setPosts(data.postResponse.data);
      setChats(data.chatResponse.data);
      // console.log(users.length);
      // toast.success("Uspešno učitani podaci");
    });
  }, [users.length, posts.length, chats.length]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiRequest.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [users.length]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiRequest.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [posts.length]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await apiRequest.get("/chats/get/all");
        setChats(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();
  }, [chats.length, removedMessage]);

  return (
    <div className="dashboard-wrapper">
      <Modal
        deleteMessage={deleteMessage}
        removedMessage={removedMessage}
        chat={chatToInspect}
        openModal={openModal}
        onClose={() => setOpenModal(false)}
      />
      <Confirm
        openConfirm={openConfirm}
        onCloseConfirm={() => setOpenConfirm(false)}
        deleteUser={deleteUser}
        userId={userIdToDelete}
      />

      <header>
        <h3>Kontrolna Tabla</h3>
        <div className="buttons">
          <button onClick={showOnlyUsers}>Korisnici</button>
          <button onClick={showOnlyPosts}>Objave</button>
          <button onClick={showOnlyChats}>Prepiske</button>
          <button onClick={showAll}>Sve</button>
        </div>
      </header>
      <div className="dashboard-container" ref={dashboardRef}>
        <section className="users" ref={usersRef}>
          {users.map((user) => (
            <div key={user.id} className="user">
              <div className="user-info">
                <div className="info">
                  <p>Korisnik: {user.username}</p>
                  <p>Id: {user.id}</p>
                  <p>Email: {user.email}</p>
                  <p>Admin: {user.isAdmin.toString()}</p>
                </div>
                <img style={{ width: "50px" }} src={user.avatar} alt="avatar" />
              </div>
              <div className="actions">
                <Link to={`/dashboard/users/${user.id}`}>
                  <button className="edit" onClick={editUser}>
                    Izmeni
                  </button> 
                </Link>
                <Link to={"/dashboard"}>
                  <button
                    className="delete"
                    onClick={() => {
                      setOpenConfirm(true);
                      setUserIdToDelete(user.id);
                      console.log(user.id);
                    }}
                  >
                    Ukloni
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </section>
        <section className="posts" ref={postsRef}>
          {posts.map((post) => (
            <div key={post.id} className="post">
              <p>Title: {post.title}</p>
              <p>Location: {post.location}</p>
              <p>Description: {post.desc.slice(0, 30)}... </p>
              <p>Species: {post.species}</p>
              <p>Action: {post.action}</p>
              <p>Gender: {post.gender}</p>
              <p>Age: {post.age}</p>
              <p>Size: {post.size}</p>
              <p>Color: {post.color}</p>
              <p>Price: {post.price}</p>
              <div className="actions">
                <Link to={`/dashboard/posts/${post.id}`}>
                  <button className="edit" onClick={editPost}>
                    Izmeni
                  </button>
                </Link>
                <Link to={"/dashboard"}>
                  <button
                    className="delete"
                    onClick={() => deletePost(post.id)}
                  >
                    Obriši
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </section>
        <section className="chats" ref={chatsRef}>
          {chats &&
            chats.map((chat) => (
              <div key={chat.id} className="chat">
                <div className="header">
                  <p>CHAT ID: {chat.id}</p>
                  {chat.users.map((user) => (
                    <p key={user.id}>{user.username}</p>
                  ))}
                  <p>broj poruka: {chat.messages.length}</p>
                </div>
                {chat.messages?.map((message) => (
                  <div key={message.id} className="message">
                    <p>id poruke: {message.id}</p>
                    <p>poslao: {message.userId}</p>
                    <p className="text">{message.text}</p>
                    {dateFormatter.format(Date.parse(message.createdAt))}
                  </div>
                ))}
                <div className="actions">
                  {/* <button
                    onClick={() => setOpenModal(true)}
                    className="modal-button"
                  >
                    Modal
                  </button> */}
                  <Link to={"/dashboard"}>
                    <button className="edit" onClick={() => editChat(chat.id)}>
                      Pregledaj
                    </button>
                  </Link>
                  <Link to={"/dashboard"}>
                    <button
                      className="delete"
                      onClick={() => deleteChat(chat.id)}
                    >
                      Obriši
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
