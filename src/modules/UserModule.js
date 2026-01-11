const userRepository = require('../repositories/UserRepository');

class UserModule {
    async registerUser(userData) {
        const userExists = await userRepository.findByEmail(userData.email);
        if (userExists) {
            throw new Error('User already exists');
        }
        return userRepository.create(userData);
    }

    async validateUserCredentials(email, password) {
        const user = await userRepository.findByEmail(email);
        if (user && (await user.comparePassword(password))) {
            return user;
        }
        return null;
    }

    async getUserById(id) {
        return userRepository.findById(id);
    }
}

module.exports = new UserModule();
