// import { useEffect, useState } from "react";
import "./modal.scss";
import { FaTrash } from "react-icons/fa";

const Modal = ({ chat, removedMessage, deleteMessage, openModal, onClose }) => {
  if (!openModal) return null;
  // const [message, setMessage] = useState(removedMessage);

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // useEffect(() => {
  //   setMessage(removedMessage);
  // }, [message]);

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container"
      >
        <div className="chat-container">
          <div className="chat-id-container">
            <p className="chat-id">CHAT ID:</p>
            <p className="chat-id">{chat.id}</p>
          </div>
          <div className="users">
            <div className="title">User ID's:</div>
            <div className="user-ids">
              {chat.userIDs.map((id) => (
                <p key={id}>{id}</p>
              ))}
            </div>
          </div>
          <div className="created-at">
            <p>Created At:</p>
            <p>{dateFormatter.format(Date.parse(chat.createdAt))}</p>
          </div>
          <div className="messages">
            <p className="header">Messages</p>
            {chat.messages.map((message) => (
              <div className="message" key={message.id}>
                <div className="body">
                  <p className="message-id">
                    MessageId: <span>{message.id}</span>
                  </p>
                  <p className="message-text">
                    <span>{message.user.username}</span>: {message.text}
                  </p>
                  <span className="message-date">
                    {dateFormatter.format(Date.parse(message.createdAt))}
                  </span>
                </div>
                <div className="button">
                  <button>
                    <FaTrash
                      onClick={(e) => {
                        deleteMessage(message.id);
                        onClose();
                      }}
                      size={20}
                      color="#616161"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="btnContainer">
          <button onClick={onClose} className="btnOutline">
            <span className="bold">ZATVORI</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
