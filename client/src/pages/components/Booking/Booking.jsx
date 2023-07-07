import axios from "axios";
import React from "react";
import useFetch from "../../../hooks/useFetch";
import "./booking.css";
import { useState } from "react";
import StripeContainer from "../payment/StripeContainer";

export const Booking = ({ hotelId, roomId, name, b_id, price, isPaid}) => {
  const { data, loading, error, reFetch } = useFetch(`/hotels/find/${hotelId}`);
  const bookingId = b_id;
  console.log("paid", isPaid);
  const handelClick = async () => {
    await axios.delete(
      `/booking/${b_id}`
    );
    window.location.reload(false);
  };
  const [showItem, setShowItem] = useState(false);
  const handlePayment = () => {
    setShowItem(true);
  };

  return (
    <div className="booking">
      {loading
        ? "Loading please wait"
        : data && (
          <div className="box">
            <div className="leftB">
              <img src={data.photos ? data.photos[0] : "https://images.unsplash.com/photo-1635548166842-bf67bacbefaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"} alt="" />
              <div className="desc">
                <h3>{data.name}</h3>
                <p>{data.address}</p>
              </div>
            </div>
            <div className="rightB">
              <div className="num">
                <h4>Room Numbers:</h4>
                <div className="rn">
                  {roomId.map((item, i) => (
                    <span key={i}>{item} </span>
                  ))}
                </div>
              </div>
              <div className="price">
                <h4>Total price:</h4>
                <div className="nprice">
                  <span>{price}</span>
                </div>
              </div>
              {!isPaid && <div className="ButtonContainer">
                <button className="cancel" onClick={handelClick}>Cancel Booking</button>
              
              {showItem ? (
                <StripeContainer
                  amount = {price}
                  b_id = {bookingId}
                />
              ) : (
                <>
                  <button className="payment" onClick={() => handlePayment()}>Pay booking</button>
                </>
              )}
              <p className="msgAlert">
                By clicking on cancel button you will loose your reservation
              </p>
              </div>}
              {isPaid && <div className="ButtonContainer">
                <button className="paid">Paid successfully</button>
                </div>}
            </div>
          </div>
        )}
    </div>
  );
};

export default Booking
