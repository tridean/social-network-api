const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set('debug', true);

// Set up API routes
app.use('/api/users', require('./routes/user-routes'));
app.use('/api/thoughts', require('./routes/thought-routes'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
