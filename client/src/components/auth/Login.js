import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("SUCCESS");
  };

  return (
    <Fragment>
      <div className="login-clean">
        <form method="post">
          <h2 className="sr-only">Login Form</h2>
          <div className="illustration">
            <i className="icon ion-ios-navigate"></i>
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
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Log In
            </button>
          </div>
          <a className="forgot" href="#">
            Forgot your email or password?
          </a>
          <Link className="no-account" to="/register">
            Don't have an account?
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
