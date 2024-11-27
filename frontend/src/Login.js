import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/login', form);
            alert('Login successful!');
            console.log('Token:', res.data.token);
        } catch (err) {
            alert(err.response.data || 'Error logging in');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
            <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};


export default Login;
