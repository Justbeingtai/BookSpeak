const router = require('express').Router();
const { User } = require('../../models/index');

// Create new user
router.post('/', async (req, res) => {
  console.log("/API/USER", req.body);
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update user data
router.put('/:id', async (req, res) => {
  console.log("Update user by id");
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!userData[0]) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json({ message: 'User updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all users
router.get('/all', async (req, res) => {
  console.log("API for  all users", req.body);
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(200).json({ message: 'User logged out successfully.' });
    });
  } else {
    res.status(404).json({ message: 'No user session found.' });
  }
});


// delete user
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


