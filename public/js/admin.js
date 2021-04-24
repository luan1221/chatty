  const socket = io();
  let connectionsUsers = [];

  socket.on('admin-list-all-users', (connections) => {
    connectionsUsers = connections;
    document.getElementById('list_users').innerHTML = "";
    let template = document.getElementById('template').innerHTML;
    connections.forEach(connection => {
      const rendered = Mustache.render(template, {
        email: connection.user.email,
        id: connection.socketId
      });
      document.getElementById('list_users').innerHTML += rendered;
    });
  });

function call(id) {
  const connection = connectionsUsers.find(connection => connection.socketId === id);
  const template = document.getElementById('admin_template').innerHTML;
  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.userId
  });
  document.getElementById('supports').innerHTML += rendered;
}