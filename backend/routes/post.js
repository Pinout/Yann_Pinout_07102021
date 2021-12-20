const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getPostById);

router.post('/', auth, multer, postCtrl.createPost);

router.delete('/', auth, postCtrl.deletePost);

module.exports = router;