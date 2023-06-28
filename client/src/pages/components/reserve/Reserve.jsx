import React, { useContext, useState } from "react";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../../hooks/useFetch";
import { SearchContext } from "../../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const [roomNum, setNum] = useState([]);
  const { user } = useContext(AuthContext);
  const [roomPrice, setPrice] = useState([]);
  const [day, setDay] = useState([])

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.setUTCHours(0, 0, 0, 0));

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).setUTCHours(0, 0, 0, 0));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

//   const date1 = new Date("2023-06-28");
//   console.log(date1.getTime())

//  console.log(dates[0].startDate)

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  console.log(getDatesInRange(dates[0].startDate, dates[0].endDate))




  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).setUTCHours(0, 0, 0, 0))
    );
    return !isFound;
  };

  

  const handleSelect = (e) => {
    const checked = e.target.checked;
    console.log(e.target.value);
    const temp = e.target.value.split(",");
    const value = temp[0];
    const num = temp[1];
    const price = temp[2];
    const [_,__,___, ...d] = temp;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );

    setNum(
      checked ? [...roomNum, num] : roomNum.filter((item) => item !== num)
    );

    setPrice(
      checked
        ? [...roomPrice, price]
        : roomPrice.filter((item) => item !== price)
    );

    setDay(
        checked ? [...day,...d ] : day.filter((item) => !d.includes(item))
      );

  };

  console.log(selectedRooms);
  console.log(roomNum);
  console.log(roomPrice);
  console.log(day);

  const timestamps = day.map(dateString => {
    const date = new Date(dateString);
    return date.setUTCHours(0, 0, 0, 0);
  });
  
  console.log(timestamps);

  const conDate = day.map(date1 =>{
    const date2 = new Date(date1);
    return date2.setUTCHours(0, 0, 0, 0);
  })
console.log(conDate)

  //console.log(data.roomNumbers.unavailableDates)

  const convertedPrices = roomPrice.map((price) => parseInt(price, 10));

  const totalPrice = convertedPrices.reduce(
    (sum, currentPrice) => sum + currentPrice,
    0
  );

  console.log(totalPrice);

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      await axios.post(`/booking`, {
        user: user._id,
        room: roomNum,
        hotel: hotelId,
        price: totalPrice,
      });
      setOpen(false);
      navigate("/booking");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item && item.title}</div>
              <div className="rDesc">{item && item.desc}</div>
              <div className="rMax">
                Max people: <b>{item && item.maxPeople}</b>
              </div>
              <div className="rPrice">{item && item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item &&
                item.roomNumbers &&
                item.roomNumbers.map((roomNumber) => (
                  <div className="room" key={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={[roomNumber._id, roomNumber.number, item.price, roomNumber.unavailableDates]}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
