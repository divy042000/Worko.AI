const userService = require('../services/userService');
const { userSchema } = require('../validators/userValidator');

const createUser = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await userService.createUser(req.body);
    res.status(201).send(user);
};

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    res.send(user);
};

const getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    res.send(users);
};

const updateUser = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await userService.updateUser(req.params.userId, req.body);
    res.send(user);
};

const deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.userId);
    res.send({ message: 'User soft deleted' });
};

module.exports = { createUser, getUserById, getAllUsers, updateUser, deleteUser };
