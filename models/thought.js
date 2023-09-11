const mongoose = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new mongoose.Schema({
thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
},
createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleDateString(),
},
username: {
    type: String,
    required: true,
},
reactions: [reactionSchema], 
});

thoughtSchema.virtual('reactionCount').get(function () {
return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
