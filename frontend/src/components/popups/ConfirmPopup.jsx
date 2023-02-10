import { memo, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onConfirm }) {
  const [isPending, setPending] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    onConfirm().finally(() => setPending(false));
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="confirm"
      title="Вы уверены?"
      buttonText={isPending ? "Сохранение" : "Да"}
      onSubmit={handleSubmit}
    />
  );
}

export default memo(ConfirmPopup);
