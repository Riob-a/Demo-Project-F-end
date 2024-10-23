import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import Footer from './Components/Footer';
import Reference from './Pages/Reference';
import ContactForm from './Pages/ContactUs';
import About from './Pages/About';
import Artwork from './Pages/Artwork';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='artwork' element={<Artwork />} />
        <Route path='reference' element={<Reference />} />
        <Route path='contact' element={<ContactForm />} />
        <Route path='about' element={<About />}/> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;