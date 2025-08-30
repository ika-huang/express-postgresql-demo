const listPost = require('@controllers/posts/list-post/app');
const listPostByUser = require('@controllers/posts/list-post-by-user/app')
const getPost = require('@controllers/posts/get-post/app');
const createPost = require('@controllers/posts/create-post/app');
const createFakePost = require('@controllers/posts/craete-fake-post/app');
const updatePost = require('@controllers/posts/update-post/app');
const deletePost = require('@controllers/posts/delete-post/app');

module.exports = {
  listPost,
  listPostByUser,
  getPost,
  createPost,
  createFakePost,
  updatePost,
  deletePost
}