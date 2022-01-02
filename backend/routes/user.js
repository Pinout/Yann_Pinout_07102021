const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/:id', auth, multer, userCtrl.modifyUser);

router.get('/users', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);

module.exports = router;