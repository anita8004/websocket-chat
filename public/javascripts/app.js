socket = io.connect('ws://websocket-chat.cleverapps.io');
document.querySelector('button').addEventListener('click', () => {
  Send();
});

function Send() {
  let name = document.querySelector('#name').value
  let msg = document.querySelector('#msg').value
  if (!name && !msg) {
    alert('請輸入大名和訊息')
    reyurn;
  }
  let data = {
    name: name,
    msg: msg,
  }
  socket.emit('message', data)
  document.querySelector('#msg').value = ''
}

function appendData(obj){
  let el = document.querySelector('.chats')
  let html = el.innerHTML
  obj.forEach(element => {
    html += `<div class="chat">
                <div class="group">
                    <div class="name">${element.name}：</div>
                    <div class="msg">${element.msg}</div>
                </div>
                <div class="time">${moment(element.time).fromNow()}</div>
            </div>`
    el.innerHTML = html.trim()
    scrollWindow()
  })
}

socket.on('message', (obj) => {
  console.log(obj)
  appendData([obj])
})

socket.on('history', (obj) => {
  if (obj.length > 0) {
    appendData(obj)
  }
})

function scrollWindow() {
  let chat = document.querySelector('.chats')
  chat.scrollTo(0, chat.scrollHeight)
}
