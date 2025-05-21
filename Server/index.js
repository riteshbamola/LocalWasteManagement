const express = require('express');
const { config } = require('dotenv');
const userRoute = require('./Routes/user');
const requestRoute = require('./Routes/request');
const riderRoute = require('./Routes/admin')
const db = require('./db/db');
config();
//random commit
const app = express();
const port = process.env.PORT || 3000;

db();

app.use(express.json()); // parse JSON bodies


app.use('/api/user', userRoute);
app.use('/api/user', requestRoute);
app.use('/api/rider', riderRoute);
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
