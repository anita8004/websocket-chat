module.exports = {
  port: 3000,
  session: {
    secret: 'chat',
    key: 'messages',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/chat'
}