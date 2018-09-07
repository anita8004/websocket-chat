const Messages = require('../models/Messages.js')
const moment = require('moment')
const uri = process.env.MONGODB_ADDON_URI || 'mongodb://u9jm2cn1hskxsp0:LFg1Hwzr6nDvqlSfQP4H@b3b9aoeakowtlea-mongodb.services.clever-cloud.com:27017/b3b9aoeakowtlea'

class SocketHander{
  constructor() {
    this.db;
  }
  connect() {
    this.db = require('mongoose').connect(uri)
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