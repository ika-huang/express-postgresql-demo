const createComment = require('@controllers/comments/create-comment/app');
const createFakeComment = require('@controllers/comments/create-fake-comment/app');
const listCommentByPost = require('@controllers/comments/list-comment-by-post/app');
const listCommentByUser = require('@controllers/comments/list-comment-by-user/app');
const deleteComment = require('@controllers/comments/delete-comment/app');
const updateComment = require('@controllers/comments/update-comment/app');

module.exports = {
  createComment,
  createFakeComment,
  listCommentByPost,
  listCommentByUser,
  deleteComment,
  updateComment
}
