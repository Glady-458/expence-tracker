import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction'


const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    {/* Navigation Links */}
                    <a href="/pages/login">Login</a> | 
                    <a href="/pages/Register">Register</a> | 
                    <a href="/pages/Dashboard">Dashboard</a>
                    <a href="/pages/AddTransaction">AddTransaction</a>
                </nav>

                {/* Route Definitions */}
                <Routes>
                    <Route path="/pages/login" element={<Login />} />
                    <Route path="/pages/Register" element={<Register />} />
                    <Route path="/pages/Dashboard" element={<Dashboard />} />
                    <Route path="/pages/AddTransaction" element={<AddTransaction />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
