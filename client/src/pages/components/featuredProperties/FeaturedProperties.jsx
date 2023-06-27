import React from 'react'
import "./featuredProperties.css"
import useFetch from '../../../hooks/useFetch'

const FeaturedProperties = () => {
  const{data, loading, error } = useFetch("/hotels?limit=4")
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
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