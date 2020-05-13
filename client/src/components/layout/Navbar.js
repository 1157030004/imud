import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <body>
      <header className="masthead">
        <div className="overlay">
          <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
            <div className="container">
              <Link className="navbar-brand" to="/">
                imuD
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
                    <a className="nav-link" href="!#">
                      First Item
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a className="nav-link" href="!#">
                      Second Item
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="dropdown-toggle nav-link"
                      data-toggle="dropdown"
                      aria-expanded="false"
                      href="!#"
                    >
                      Dropdown{" "}
                    </a>
                    <div className="dropdown-menu" role="menu">
                      <a
                        className="dropdown-item"
                        role="presentation"
                        href="!#"
                      >
                        First Item
                      </a>
                      <a
                        className="dropdown-item"
                        role="presentation"
                        href="!#"
                      >
                        Second Item
                      </a>
                      <a
                        className="dropdown-item"
                        role="presentation"
                        href="!#"
                      >
                        Third Item
                      </a>
                    </div>
                  </li>
                </ul>
                <span className="navbar-text actions">
                  {" "}
                  <Link className="login" to="/login">
                    Login
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
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-8 mx-auto">
              <div
                className="site-heading"
                // style={{color: #ffffff;background-color: rgba(255,255,255,0)}}
              >
                <h1>Clean Blog</h1>
                <span className="subheading">
                  A Blog Theme by Start Bootstrap
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </body>
  );
};

export default Navbar;
