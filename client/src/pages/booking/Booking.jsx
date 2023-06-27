import React, { useContext } from "react";
import Navbar from "../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import "./booking.css";
import { Booking } from "../components/Booking/Booking";



export const Bookings = () => {
    const { user } = useContext(AuthContext);
  
    const { data, error, loading } = useFetch(
      `/booking?id=${user._id}`
    );
  
    return (
      <div className="bookings">
        <Navbar/>
        <div className="Bcontainer">
          <h1>Your bookings</h1>
          {loading ? (
            "Loading Please Wait..."
          ) : (
            <div className="Bwrapper">
              {data.map((item, i) => (
                <Booking
                  hotelId={item.hotel}
                  roomId={item.room}
                  name={user.username}
                  key={i}
                  b_id={data[i]._id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  