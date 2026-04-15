const {
  addComment: addCommentToDb,
  getComments: getCommentsFromDb,
  likeComment: likeCommentInDb,
  deleteComment: deleteCommentFromDb,
} = require('../services/commentService');
const { getRepoById } = require('../services/repoService');

/**
 * POST /api/repo/:id/comment
 * Add a comment to a repository
 */
const addComment = async (req, res, next) => {
  try {
    const { username, comment, parentId } = req.body;

    if (!username?.trim()) return res.status(400).json({ error: 'Username is required' });
    if (!comment?.trim()) return res.status(400).json({ error: 'Comment text is required' });

    const repo = await getRepoById(req.params.id);
    if (!repo) return res.status(404).json({ error: 'Repository not found' });

    const newComment = await addCommentToDb(req.params.id, {
      username: username.trim(),
      comment: comment.trim(),
      parentId: parentId || null,
    });

    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/repo/:id/comments
 * Get all comments for a repo (supports ?sort=newest|liked)
 */
const getComments = async (req, res, next) => {
  try {
    const { sort = 'newest' } = req.query;
    const sortOption = sort === 'liked' ? 'liked' : 'newest';

    const result = await getCommentsFromDb(req.params.id, sortOption);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/comment/:id/like
 * Increment like count on a comment
 */
const likeComment = async (req, res, next) => {
  try {
    const result = await likeCommentInDb(req.params.id);
    if (!result) return res.status(404).json({ error: 'Comment not found' });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/comment/:id
 * Delete a comment (and its replies)
 */
const deleteComment = async (req, res, next) => {
  try {
    await deleteCommentFromDb(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { addComment, getComments, likeComment, deleteComment };
