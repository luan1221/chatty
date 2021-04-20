import express from "express";
import { router } from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(router);

app.listen(3123, () => {
  console.log('Server running on port 3123!');
});