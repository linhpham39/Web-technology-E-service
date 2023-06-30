import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./editUser.scss";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useState } from "react";

const EditUser = () => {
    const params = useParams();
    // const location = useLocation();
    // const path = location.pathname.split("/")[1];
    const { data, loading, error } = useFetch(`/users/${params.id}`);
    const navigate = useNavigate();

    const [newInfo, setNewInfo] = useState({
        city: params.city,
        country: params.country,
        email: params.email,
        img: params.img,
        password: params.password,
        phone: params.phone,
        username: params.username
    })
    const handleChange = (e) => {
        setNewInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log(newInfo);
    };
    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/users/${params.id}`, newInfo);
            alert("edited");
            navigate("/users");
        }
        catch (err) {
            console.log(err);
        }

    }
    console.log(data);
    return (
        <>
            <div className="editContainer">
                <form className="editForm" onSubmit={handleEdit}>
                    <img className="editImg" src={`${data.img}`}></img>
                    <div className="editInput">
                        <h1 className="editTitle">Edit user's information</h1>
                        <input type="text" placeholder={data.username}
                            id="username"
                            onChange={handleChange} />
                        <input type="text" placeholder={data.password}
                            id="password"
                            onChange={handleChange} />
                        <input type="text" placeholder={data.email}
                            id="email"
                            onChange={handleChange} />
                        <input type="text" placeholder={data.phone}
                            id="phone"
                            onChange={handleChange} />
                        <input type="text" placeholder={data.city}
                            id="city"
                            onChange={handleChange} />
                        <input type="text" placeholder={data.country}
                            id="country"
                            onChange={handleChange} />
                        <button type="submit" className="saveBtn">
                            Save
                        </button>





                    </div>






                </form>
            </div>
        </>
    )
}
export default EditUser;