import React, { useContext, useRef, useEffect, useState } from "react";
import { AuthContext } from "../../App/App";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      return setShowDropdown(false);
    }
  };

  const handleClickDropdown = (event: any) => {
    if (showDropdown) {
      return setShowDropdown(false);
    }
    return setShowDropdown(true);
  };

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="Navbar">
      <h4 className="Navbar__title">Bug Tracker</h4>
      <ul className="Navbar__links">
        {!state.isAuthenticated ? (
          <>
            <Link to="/register">
              <li>Register</li>
            </Link>
            <Link to="/">
              <li>Login</li>
            </Link>
          </>
        ) : (
          <>
            <div className={["Navbar__dropdown", showDropdown ? "Navbar_dropdown--show" : ""].join(' ')} onClick={handleClickDropdown} ref={dropdownRef}>
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
