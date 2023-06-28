import React, { useContext, useState } from 'react'
import "./featuredProperties.css"
import useFetch from '../../../hooks/useFetch'
import { Link, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../../context/SearchContext'

const FeaturedProperties = () => {

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
  //const { datas, loadings, errors } = useFetch("/hotels/countByCity?cities=marid,london,Berlin");
  const navigate = useNavigate();
  const{dispatch} = useContext(SearchContext);

  const handleClick = (name)=>{
    dispatch({type:"NEW_SEARCH", payload:{dates, options}})
    navigate("/hotels", {state:{  dates, options, name}}) // gửi destination, date, options đến trang hotels
    console.log(name)
}


  const{data, loading, error } = useFetch("/hotels?limit=4")
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            
              <div className="fpItem" key={item._id} onClick={() => handleClick(item.name)}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              <div className="fpRating">
                <button>
                  {Math.floor(Math.random() * 2) + 8}.
                  {Math.floor(Math.random() * 2) + 8}
                </button>
                <span>Excellent</span>
              </div>
            </div>
            
            
          ))}
        </>
      )}
      
      
      
    </div>
  )
}

export default FeaturedProperties