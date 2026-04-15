const express = require('express');
const router = express.Router();
const { addRepo, getRepos, getRepoById, deleteRepo } = require('../controllers/repoController');

router.post('/repo', addRepo);
router.get('/repos', getRepos);
router.get('/repo/:id', getRepoById);
router.delete('/repo/:id', deleteRepo);

module.exports = router;
