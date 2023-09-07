const mongoose = require('mongoose');
const User = require('./models/user'); // Update the path to your User model
const Thought = require('./models/thought'); // Update the path to your Thought model
const ReactionSchema = require('./models/reaction'); // Update the path to your Reaction schema

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create a Mongoose model using the Reaction schema
const Reaction = mongoose.model('Reaction', ReactionSchema);

const seedData = async () => {
    try {
        await User.deleteMany();
        await Thought.deleteMany();
        // Create users, thoughts, and reactions
        const users = [
            {
                username: 'user1',
                email: 'user1@example.com',
            },
            {
                username: 'user2',
                email: 'user2@example.com',
            },
        ];

        const thoughts = [
            {
                thoughtText: 'This is a thought by user1.',
                username: 'user1',
            },
            {
                thoughtText: 'Another thought by user1.',
                username: 'user1',
            },
            {
                thoughtText: 'A thought by user2.',
                username: 'user2',
            },
        ];

        const reactions = [
            {
                reactionBody: 'Like!',
                username: 'user1',
                thoughtId: 'thought-id-here', // Replace with an actual thought ID
            },
            {
                reactionBody: 'Love it!',
                username: 'user2',
                thoughtId: 'thought-id-here', // Replace with an actual thought ID
            },
        ];

        // Save users, thoughts, and reactions
        await User.insertMany(users);
        await Thought.insertMany(thoughts);
        await Reaction.insertMany(reactions);

        console.log('Seed data created successfully.');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.disconnect();
    }
};

seedData();
