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
})