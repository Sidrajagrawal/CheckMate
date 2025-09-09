import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Home from './Components/Home/Home.jsx';
import BackAuth from "./Components/Auth/BackAuth.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import About from "./Components/About/About.jsx";

function App() {
  return (
     <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<BackAuth/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </Router>
  )
}

export default App
