import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser, setUserUpdatedProfile } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const apiBaseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3001"
  const { user, token } = useSelector((state) => state.auth);
  console.log(user);
  console.log(token);

  const doLogin = (obj) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await fetch(`${apiBaseUrl}/api/v1/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((response) => {
            if (!response.ok) {
              throw response;
            }
            return response;
          })
          .then((data) => data.json())
          .catch((error) => console.log(error));
          return resolve(userData)
      } catch (error) {
        console.log(error);
        return reject(error)
      }
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const userCredentials = {
      email: email,
      password: password,
    };
    try {
      const data = await doLogin(userCredentials);

      if (data) {
        console.log(data.token);
        dispatch(setUser(data.user));
        dispatch(setUserUpdatedProfile(data.user))
        dispatch(setToken(data.token));
        navigate("/");
      } else {
        alert("Invalid Credentials!!");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <h2>Login Page</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <br />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        <br />
        <p>(Or)</p>
        <br />
        <Link to="/signup">
          <button className="signup-button">Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
