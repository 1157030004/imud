import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

export const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      console.log("SUCCESS");
    }
  };

  return (
    <Fragment>
      <div className="register-photo">
        <div className="form-container">
          <div className="image-holder"></div>
          <form method="post" onSubmit={(e) => onSubmit(e)}>
            <h2 className="text-center">
              <strong>Create</strong> an account.
            </h2>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
                placeholder="name"
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                placeholder="Password"
                minLength="6"
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password2"
                value={password2}
                onChange={(e) => onChange(e)}
                placeholder="Password (repeat)"
                minLength="6"
                required
              />
            </div>
            <div className="form-group">
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" />I agree
                  to the license terms.
                </label>
              </div>
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">
                Register
              </button>
            </div>
            <Link className="already" to="/login">
              You already have an account? Login here.
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);
