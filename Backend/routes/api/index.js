var router = require('express').Router();

router.use('/', require('./users'));
router.use('/profiles', require('./profiles'));
router.use('/chatrooms', require('./chatRooms'));
router.use('/clients', require('./clients'));
router.use('/explore', require('./explore'));

module.exports = router;
