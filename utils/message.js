const moment = require('moment');
const { Chat } = require('../models');



async function messageFormat(username, text,) {
  try {
    // const message = await Chat.create({userId
    //   userId:1,
    //   message: text,
    // });

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

module.exports = messageFormat;


// const moment = require('moment');

// function messageForum(username, text) {
//     return {
//         username,
//         text,
//         time: moment().format('MM/DD/YYYY h:mm')
//     };
// }

// module.exports = messageForum;