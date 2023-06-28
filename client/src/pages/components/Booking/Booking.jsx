import axios from "axios";
import React from "react";
import useFetch from "../../../hooks/useFetch";
import "./booking.css";
import paypal from 'paypal-rest-sdk';
export const Booking = ({ hotelId, roomId, name, b_id }) => {
  const { data, loading, error, reFetch } = useFetch(`/hotels/find/${hotelId}`);

  const handelClick = async () => {
    await axios.delete(
      `/booking/${b_id}`
    );
    window.location.reload(false);
  };

  const payBooking = async () => {
    //pay booking by booking ID through paypal
    const booking = await axios.get(`/booking/${b_id}`);
    console.log(booking);
    /* var create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/booking",
          "cancel_url": "http://localhost:3000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": `${booking.hotelName}`,
                  "price": `${booking.price}`,
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": "1.00"
          },
          "description": "This is the payment description."
      }]
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
        console.log(payment);
    }
});
 */
  }
    

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
                <div className="cancel">
                  <button onClick={handelClick}>Cancel Booking</button>
                  <p>
                    By clicking on this button you will loose your reservation
                  </p>
                </div>
              </div>
            </div>
          )}
    </div>
  );
};
