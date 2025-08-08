const listUser = require('@controllers/users/list-user/app');
const createUser = require('@controllers/users/create-user/app');
const getUser = require('@controllers/users/get-user/app');
const updateUser = require('@controllers/users/update-user/app');
const deleteUser = require('@controllers/users/delete-user/app');
const createFakeUser = require('@controllers/users/create-fake-user/app')

module.exports = {
  listUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  createFakeUser
}