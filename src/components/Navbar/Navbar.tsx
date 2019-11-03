import React, { useContext } from "react";
import { AuthContext } from "../../App/App";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="Navbar">
      <Link to="/">
        <h4 className="Navbar__title">Bug Tracker</h4>
      </Link>
      <ul className="Navbar__links">
        {!state.isAuthenticated ? (
          <>
            <Link to="/register">
              <li>Register</li>
            </Link>
            <Link to="/login">
              <li>Login</li>
            </Link>
          </>
        ) : (
          <>
            <div className="Navbar__dropdown">
              <div className="Navbar__dropdown-user">
                <img className="Navbar__dropdown-identicon" src={`https://identicon.rmhdev.net/${state.user.name}.png`} alt="user identicon"/>
                <div>{state.user.name}</div>
                <svg viewBox="0 0 255 255" height="14">
                  <g>
                    <g id="arrow-drop-down">
                      <polygon points="0,63.75 127.5,191.25 255,63.75" />
                    </g>
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
              </div>
              <div className="Navbar__dropdown-options">
                <Link to="/dashboard">
                  <div>Dashboard</div>
                </Link>
                <div onClick={logOut}>Log Out</div>
              </div>
            </div>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
