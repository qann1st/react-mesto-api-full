import { useState } from "react";
import { memo } from "react";
import { Link, Route, Switch } from "react-router-dom";

function Header({ email, onSignOut }) {
  const [isOpen, setOpen] = useState(false);
  
  function handleClickSignOut() {
    onSignOut()
    setOpen(false)
  }

  return (
    <header className="header">
      <div className={"header__menu" + (isOpen ? " header__menu_opened" : "")}>
        <p className="header__user">{email}</p>
        <Link to="/sign-in" className="header__link" onClick={handleClickSignOut}>
          Выйти
        </Link>
      </div>

      <div className="header__container">
        <Link to="/">
          <div className="header__logo"></div>
        </Link>
        <Switch>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </Route>
          <Route>
            <div className="header__info">
              <p className="header__user">{email}</p>
              <Link to="/sign-in" className="header__link" onClick={handleClickSignOut}>
                Выйти
              </Link>
            </div>
            <input
              style={{display: "none"}}
              type="checkbox"
              className="burger-input"
              id="burger"
              value={isOpen}
              onChange={(e) => {
                setOpen(e.target.checked);
              }}
            />
            <label htmlFor="burger" className="burger-icon header__burger">
              <div></div>
              <div></div>
              <div></div>
            </label>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default memo(Header);
