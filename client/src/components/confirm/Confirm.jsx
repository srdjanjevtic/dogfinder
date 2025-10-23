import "./confirm.scss";
import { toast } from "react-toastify";

const Confirm = ({ deleteUser, userId, onCloseConfirm, openConfirm }) => {
  if (!openConfirm) return null;

  return (
    <div onClick={onCloseConfirm} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="confirm-container"
      >
        <div className="inner-container">
          <div className="message-container">
            Da li ste sigurni da zelite da obrišete korisnika?
          </div>
        </div>
        <div className="confirm-btnContainer">
          <button
            onClick={() => {
              onCloseConfirm();
            }}
            className="confirm-cancel"
          >
            <span>ODUSTANI</span>
          </button>
          <button
            onClick={() => {
              deleteUser(userId);
              onCloseConfirm();
              toast.success(`Korisnik sa id ${userId} uspešno obrisan`);
            }}
            className="confirm-accept"
          >
            <span className="bold">OBRIŠI KORISNIKA</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
