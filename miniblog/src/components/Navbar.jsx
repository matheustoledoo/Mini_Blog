import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication.jsx";

import { useAuthValue } from "../context/AuthContext.jsx";

import styles from "./Navbar.module.css";

const Navbar = () => {

  const { logout } = useAuthentication(); // função do hook para deslogar
  const { user } = useAuthValue(); //ve o usuario de esta logado

  return (
    <nav className={styles.navbar}>
    <NavLink className={styles.brand} to="/">
      Mini <span>Blog</span>
    </NavLink>
    <ul className={styles.links_list}>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Home
        </NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Entrar
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Cadastrar
            </NavLink>
          </li>
        </>
      )}
      {user && (
        <>
          <li>
            <NavLink
              to="/posts/create"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Novo post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Sobre
        </NavLink>
      </li>
      {user && (
        <li>
          <button onClick={logout}>Sair</button>
        </li>
      )}
    </ul>
  </nav>
  );
};

export default Navbar;