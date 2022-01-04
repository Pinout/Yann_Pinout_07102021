const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const commentCtrl = require('../controllers/comment');

router.get('/', auth, commentCtrl.getAllComments);

router.post('/', auth, commentCtrl.createComment);
router.put('/:id', auth, commentCtrl.modifyComment);

router.delete('/:id', auth, commentCtrl.deleteComment);
router.delete('/:id', auth, commentCtrl.deleteComments);

module.exports = router;