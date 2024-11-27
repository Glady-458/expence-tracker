const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Email and password are required');
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User created successfully');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Email and password are required');
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid email or password');
    
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
app.get('/', (req, res) => {
    res.send('Server is running!');
});
