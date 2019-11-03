import React, { useContext } from "react";
import { AuthContext } from "../../App/App";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    console.log('log out');
  }
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
            <Link to="/dashboard">
              <li>Dashboard</li>
            </Link>
            <div onClick={logOut}>
              <li>Log out</li>
            </div>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
