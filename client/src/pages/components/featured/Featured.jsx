import React, { useState } from 'react'
import "./featured.css"
import useFetch from '../../../hooks/useFetch'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../../context/SearchContext';
function Featured() {
  
  const[dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    }
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    childrens: 0,
    rooms: 1,
  });
  const { data, loading, error } = useFetch("/hotels/countByCity?cities=marid,london,Berlin");
  const navigate = useNavigate();
  const{dispatch} = useContext(SearchContext);
  const handleClick = (destination)=>{
    dispatch({type:"NEW_SEARCH", payload:{destination, dates, options}})
    navigate("/hotels", {state:{ destination, dates, options}}) // gửi destination, date, options đến trang hotels
}
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) :
        <>
          <div className="featuredItem" onClick={() => handleClick("madrid")}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Madrid</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem" onClick={() => handleClick("london")}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>London</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem" onClick={() => handleClick("Berlin")}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Berlin</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div></>}
    </div>
  )
}
export default Featured
