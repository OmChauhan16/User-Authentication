const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//User Model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Pre-save hook to hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;