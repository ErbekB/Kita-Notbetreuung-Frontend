import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';

import Home from './pages/Home/Home';
import Notfallbetreuung from './pages/Notfallbetreuung/Notfallbetreuung';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
    const [istEingeloggt, setIstEingeloggt] = useState(false);

    return (
        <div className="App">
            {istEingeloggt && <Header/>}
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Notfallbetreuung" element={<Notfallbetreuung/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Router>
            {istEingeloggt && <Footer/>}
        </div>
    );
}

export default App;

