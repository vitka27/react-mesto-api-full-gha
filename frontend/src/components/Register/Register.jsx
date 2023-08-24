import { Link } from "react-router-dom";
import useInputForm from "../../hooks/useInputForm";

export default function Register({ onRegister }) {
  const { values, onChange } = useInputForm([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(values);
  };

  return (
    <main className="main">
      <div className="form">
        <form action="#" name="sign-up" onSubmit={handleSubmit}>
          <p className="form__title">Регистрация</p>
          <fieldset className="form__fieldsets">
            <input
              onChange={onChange}
              value={values.email || ""}
              name="email"
              placeholder="Email"
              aria-label="строка ввода email"
              type="email"
              required=""
              minLength={2}
              maxLength={30}
              className="form__fieldset-input"
            />
            {/* <span id="name-card-err" className="popup__span-input-error"></span> */}
            <input
              onChange={onChange}
              value={values.password || ""}
              name="password"
              placeholder="Пороль"
              aria-label="строка ввода пороля"
              type="password"
              required=""
              minLength={2}
              maxLength={30}
              className="form__fieldset-input"
            />
            {/* <span id="name-card-err" className="popup__span-input-error"></span> */}
          </fieldset>
          <button
            className="form__submit"
            type="submit"
            aria-label="Зарегистроваться"
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="form__additional-message">
          <p className="form__additional-message-title">
            Уже зарегистрированны?{" "}
            <Link to="/sign-in" className="form__additional-message-link">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
