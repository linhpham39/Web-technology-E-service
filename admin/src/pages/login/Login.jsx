import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import React from "react";
import "./login.scss"

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  })

  const { loading, error, dispatchAuth } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault();
    dispatchAuth({ type: "LOGIN_START" })
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatchAuth({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/")
      } else {
        dispatchAuth ({
          type: "LOGIN_FAILURE",
          payload:{message: "You are not allowed!"}
        })
      }
    } catch (err) {
      dispatchAuth({ type: "LOGIN_FAILURE", payload: err.response.data })
    }
  }

  return (
    <div className="login">
      <div className="lContainer">
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
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span> {error.message}</span>}
      </div>
    </div>
  )
}

export default Login;

