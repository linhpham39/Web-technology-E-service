import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { dispatchAuth } = useContext(AuthContext);
  const handelClick = () => {
    dispatchAuth({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <ul>
              <li onClick={handelClick} style={{ listStyleType: "none"}}>Log Out</li>
            </ul>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
