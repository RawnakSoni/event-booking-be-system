const authAppModule = require('../appModules/AuthAppModule');

const register = async (req, res) => {
    try {
        const result = await authAppModule.register(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const result = await authAppModule.login(req.body.email, req.body.password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = { register, login };
