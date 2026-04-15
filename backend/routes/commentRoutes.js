const express = require('express');
const router = express.Router();
const { addComment, getComments, likeComment, deleteComment } = require('../controllers/commentController');

router.post('/repo/:id/comment', addComment);
router.get('/repo/:id/comments', getComments);
router.put('/comment/:id/like', likeComment);
router.delete('/comment/:id', deleteComment);

module.exports = router;
