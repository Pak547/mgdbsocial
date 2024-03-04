const User = require('../models/User');

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  },

  getUserById(req, res) {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json({ message: 'User deleted' }))
      .catch(err => res.status(500).json(err));
  },

  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  
};

module.exports = userController;
