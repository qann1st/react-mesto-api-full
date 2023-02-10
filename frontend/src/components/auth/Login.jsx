import useForm from "../../hooks/useForm";
import { inputClass, inputErrorClass } from "../../utils/classes";
import Auth from "./Auth";

function Login({ onSubmit }) {
  const { values, errors, isValid, onChange } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit() {
    return onSubmit(values)
  }

  return (
    <Auth
      onSubmit={handleSubmit}
      isValid={isValid}
      link="/sign-up"
      linkTitle="Нет аккаунта? Зарегистрироваться"
      title="Вход"
        buttonText={"Войти"}
    >
      <input
        className={inputClass(errors.email, "auth__input")}
        placeholder="Email"
        name="email"
        type="email"
        autoComplete="off"
        onChange={onChange}
        value={values.email}
      />
      <span className={inputErrorClass(errors.email)}>{errors.email}</span>
      <input
        className={inputClass(errors.password, "auth__input")}
        placeholder="Пароль"
        name="password"
        type="password"
        onChange={onChange}
        value={values.password}
      />
    </Auth>
  );
}

export default Login;
