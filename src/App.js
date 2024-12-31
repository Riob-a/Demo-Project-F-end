import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router , Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import WOW from "wowjs";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import Footer from './Components/Footer';
import Reference from './Pages/Reference';
import ContactForm from './Pages/ContactUs';
import About from './Pages/About';
import Artwork from './Pages/Artwork';
import SignIn from './Pages/SignIn';
import Register from './Pages/Register';
import Logout from './Pages/LogOut';
import ProtectedRoute from './Components/ProtectedRoute';
import UserProfile from './Pages/UserProfile';
import ChangePassword from './Pages/ChangePassword';

function Layout(){
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/signin' || location.pathname === '/logout' || location.pathname === '/register' || location.pathname === '/change-password';

  useEffect(() => {
    new WOW.WOW().init();
}, []);

  return(
    <>
    {!hideNavAndFooter && <Navbar />}
        {/* <Navbar /> */}
        <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<HomePage />}  />
        <Route path="about" element={<About />}  />
        <Route path='change-password' element={<ChangePassword />} />



        {/* Protected Routes */}
        {/* <Route path="home" element={<ProtectedRoute element={<HomePage />} />} /> */}
        <Route path="logout" element={<ProtectedRoute element={<Logout />} />} />
        <Route path="artwork" element={<ProtectedRoute element={<Artwork />} />} />
        <Route path="reference" element={<ProtectedRoute element={<Reference />} />} />
        <Route path="contact" element={<ProtectedRoute element={<ContactForm />} />} />
        {/* <Route path="about" element={<ProtectedRoute element={<About />} />} /> */}
        <Route path='profile' element={<ProtectedRoute element={<UserProfile />} />} />
      </Routes>
      <ToastContainer />
        {/* <Footer /> */}
    {!hideNavAndFooter && <Footer />} 
    </> 
  );
}
function App() {
  return (
    <div>
      <Router>
         <Layout />
      </Router>
    </div>
  );
}
export default App;