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

  const params = {
    userId: connection.userId
  };

  socket.emit('admin-user-in-support', params);

  document.getElementById('supports').innerHTML += rendered;
  socket.emit('admin-list-messages-by-user', params, (messages) => {
    const divMessages = document
      .getElementById(`allMessages${connection.userId}`);
    messages.forEach(message => {
      const createDiv = document.createElement('div');
      if (message.adminId === null) {
        createDiv.className = "admin_message_client";
        createDiv.innerHTML = `<span>${connection.user.email}</span>`;
        createDiv.innerHTML = `<span>${message.text}</span>`
        createDiv.innerHTML += `<span class="admin_date">${dayjs(
          message.createdAt
          ).format('DD/MM/YYYY HH:mm:ss')}</span>`;
      } else {
        createDiv.className = "admin_message_admin";
        createDiv.innerHTML = `Atendente: <span> ${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date">${dayjs(
          message.createdAt
          ).format('DD/MM/YYYY HH:mm:ss')}`;
      }
      divMessages.appendChild(createDiv);
    });
  });
}

function sendMessage(id) {
  const text = document.getElementById(`send_message_${id}`);
  const params = {
    text: text.value,
    userId: id
  }
  socket.emit('admin-send-message', params);
  const divMessages = document.getElementById(`allMessages${id}`);
  const createDiv = document.createElement('div');
  createDiv.className = "admin_message_admin";
  createDiv.innerHTML = `Atendente: <span>${params.text}</span>`;
  createDiv.innerHTML += `<span class="admin_date">${dayjs().format(
    'DD/MM/YYYY HH:mm:ss'
  )}`;
  divMessages.appendChild(createDiv);
  text.value = "";
}

socket.on('admin-receive-message', (data) => {
  const divMessages = document.getElementById(`allMessages${connection.userId}`);
  const connection = connectionsUsers.find(connection => {
    connection.socketId === data.socketId;
  });
  const createDiv = document.createElement('div');
  createDiv.className = "admin_message_client";
  createDiv.innerHTML = `<span>${connection.user.email}</span>`;
  createDiv.innerHTML = `<span>${data.message.text}</span>`
  createDiv.innerHTML += `<span class="admin_date">${dayjs(
    data.message.createdAt
  ).format('DD/MM/YYYY HH:mm:ss')}</span>`;
  divMessages.appendChild(createDiv)

});