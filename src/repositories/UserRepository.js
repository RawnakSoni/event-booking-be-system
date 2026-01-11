const User = require('../models/User');

class UserRepository {
    async findById(id) {
        return User.findById(id).select('-password');
    }

    async findByEmail(email) {
        return User.findOne({ email });
    }

    async create(userData) {
        return User.create(userData);
    }
}

module.exports = new UserRepository();
