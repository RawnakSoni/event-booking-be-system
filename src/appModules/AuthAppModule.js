const userModule = require('../modules/UserModule');
const jwt = require('jsonwebtoken');

class AuthAppModule {
    async register(userData) {
        const user = await userModule.registerUser(userData);
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: this.generateToken(user._id)
        };
    }

    async login(email, password) {
        const user = await userModule.validateUserCredentials(email, password);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: this.generateToken(user._id)
        };
    }

    generateToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    }
}

module.exports = new AuthAppModule();
