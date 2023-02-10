import { memo, useEffect } from "react";
import useForm from "../../hooks/useForm";
import { inputClass, inputErrorClass } from "../../utils/classes";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, isOpen, onSubmit }) {
  const { values, errors, isValid, onChange, resetForm } = useForm({
    name: "",
    link: "",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  function handleSubmit() {
    return onSubmit(values);
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="addcard"
      title="Новое место"
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className={inputClass(errors.name, "popup__input")}
        placeholder="Название"
        type="text"
        name="name"
        required
        minLength="2"
        maxLength="30"
        autoComplete="off"
        value={values.name}
        onChange={onChange}
      />
      <span className={inputErrorClass(errors.name)}>{errors.name}</span>
      <input
        className={inputClass(errors.link, "popup__input")}
        placeholder="Ссылка на картинку"
        type="url"
        name="link"
        required
        autoComplete="off"
        value={values.link}
        onChange={onChange}
      />
      <span className={inputErrorClass(errors.link)}>{errors.link}</span>
    </PopupWithForm>
  );
}

export default memo(AddPlacePopup);
