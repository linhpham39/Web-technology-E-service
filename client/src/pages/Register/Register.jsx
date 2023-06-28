import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handelClick = async () => {
    setLoading(true);
    try {
      await axios.post(
        "/auth/register",
        { username, email, password }
      );
      setLoading(false);
      setError(false);
      navigate("/login");
    } catch (error) {
      setErrorMsg(error.message);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="RGcontainer">
        <div className="RGwrapper">
          <div className="RGlogo"> Register</div>
          <div className="RGform">
            <input
              type="text"
              required
              placeholder="username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="RGbutton" onClick={handelClick}>
            Register
          </button>
          {error && <span style={{ color: "red" }}>{errorMsg}</span>}
          {loading && <span>Please Wait...</span>}
          <div style={{ fontSize: "14px", color: "grey" }}>
            Already registered! Click here to{" "}    
            <Link
              to="/login"
              style={{ color: "teal", textDecoration: "underline teal" }}
            >
            Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
