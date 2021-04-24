import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on('client-first-access', async (params) => {
    const socketId = socket.id;
    const { text, email } = params as IParams;
    let userId = null;
    
    const userExists = await usersService.findByEmail(email);
    if(!userExists) {
      const user = await usersService.create(email);
      await connectionsService.create({
        socketId,
        userId: user.id
      });
      userId = user.id;
    } else {
      userId = userExists.id;
      const connection = await connectionsService.findByUserId(userExists.id);
      if (!connection) {
        await connectionsService.create({
          socketId,
          userId: userExists.id
        });
      } else {
        connection.socketId = socketId;
        await connectionsService.create(connection);
      }
    }
    await messagesService.create({
      text,
      userId
    });
    
    const allMessages = await messagesService.listByUser(userId);

    socket.emit('client-list-all-messages', allMessages);
    
    const allUsers = await connectionsService.findAllWithoutAdmin();
    io.emit('admin-list-all-users', allUsers);
  });
  socket.on('client-send-to-admin', async params => {
    const { text, socketAdminId } = params;
    const { userId } = await connectionsService.findBySocketId(socket.id); 
    const message = await messagesService.create({
      text,
      userId 
    });
    io.to(socketAdminId).emit('admin-receive-message', {
      message,
      socketId: socket.id
    })
  })
})