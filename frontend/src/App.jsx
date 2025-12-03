import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Home from './Components/Home/Home.jsx';
import Contact from "./Components/Contact/Contact.jsx";
import Auth from './Components/Auth/Auth.jsx'
import Result from "./Components/Result/Result.jsx";


function App() {
  return (
     <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/result/:mediaId" element={<Result />} />
        </Routes>
      </Router>
  )
}

export default App
