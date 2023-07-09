const User = require('./Users');
const Chat = require('./Chats');
const Review = require('./Reviews');

// Define the table relationships
// A user can have many chat messages and a chat message belongs to a user
User.hasMany(Chat, { foreignKey: 'userId' });
Chat.belongsTo(User, { foreignKey: 'userId' });

// A user can have many reviews and a review belongs to a user
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Chat, Review };


















