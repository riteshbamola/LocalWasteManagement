const express = require('express');
const { config } = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require('./Routes/user');
const requestRoute = require('./Routes/request');
const riderRoute = require('./Routes/admin')
const db = require('./db/db');
config();

const app = express();
const port = process.env.PORT || 3000;

db();
app.use(cors({
  origin: 'http://localhost:5173', // frontend
  credentials: true
}));
app.use(express.json());
// app.use(cookieParser());
app.use('/api/user', userRoute);
app.use('/api/user', requestRoute);
app.use('/api/rider', riderRoute);
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
