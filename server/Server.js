// require('dotenv').config({path: './../config/dev.env'});
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');


const publicDirectory = path.join(__dirname, '..', 'public');

app.use(cors());
app.use(express.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log("server is up on");
});