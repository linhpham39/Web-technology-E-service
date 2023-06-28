import React, { useContext, useState } from "react";
import "./list.css";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";
import { useLocation } from "react-router-dom/dist";
import format from "date-fns/format";
import { DateRange } from "react-date-range";
import SearchItem from "../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import MailList from "../components/mailList/MailList";
import Footer from "../components/footer/Footer";

export const List = () => {
  //location lưu trữ các thông tin chuyển đến từ người dùng
  // cụ thể chứa destination, date, option đc gửi đến (trong Header)
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [type, setType] = useState(location.state.type)
  const [name, setName] = useState(location.state.name)
  const [openDate, setopenDate] = useState(false); //để mở lịch or đóng lịch, state = false: đóng trước, khi click vào ms mở ra
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const {user} = useContext(AuthContext)

  //search cụ thể khách sạn: giá, ...
  // const {data, loading, error, reFetch} = useFetch(
  //   `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}&type`
  //   )

  const queryParams = [];
  if (destination) {
    queryParams.push(`city=${destination}`);
  }
  if (type) {
    queryParams.push(`type=${type}`);
  }
  if (name) {
    queryParams.push(`name=${name}`);
  }
  const queryString = queryParams.join('&');
  
  const { data, loading, error, reFetch } = useFetch(`/hotels?${queryString}&min=${min || 0}&max=${max || 999}`);
  

  const handleClick = ()=>{
    reFetch()
  }

  return (
    <div>
      <Navbar></Navbar>
      <Header type="list"></Header>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setopenDate(!openDate)}>
                {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()} //không thể chọn ngày cũ hơn ngày hôm nay
                  ranges={dates} // để kéo từ ngày ... đến ngày ...
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small> per night</small>
                  </span>
                  <input type="number" onChange={e=>setMin(e.target.value)} className="lsOptionInput"/* lựa chọn min price */ /> 

                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small> per night</small>
                  </span>
                  <input type="number"onChange={e=>setMax(e.target.value)}  className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? "loading" : <>
            {data.map(item=>(
            <SearchItem item = {item} key={item._id}/>
            ))}
            </>}
          </div>
        </div>
      </div>
      <MailList />
      <div className="footer">
        <Footer />
      </div>
          
    </div>
  );
};
export default List;
