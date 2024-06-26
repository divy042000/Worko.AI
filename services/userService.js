const userDao = require('../daos/userDao');
const UserDTO = require('../dtos/userDto');

const createUser = async (userData) => {
    const user = await userDao.createUser(userData);
    return new UserDTO(user);
};

const getUserById = async (id) => {
    const user = await userDao.getUserById(id);
    return new UserDTO(user);
};

const getAllUsers = async () => {
    const users = await userDao.getAllUsers();
    return users.map(user => new UserDTO(user));
};

const updateUser = async (id, userData) => {
    const user = await userDao.updateUser(id, userData);
    return new UserDTO(user);
};

const deleteUser = async (id) => {
    await userDao.deleteUser(id);
    return { message: 'User soft deleted' };
};

module.exports = { createUser, getUserById, getAllUsers, updateUser, deleteUser };
