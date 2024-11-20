const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Expense Tracker API is running!');
});

mongoose
    .connect('mongodb+srv://Glady-458:28169822@exp-cluster.bv6u3.mongodb.net/?retryWrites=true&w=majority&appName=Exp-Cluster', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err));
