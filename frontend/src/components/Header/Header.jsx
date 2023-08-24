import logo from "../../image/logo/logo.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onEmail, onSignOut }) {
  const location = useLocation();

  function handleSubmit(params) {
    onSignOut();
  }

  return (
      <header className="header">
        <img src={logo} alt="Логотип" className="header__logo" />
        <div className="header__user-block">
          {onEmail ? (
            <>
              <p className="header__user-email">{onEmail}</p>{" "}
              <a
                onClick={handleSubmit}
                className="heqader__user-link header__user-link_type_inactive"
                href="/"
              >
                Выйти
              </a>
            </>
          ) : location.pathname === "/sign-in" ? (
            <Link className="heqader__user-link" to={"/sign-up"}>
              Регистрация
            </Link>
          ) : (
            <Link className="heqader__user-link" to={"/sign-in"}>
              Войти
            </Link>
          )}
        </div>
      </header>
  );
}
