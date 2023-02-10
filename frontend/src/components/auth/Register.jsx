import useForm from "../../hooks/useForm";
import { inputClass } from "../../utils/classes";
import Auth from "./Auth";

function Register({ onSubmit }) {
  const { values, errors, isValid, onChange } = useForm({
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleSubmit() {
    return onSubmit({ email: values.email, password: values.password });
  }

  const passwordsMatch =
    values.confirmPassword !== values.password ? "Пароли не совпадают" : "";

  const inputErrorClass = (error) => "error" + (error ? " error_active" : "");

  return (
    <Auth
      onSubmit={handleSubmit}
      isValid={isValid && !passwordsMatch}
      link="/sign-in"
      linkTitle="Уже зарегистрированы? Войти"
      title="Регистрация"
      buttonText="Зарегистрироваться"
    >
      <input
        className={inputClass(errors.email, "auth__input")}
        placeholder="Email"
        name="email"
        type="email"
        autoComplete="off"
        value={values.email}
        onChange={onChange}
      />
      <span className={inputErrorClass(errors.email)}>{errors.email}</span>
      <input
        className={inputClass(errors.password, "auth__input")}
        placeholder="Пароль"
        name="password"
        type="password"
        minLength={4}
        maxLength={32}
        value={values.password}
        onChange={onChange}
      />
      <span className={inputErrorClass(errors.password)}>
        {errors.password}
      </span>
      <input
        className="input auth__input"
        placeholder="Повторите пароль"
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onChange={onChange}
      />
      <span
        className={inputErrorClass(errors.confirmPassword || passwordsMatch)}
      >
        {errors.confirmPassword || passwordsMatch}
      </span>
    </Auth>
  );
}

export default Register;
