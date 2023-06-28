import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import React from "react";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  console.log(user);

  return (
    <div className="login">
      <div className="LGcontainer">
        <div className="LGwrapper">
          <div className="LGlogo"> Login</div>
          <div className="LGform">
            <input
              type="text"
              placeholder="nhập username ở đây nè"
              id="username"
              onChange={handleChange}
              className="lInput"
            />
            <input
              type="password"
              placeholder="password 12345"
              id="password"
              onChange={handleChange}
              className="lInput"
            />
          </div>
          <button disabled={loading} onClick={handleClick} className="LGbutton">
            Login
          </button>
          {loading && <span>Please Wait...</span>}
          {error && <span style={{ color: "red" }}>{error.message}</span>}
          <div style={{ fontSize: "14px", color: "grey" }}>
            Click here to{" "}
            <Link
              to="/register"
              style={{ color: "teal", textDecoration: "underline teal" }}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
