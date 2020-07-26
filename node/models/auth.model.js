var mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String
    },
    {
        collection: 'User'
    }
);


exports.User = mongoose.model('User', userSchema);