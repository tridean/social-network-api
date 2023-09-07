// controllers/thought-controller.js

const { Thought, User } = require('../models');

const thoughtController = {
  // Other controller functions here...

createReaction: async (req, res) => {
    try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    const newReaction = await Thought.createReaction({
        reactionBody,
        username,
    });

      // Add the new reaction to the thought's reactions array
    const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: newReaction } },
        { new: true }
    );

    res.status(201).json(updatedThought);
    } catch (error) {
    res.status(500).json(error);
    }
},

deleteReaction: async (req, res) => {
    try {
    const { thoughtId, reactionId } = req.params;

      // Delete the reaction from the thought
    const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
    );

      // If the thought doesn't exist, return an error
    if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(updatedThought);
    } catch (error) {
    res.status(500).json(error);
    }
},
};

module.exports = thoughtController;
