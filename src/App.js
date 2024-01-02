import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "./App.css";

import Home from './pages/Home/Home';
import Notfallbetreuung from './pages/Notfallbetreuung/Notfallbetreuung';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Authenticator from "./pages/Login/Authenticator";
import Registrieren from "./pages/Registrieren/Registrieren";
import ProfilBearbeiten from "./pages/NameOderPasswortAendern/ProfilBearbeiten";

function App() {
    const [istEingeloggt, setIstEingeloggt] = useState(false);

    return (
        <div className="App">
            <Router>
                <Authenticator setIstEingeloggt={setIstEingeloggt}/>
                {istEingeloggt && <Header/>}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Notfallbetreuung" element={<Notfallbetreuung/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/login" element={<Login istEingeloggt={istEingeloggt} setIstEingeloggt={setIstEingeloggt}/>}/>
                    <Route path="/registrieren" element={<Registrieren istEingeloggt={istEingeloggt}/>}/>
                    <Route path="/profilBearbeiten" element={<ProfilBearbeiten />}/>
                </Routes>
                {istEingeloggt && <Footer/>}
            </Router>
        </div>
    );
}

export default App;

