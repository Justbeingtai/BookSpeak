CREATE DATABASE bookReview_db;

USE bookReview_db;

-- Create the Users table to store user information
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Create the Books table to store book information
CREATE TABLE Books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  googleBookId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  description TEXT,
);

-- Create the Favorites table to store user's favorite books
CREATE TABLE Favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  bookId INT,
  FOREIGN KEY (userId) REFERENCES Users(id),
  FOREIGN KEY (bookId) REFERENCES Books(id)
);

-- Create the Chats table to store live chat messages about a book
CREATE TABLE Chats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  bookId INT,
  message TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id),
  FOREIGN KEY (bookId) REFERENCES Books(id)
);
