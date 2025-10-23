import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import TimeAgo from "timeago-react";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Chat({ chats }) {
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [chat, setChat] = useState(null);
  const [isConnected, setIsConnected] = useState(socket.connected);
  console.log(isConnected);
  const messageEndRef = useRef();
  const decrease = useNotificationStore((state) => state.decrease);

  // useEffect(() => {
  //   messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const toggleConnection = async () => {
  //   if (!isConnected && !socket.id) {
  //     await socket.connect();
  //     setIsConnected(true);
  //   } else {
  //     await socket.disconnect();
  //     setIsConnected(false);
  //   }
  // };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
      // socket.on("connect", setIsConnected(true));
      // socket.on("disconnect", setIsConnected(false));
    }
    return () => {
      socket.off("getMessage");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket, chat]);

  // const testSocket = () => {
  //   socket.emit("test", "testing...");
  // };
  return (
    <div className="chat">
      {/* <button onClick={testSocket}>Test</button> */}
      <div className="messages">
        <div>
          <h1>Poruke</h1>
          {/* <p>
            Connected:
            <span
              style={{
                fontWeight: "bold",
                color: isConnected ? "green" : "red",
              }}
            >
              {" " + isConnected.toString().toUpperCase()}
            </span>
          </p> */}
          {/* <div>
            <button onClick={(prev) => toggleConnection(!prev)}>
              {isConnected ? "Disconnect" : "Connect"}
            </button>
          </div> */}
        </div>
        {isConnected &&
          chats?.map((c) => (
            <div
              className="message"
              key={c.id}
              style={{
                backgroundColor:
                  c.seenBy.includes(currentUser.id) || chat?.id === c.id
                    ? "white"
                    : "#fecd514e",
              }}
              onClick={() => handleOpenChat(c.id, c.receiver)}
            >
              <img src={c.receiver.avatar || "/noavatar.jpg"} alt="" />
              <span>{c.receiver.username}</span>
              {/* <p>{c.lastMessage}</p> */}
            </div>
          ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "noavatar.jpg"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              <AiOutlineCloseCircle size={24} />
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>
                  <TimeAgo datetime={message.createdAt} locale="sr_RS" />
                </span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Pošalji</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
