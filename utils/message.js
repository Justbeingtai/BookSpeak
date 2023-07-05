const moment = require('moment');
const { Chats } = require('../models');

async function messageForum(username, text, userId, room) {
  try {
    const message = await Chats.create({
      userId,
      room,
      message: text,
    });

    return {
      id: message.id,
      username,
      text,
      time: moment().format('MM/DD/YYYY h:mm'),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = messageForum;


// const moment = require('moment');

// function messageForum(username, text) {
//     return {
//         username,
//         text,
//         time: moment().format('MM/DD/YYYY h:mm')
//     };
// }

// module.exports = messageForum;