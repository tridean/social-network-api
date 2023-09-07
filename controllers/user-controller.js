// controllers/user-controller.js

const { User } = require('../models');

const userController = {
  // Other controller functions here...

addFriend: async (req, res) => {
    try {
    const { userId, friendId } = req.params;

      // Add the friendId to the user's friends array
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { friends: friendId } },
        { new: true }
    );

      // If the user doesn't exist, return an error
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
    } catch (error) {
    res.status(500).json(error);
    }
},

removeFriend: async (req, res) => {
    try {
    const { userId, friendId } = req.params;

      // Remove the friendId from the user's friends array
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
    );

      // If the user doesn't exist, return an error
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
    } catch (error) {
    res.status(500).json(error);
    }
},
};

module.exports = userController;
