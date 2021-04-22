import express from "express";
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import './database';
import { router } from './routes';

const app = express();

const http = createServer(app);
const io = new Server(http);

app.use(express.json());
app.use(router);

io.on('connection', (socket: Socket) => {
  console.log('Connected', socket.id);
});

http.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}!`);
});