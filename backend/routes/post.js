const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getPostsByAuthorId);

router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.put('/update/:id/:username', auth, postCtrl.updatePostsAuthor);

router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;