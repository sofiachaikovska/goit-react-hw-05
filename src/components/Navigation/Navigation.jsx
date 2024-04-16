import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header className={css.header}>
      <NavLink
        className={({ isActive }) =>
          clsx(css.headerLink, { [css.active]: isActive })
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          clsx(css.headerLink, { [css.active]: isActive })
        }
        to="/movies"
      >
        Movies
      </NavLink>
    </header>
  );
};

export default Navigation;
