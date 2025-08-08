require('module-alias/register')
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');

dotenv.config();
const app = express();

app.use(express.json()); // 支援 JSON body

app.get('/', (req, res) => {
  res.send('Hello, PostgreSQL + Express!');
});

app.use('/users', userRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
