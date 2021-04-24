  const socket = io();

  socket.on('admin-list-all-users', (connections) => {
    document.getElementById('list_users').innerHTML = "";
    let template = document.getElementById('template').innerHTML;
    connections.forEach(connection => {
      const rendered = Mustache.render(template, {
        email: connection.user.email,
        id: connection.socketId
      });
      document.getElementById('list_users').innerHTML += rendered;
    })
  });