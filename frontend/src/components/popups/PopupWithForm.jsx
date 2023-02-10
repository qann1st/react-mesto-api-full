import { memo, useState } from "react";
import Popup from "./Popup";


function PopupWithForm({
  children,
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  isValid = true,
  buttonText = "Сохранить",
}) {
  const [isLoading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    onSubmit().finally(() => setLoading(false));
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          className={`popup__form popup__form_type_${name}`}
          noValidate
          onSubmit={handleSubmit}
        >
          {children}
          <button
            type="submit"
            className={
              "popup__button button" + (isValid ? "" : " button_disabled")
            }
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Сохранение" : buttonText}
          </button>
        </form>
      </div>
    </Popup>
  );
}

export default memo(PopupWithForm);