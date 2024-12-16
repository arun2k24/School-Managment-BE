
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json()); 

const connectionString = process.env.DATABASE;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err);
    process.exit(1); 
  });

app.use((error, req, res, next) => {
  console.error('Error Stack:', error.stack);
  res.status(error.status || 500).json({ message: error.message });
});

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
