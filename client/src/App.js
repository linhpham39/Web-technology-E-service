import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';
import Login from './pages/login/Login';
import React, { useContext } from 'react'
import Mapbox from './mapbox';
import { Register } from './pages/Register/Register';
import { AuthContext } from './context/AuthContext';
import { Bookings } from './pages/booking/Booking';

function App() {
  const {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/booking" element={<Bookings />} />
        <Route path="/hotels" element={<List />}/>
        <Route path="/hotels/:id" element={user ? <Hotel /> : <Login />}/>
        <Route path="/login" element={user ? <Home /> : <Login />}/>
        <Route path="/map" element={<Mapbox/>}/>
        <Route path="/register" element={user ? <Home /> : <Register />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;