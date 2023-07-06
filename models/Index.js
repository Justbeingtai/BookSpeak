const User = require('./Users');
const Book = require('./Books');
const Favorite = require('./Favorites');
const Chat = require('./Chats');
const Review = require('./Reviews');

// Define the table relationships
// A user can have many favorite books and a favorite book belongs to a user
User.hasMany(Favorite, { foreignKey: 'userId' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

// A book can have many users who favorited it and a favorite book belongs to a book
Book.hasMany(Favorite, { foreignKey: 'bookId' });
Favorite.belongsTo(Book, { foreignKey: 'bookId' });

// A user can have many chat messages and a chat message belongs to a user
User.hasMany(Chat, { foreignKey: 'userId' });
Chat.belongsTo(User, { foreignKey: 'userId' });

// A user can have many reviews and a review belongs to a user
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

// A book can have many reviews and a review belongs to a book
Book.hasMany(Review, { foreignKey: 'bookId' });
Review.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = { User, Book, Favorite, Chat, Review };