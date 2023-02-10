import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useUser } from "../../contexts/CurrentUserContext";

function Auth({
  children,
  isValid,
  onSubmit,
  link,
  linkTitle,
  title,
  isLoggedIn,
  buttonText,
}) {
  const [isLoading, setLoading] = useState(false);
  const [currentUser] = useUser();
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser, history]);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    onSubmit().finally(() => setLoading(false));
  }

  return (
    <div className="auth">
      <h1 className="auth__title">{title}</h1>
      <form className="auth__form" noValidate onSubmit={handleSubmit}>
        {children}
        <button
          disabled={!isValid || isLoading}
          className={
            "button button_type_white auth__button" +
            (isValid ? "" : " button_disabled")
          }
          type="submit"
        >
          {buttonText}
        </button>
      </form>
      <Link className="auth__link" to={link}>
        {linkTitle}
      </Link>
    </div>
  );
}

export default Auth;
