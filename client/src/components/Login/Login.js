import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserFromAPI, addUserToAPI } from "../../actions/user";

import Menu from "../Menu";
import "./css/Login.css";

const Login = () => {
  const initial_state = {
    email: "",
    password: "",
  };
  const register_state = {
    r_name: "",
    r_email: "",
    r_password: "",
    r_confirm: "",
  };

  const register_errors = {
    email: false,
    name: false,
    password: false,
    confirm: false,
    notEqual: false,
  };

  const login_errors = {
    email: false,
    password: false,
  };
  const [formData, setFormData] = useState(initial_state);
  const [registerData, setRegisterData] = useState(register_state);
  const [errors, setErrors] = useState(register_errors);
  const [loginErrors, setLoginErrors] = useState(login_errors);
  const [showLoginErrors, setShowLoginErrors] = useState(false);
  const [showRegErrors, setShowRegErrors] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const failReg = useSelector((state) => state.user.failReg);
  const failLog = useSelector((state) => state.user.failLog);
  const user = useSelector((state) => state.user.user);

  if (user) {
    history.push("/dashboard");
  }

  const handleRegister = (e) => {
    const { name, value } = e.target;
    setRegisterData((registerData) => ({ ...registerData, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const submitLogin = () => {
    setShowLoginErrors(true);

    const { email, password } = loginErrors;

    let user = { ...formData };

    if (!email && !password) {
      dispatch(getUserFromAPI(user));
    }
  };
  const submitRegister = () => {
    setShowRegErrors(true);

    const { email, name, password, confirm, notEqual } = errors;

    let user = { ...registerData };

    if (!email && !name && !password && !confirm && !notEqual) {
      dispatch(addUserToAPI(user));
    }
  };

  useEffect(() => {
    let e = { ...loginErrors };

    let { email, password } = formData;

    if (email.length === 0) {
      e.email = true;
    } else {
      e.email = false;
    }

    if (password.length === 0) {
      e.password = true;
    } else {
      e.password = false;
    }
    if (showLoginErrors) {
      setLoginErrors(e);
    }
  }, [showLoginErrors]);

  useEffect(() => {
    let e = { ...errors };

    let { r_email, r_name, r_password, r_confirm } = registerData;

    if (r_name.length === 0) {
      e.name = true;
    } else {
      e.name = false;
    }

    if (r_email.length === 0) {
      e.email = true;
    } else {
      e.email = false;
    }

    if (r_password.length === 0) {
      e.password = true;
    } else {
      e.password = false;
    }

    if (r_confirm.length === 0) {
      e.confirm = true;
    } else {
      e.confirm = false;
    }

    if (r_password !== r_confirm) {
      e.notEqual = true;
    } else {
      e.notEqual = false;
    }
    if (showRegErrors) {
      setErrors(e);
    }
  }, [showRegErrors]);

  return (
    <div className="login-wrapper">
      <div className="login-menu">
        <Menu />
      </div>
      <div className="login-content">
        <div className="login-signin">
          <div className="signin-title">Sign in</div>
          <div className="signin-inputs">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email address"
            />
            {loginErrors.email ? (
              <div className="register-error">Missing Input</div>
            ) : null}
            <br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
            />
            {loginErrors.password ? (
              <div className="register-error">Missing Input</div>
            ) : null}
            {failLog ? (
              <div className="register-error">Inputs are not correct</div>
            ) : null}
          </div>
          <div className="login-btn" onClick={submitLogin}>
            SIGN IN
          </div>
        </div>
        <div className="login-divisor">
          <span>or</span>
        </div>
        <div className="login-register">
          <div className="register-title">Register</div>
          <div className="register-inputs">
            <input
              type="text"
              name="r_email"
              value={registerData.email}
              onChange={handleRegister}
              placeholder="email address"
            />
            {errors.email ? (
              <div className="register-error">Missing Input</div>
            ) : null}
            <input
              type="text"
              name="r_name"
              value={registerData.name}
              onChange={handleRegister}
              placeholder="full name"
            />
            {errors.name ? (
              <div className="register-error">Missing Input</div>
            ) : null}

            <input
              type="password"
              name="r_password"
              value={registerData.password}
              onChange={handleRegister}
              placeholder="password"
            />
            {errors.password ? (
              <div className="register-error">Missing Input</div>
            ) : null}
            <input
              type="password"
              name="r_confirm"
              value={registerData.confirm}
              onChange={handleRegister}
              placeholder="confirm password"
            />
            {errors.confirm ? (
              <div className="register-error">Missing Input</div>
            ) : null}
            {errors.notEqual ? (
              <div className="register-error">Passwords don't match</div>
            ) : null}
            {failReg ? (
              <div className="register-error">Email in use</div>
            ) : null}
          </div>

          <div className="login-btn" onClick={submitRegister}>
            REGISTER
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
