import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Imageupload from './pages/admin/Imageupload';
import CreateMovie from './pages/admin/CreateMovie';
import ScheduleList from './pages/admin/ScheduleList';
import Dashboard from './pages/admin/Dashboard';
import UserList from './pages/admin/UserList';
import MovieList from './pages/admin/MovieList';
import User from './pages/admin/User';
import OrderList from './pages/admin/OrderList';
import Schedule from './pages/admin/Schedule';
import RoomList from './pages/admin/RoomList';
import Footer from "./components/Footer";
import Registration from './pages/Registration';
import Movie from './pages/admin/Movie';
import Booking from './pages/Booking';
import Confirm from './pages/Confirm';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './pages/user/Profile';
import Orderdetail from './pages/user/Orderdetail';
import Orders from './pages/user/Orders';

function App() {
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    role: 0,
    firstName: "",
    status: false
  });
  const [searchMovieName, setSearchMovieName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/auth/check', {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          role: response.data.role,
          firstName: response.data.firstName,
          status: true
        });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({
      email: "",
      id: 0,
      role: 0,
      firstName: "",
      status: false
    });
  };
  
  const handleSearchChange = (e) => {
    setSearchMovieName(e.target.value);
  };

  return (
    <div className="App container">
      <AuthContext.Provider value={{ authState, setAuthState }} >
        <Router>
          <Navbar authState={authState} logout={logout}
          handleSearchChange={handleSearchChange}/>
          <Routes>
            <Route path="/" element={<Home searchMovieName={searchMovieName}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />

            <Route path="/admin/upload" element={<Imageupload />} />
            <Route path="/admin/create_movie" element={<CreateMovie />} />
            <Route path="/admin/movie/:id" element={<Movie />} />
            <Route path="/admin/schedule_list" element={<ScheduleList />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/user_list" element={<UserList />} />
            <Route path="/admin/movie_list" element={<MovieList searchMovieName={searchMovieName} />} />
            <Route path="/admin/room_list" element={<RoomList />} />
            <Route path="/admin/user/:id" element={<User />} />
            <Route path="/admin/schedule/:id" element={<Schedule />} />
            <Route path="/admin/order_list/:id" element={<OrderList />} />
            
            <Route exact path="/booking/:movieId" element={<Booking/>}/>
            <Route exact path="/confirm/:orderId" element={<Confirm/>}/>
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/orders" element={<Orders />} />
            <Route path="/user/order/:orderId" element={<Orderdetail/>} />
          </Routes>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
