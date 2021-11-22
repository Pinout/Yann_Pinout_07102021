const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.put('/', auth, postCtrl.modifyPost);
router.post('/', auth, multer, postCtrl.createPost);
router.delete('/', auth, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPost);

module.exports = router;