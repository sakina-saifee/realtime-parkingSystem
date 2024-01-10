import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UserLogin from './User/UserLogin';
import UserRegister from './User/UserRegister';
import AvailableLocations from './User/UserHome';
import AboutUs from './User/AboutUs';
import Booking from './User/Booking';
import AdminLogin from './Admin/AdminLogin';
import UserHome from './User/UserHome';
import AdminMain from './Admin/AdminMain';
import ViewParkingLocation from './User/ViewParkingLocation';


function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Routes>

          <Route exact path="/userlogin" element={<UserLogin />} />
          <Route exact path="/userregister" element={<UserRegister/>} />
          <Route exact path="/userhome" element={<UserHome/>} />
          <Route exact path="/aboutus" element={<AboutUs/>} />
          <Route exact path="/booking" element={<Booking/>} />
          <Route exact path="/viewParkinglocation" element={<ViewParkingLocation/>} />


          <Route exact path="/adminlogin" element={<AdminLogin/>} />
          <Route exact path="/adminmain" element={<AdminMain/>} />




        </Routes>


      </BrowserRouter>
    </>
  );
}

export default App;
