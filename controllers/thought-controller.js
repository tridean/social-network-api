const { Thought, User } = require('../models');

const thoughtController = {

  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const thought = await Thought.findById(thoughtId);
      
      // If the thought doesn't exist, return an error
      if (!thought) {
        return res.status(404).json({ message: 'Thought is not found' });
      }

      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createThought: async (req, res) => {
    try {
      const { thoughtText, username } = req.body;

      // Create a new thought
      const newThought = await Thought.create({ thoughtText, username });

      // Add the new thought's _id to the associated user's thoughts array
      const updatedUser = await User.findByIdAndUpdate(
        { username },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );

      res.status(201).json(newThought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateThought: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { thoughtText } = req.body;

      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { thoughtText },
        { new: true }
      );

      // If the thought doesn't exist, return an error
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought is not found' });
      }

      res.status(200).json(updatedThought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const { thoughtId } = req.params;

      // Delete the thought
      const deletedThought = await Thought.findByIdAndDelete(thoughtId);

      // If the thought doesn't exist, return an error
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought is not found' });
      }

      // Remove the thought's _id from the associated user's thoughts array
      const username = deletedThought.username;
      await User.findByIdAndUpdate(
        { username },
        { $pull: { thoughts: thoughtId } }
      );

      res.json({ message: 'Thought was deleted' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  
  
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
