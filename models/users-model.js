let users = [];

module.exports = {
    getAllUsers: () => users,
    addUser: (user) => users.push(user),
    findUserByUsername: (username) => users.find(user => user.username === username)
};
