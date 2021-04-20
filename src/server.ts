import express from "express";

import './database';

const app = express();

app.get('/', (req, res) => {
  return res.json({message: "hello"});
});



app.listen(3123, () => {
  console.log('Server running on port 3123!');
});