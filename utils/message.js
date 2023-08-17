const moment = require('moment');
const { Chat } = require('../models');



async function messageFormat(username, text,) {
  try {
    return {
      // id: message.id,
      username,
      text,
      time: moment().format('MM/DD/YYYY h:mm'),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function saveMessage(userId, message) {
  try {
      await Chat.create({
    userId,
    message
  });
} catch (error) {
console.log(error);
}
}

module.exports = { messageFormat, saveMessage };