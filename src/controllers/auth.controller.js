const  { registerSchema } = require("../validations/auth.validation");
const authService = require("../services/auth.service");

const register = async (req, res) => {
    try{
        const data = registerSchema.parse(req.body);
        const user = await authService.register(data);

        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

const login = async (req, res) => {
    try{
        const result  = await authService.login(req.body);
        res.json(result);
    } catch (err) {
        const status = err.statusCode ?? 400;
        res.status(status).json({ error: err.message });
    }
};

module.exports = {register, login};