const User = require('../models/User');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  },
  // get user by id
  getUserById(req, res) {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  // create user
  createUser(req, res) {
    User.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  // update user by id
  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  // delete user by id
  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json({ message: 'User deleted' }))
      .catch(err => res.status(500).json(err));
  },
  // add friend
  addFriend(req, res) {
    // add friendId to userId's friend list
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
    // add userId to friendId's friend list
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  // remove friend
  removeFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  }
};

module.exports = userController;
