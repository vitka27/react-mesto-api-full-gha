import useInputForm from "../../hooks/useInputForm";

export default function Login({ onLogin }) {
  const { values, onChange } = useInputForm([]);

  const handleSubmit = (event) => {

    event.preventDefault();
    onLogin(values);
  };

  return (
    <main className="main">
      <div className="form">
        <form action="#" name="sign-in" onSubmit={handleSubmit}>
          <p className="form__title">Вход</p>
          <fieldset className="form__fieldsets">
            <input
              onChange={onChange}
              value={values.email || ''}
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
              value={values.password  || ''}
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
          <button className="form__submit" type="submit">
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}
