import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router , Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import WOW from "wowjs";
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

function Layout(){
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/' || location.pathname=== '/logout';

  useEffect(() => {
    new WOW.WOW().init();
}, []);

  return(
    <>
    {!hideNavAndFooter && <Navbar />}
        {/* <Navbar /> */}
        <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path='register' element={<Register />} />
        <Route path='/' element={<SignIn />} />
        <Route path='logout' element={<Logout />} />
        <Route path='artwork' element={<Artwork />} />
        <Route path='reference' element={<Reference />} />
        <Route path='contact' element={<ContactForm />} />
        <Route path='about' element={<About />}/> 
        </Routes>
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