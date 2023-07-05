const router = require('express').Router();
const { Chat, User } = require('../../models/Chats');

// Get chat history for a specific room
router.get('/:room', async (req, res) => {
  try {
    const chatData = await Chat.findAll({
      where: { room: req.params.room },
      include: { model: User, attributes: ['username'] },
    });
    res.status(200).json(chatData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:room/users', async (req, res) => {
    try {
      const onlineUsers = await User.findAll({
        where: { room: req.params.room, online: true },
        attributes: ['username'],
      });
      res.status(200).json(onlineUsers);
    } catch (err) {
      res.status(400).json(err);
    }
  });


module.exports = router;
