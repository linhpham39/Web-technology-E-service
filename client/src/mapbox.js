import React from 'react'
import ReactMapGL from 'react-map-gl'
function Mapbox() {
    const [viewport, setViewport] = React.useState({
      width: "100vw",
      height: "100vh",
      latitude: 21.0244246,
      longitude: 105.7938072,
      zoom: 16,
    });
  return (
    <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxAccessToken="pk.eyJ1IjoibGluaGV4b2wiLCJhIjoiY2xqYTEzMW5zMDZtdzNnbm9qZTM3NHFicyJ9.L7LA8VEVGsEw0_RHwdQCQA"
    />
  )
}

export default Mapbox