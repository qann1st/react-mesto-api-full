import Popup from "./Popup";

function InfoPopup({ success, isOpen, onClose }) {
  return (
    <Popup onClose={onClose} name="info" isOpen={isOpen}>
      <div className="popup__container">
        <div
          className={
            "popup__info-image " +
            (success
              ? "popup__info-image_type_success"
              : "popup__info-image_type_fail")
          }
        ></div>
        <h2 className="popup__info-message">
          {success
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </Popup>
  );
}

export default InfoPopup;
