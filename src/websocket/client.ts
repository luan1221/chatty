import { io } from '../http';

io.on('connect', (socket) => {
  socket.on('client-first-access', params => {
    console.log(params);
  })
})