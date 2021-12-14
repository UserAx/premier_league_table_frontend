// require('dotenv').config({path: './../config/dev.env'});
const express = require('express');
const app = express();
const cors = require('cors');

const publicDirectory = path.join(__dirname, '..', 'public');

app.use(cors());
app.use(express.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'index.html'));
});

server.listen(process.env.PORT || PORT, () => {
    console.log("server is up on");
});