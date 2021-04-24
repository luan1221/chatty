let socketAdminId = null;
let emailUser = null;
let socket = null;

document.querySelector("#start_chat").addEventListener("click", (event) => {
  socket = io();
  
  const chatHelp = document.getElementById("chat_help");
  chatHelp.style.display = 'none';

  const chatInSupport = document.getElementById("chat_in_support");
  chatInSupport.style.display = 'block';

  const email = document.getElementById("email").value;
  emailUser = email;
  const text = document.getElementById("txt_help").value;

  socket.on('connect', () => {
    const params = {
      email,
      text
    };
    socket.emit('client-first-access', params, (callback, error) => {
      if (error) {
        console.err(error);
      } else {
        console.log(callback);
      }
    });
  });

  socket.on('client-list-all-messages', (messages) => {
    var templateClient = document.getElementById('message-user-template')
      .innerHTML;
    var templateAdmin = document.getElementById('admin-template').innerHTML;
    messages.forEach(message => {
      if (message.adminId === null) {
        const rendered = Mustache.render(templateClient, {
          message: message.text,
          email
        });
        document.getElementById('messages').innerHTML += rendered;
      } else {
        const rendered = Mustache.render(templateAdmin, {
          message_admin: message.text
        });
        document.getElementById('messages').innerHTML += rendered;
      }
    });
  });

  socket.on('admin-send-to-client', (message) => {
    socketAdminId = message.socketId;
    const templateAdmin = document.getElementById('admin-template').innerHTML;
    const rendered = Mustache.render(templateAdmin, {
      message_admin: message.text
    });
    document.getElementById('messages').innerHTML += rendered;
  });
});

document.querySelector('#send_message_button')
  .addEventListener('click', (event) => {
    const text = document.getElementById('message_user');
    const params = {
      text: text.value,
      socketAdminId
    }
    socket.emit('client-send-to-admin', params);
    const templateClient = document
      .getElementById('message-user-template').innerHTML;
    const rendered = Mustache.render(templateClient, {
      message: text.value,
      email: emailUser
    });
    document.getElementById('messages').innerHTML += rendered;
    text.value = "";
})


