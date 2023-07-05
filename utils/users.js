const { Users } = require('../models');

// Join chat
function joinChat(id, username, room) {
  return Users.create({
    id,
    username: username || 'Default User',
    room: room || 'Default Chatroom',
  });
}

// Get current user
function currentUser(id) {
  return Users.findByPk(id);
}

// User leaves chat
function userLeaves(id) {
  return Users.destroy({ where: { id } });
}

// Get users in a chat room
function chatRoom(room) {
  return Users.findAll({ where: { room } });
}

// Get online users in the chat room
function getOnlineUsers(room) {
  return Users.findAll({
    where: {
      room,
      online: true, 
    },
  });
}


module.exports = {
  joinChat,
  currentUser,
  userLeaves,
  chatRoom,
  getOnlineUsers
};
