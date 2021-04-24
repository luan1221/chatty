import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';

io.on('connect', async (socket) => {
  const connectionsService = new ConnectionsService();
  const messagesService = new MessagesService();

  const allConnectionsWithoutAdmin = await connectionsService
    .findAllWithoutAdmin();
  
  io.emit('admin-list-all-users', allConnectionsWithoutAdmin);

  socket.on('admin-list-messages-by-user', async (params, callback) => {
    const { userId } = params;
    const allMessages = await messagesService.listByUser(userId);
    callback(allMessages);
  });

  socket.on('admin-send-message', async (params) => {
    const { userId, text } = params;
    await messagesService.create({
      text,
      userId,
      adminId: socket.id
    });
    const { socketId } = await connectionsService.findByUserId(userId);
    io.to(socketId).emit('admin-send-to-client', {
      text,
      socketId: socket.id
    });
  });

  socket.on('admin-user-in-support', async params => {
    const { userId } = params;
    await connectionsService.updateAdminId(userId, socket.id);
    const allConnectionsWithoutAdmin = await connectionsService
      .findAllWithoutAdmin();
    io.emit('admin-list-all-users', allConnectionsWithoutAdmin);
  })
});