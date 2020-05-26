import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Int Muda Salman
        </Link>
        <button
          data-toggle="collapse"
          className="navbar-toggler"
          data-target="#navcol-1"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="nav navbar-nav mr-auto">
            <li className="nav-item" role="presentation">
              <a className="nav-link" href="#">
                First Item
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link" href="#">
                Second Item
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="dropdown-toggle nav-link"
                data-toggle="dropdown"
                aria-expanded="false"
                href="#"
              >
                Dropdown{" "}
              </a>
              <div className="dropdown-menu" role="menu">
                <a className="dropdown-item" role="presentation" href="#">
                  First Item
                </a>
                <a className="dropdown-item" role="presentation" href="#">
                  Second Item
                </a>
                <a className="dropdown-item" role="presentation" href="#">
                  Third Item
                </a>
              </div>
            </li>
          </ul>
          <span className="navbar-text actions">
            {" "}
            <Link className="login" to="/login">
              Log In
            </Link>
            <Link
              className="btn btn-light action-button"
              role="button"
              to="/register"
            >
              Register
            </Link>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
