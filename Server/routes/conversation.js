const router = require('express').Router();
const conversationController = require('../controllers/conversationController');

router
	.route('/')
	.get(conversationController.findAll)
	.post(conversationController.create);

router
	.route('/:id')
	.get(conversationController.findById)
	.put(conversationController.update)
	.delete(conversationController.remove);

module.exports = router;