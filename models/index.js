const User = require('./Users');
const Chat = require('./Chats');
const Review = require('./Reviews');

// A user can have many chat messages and a chat message belongs to a user
User.hasMany(Chat, { foreignKey: 'user_id' });
Chat.belongsTo(User, { foreignKey: 'user_id' });

// A user can have many reviews and a review belongs to a user
User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { User, Chat, Review };


















