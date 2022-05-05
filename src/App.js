import React from 'react';
import Home from './Components/Home'
import Operations from './Components/Operations';
import Navbar from './Components/Navbar';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';

function App() {



  return (
    <div>
      <Navbar brand='Budget App' />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/operations' element={<Operations />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
