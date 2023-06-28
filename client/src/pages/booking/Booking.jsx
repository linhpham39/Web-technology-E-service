import React, { useContext } from "react";
import Navbar from "../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import "./booking.css";
import { Booking } from "../components/Booking/Booking";
import paypal from 'paypal-rest-sdk';import Header from "../components/header/Header";



export const Bookings = () => {
    const { user } = useContext(AuthContext);
  
    const { data, error, loading } = useFetch(
      `/booking?id=${user._id}`
    );
    paypal.configure({
      'mode': 'sandbox', //sandbox 
      'client_id': 'AaWHcf6L2lRW7426S1a_60FJ4lh6VThcNUfBeKRb5w4zOVquFRPIl7wsBmlBhInm5jEsm-w5E668QuJM',
      'client_secret': 'EJtLcw-Cbys0fkLqNVdYpT_-PQh9bl11Ws7lX9JOtbTOsDb1ytxVl_cKPvYEDu95az6htb9iV1atAKOs'
    });
   
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
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  