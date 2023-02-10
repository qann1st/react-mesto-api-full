import { memo, useEffect, useState } from "react";
import Popup from "./Popup";

function ImagePopup({ card, onClose }) {
  //Чтобы при закрытии, во время анимации, картинка оставалась
  const [lastCard, setLastCard] = useState(null);

  useEffect(() => {
    if (card) setLastCard(card);
  }, [card]);

  return (
    <Popup onClose={onClose} name="image" isOpen={!!card}>
      <img className="popup__image" src={lastCard?.link} alt={lastCard?.name} />
      <p className="popup__img-caption">{lastCard?.name}</p>
    </Popup>
  );
}

export default memo(ImagePopup);
