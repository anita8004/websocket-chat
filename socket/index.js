const Messages = require('../models/Messages.js')
const moment = require('moment')
const url = process.env.MONGODB_URI || 'mongodb://anitali:ivon0401@ds245532.mlab.com:45532/chat';

class SocketHander{
  constructor() {
    this.db;
  }
  connect() {
    this.db = require('mongoose').connect(url)
    this.db.Promise = global.Promise
  }
  getMessages() {
    return Messages.find()
  }
  storeMessages(data){
    console.log(data)
    const newMessages = new Messages({
      name: data.name,
      msg: data.msg,
      time: moment().valueOf(),
    })
    const doc = newMessages.save()
  }
}

module.exports = SocketHander