const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const commentCtrl = require('../controllers/comment');

router.get('/', auth, commentCtrl.getAllComments);

router.post('/', auth, commentCtrl.createComment);
router.put('/:id', auth, commentCtrl.modifyComment);
router.put('/update/:id/:username', auth, commentCtrl.updateCommentsAuthor);

router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;