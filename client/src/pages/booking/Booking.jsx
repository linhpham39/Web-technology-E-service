import React, { useContext } from "react";
import Navbar from "../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import "./booking.css";
import { Booking } from "../components/Booking/Booking";
import paypal from 'paypal-rest-sdk';
import Header from "../components/header/Header";


export const Bookings = () => {
    const { user } = useContext(AuthContext);
  
    const { data, error, loading } = useFetch(
      `/booking/user/${user._id}`
    );

    console.log(data)
   
    return (
      <div className="bookings">
        <Navbar/>
        <Header type="list" />
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
                  price={item.price}
                //   price={item.price}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  