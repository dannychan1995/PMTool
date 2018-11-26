const Message = require('../schema/message');
const Conversation = require('../schema/conversation');

// Defining all methods and business logic for routes

module.exports = {
	findAll: function(req, res) {
		Message.find(req.query)
			.then(messages => res.json(message))
			.catch(err => res.status(422).json(err));
	},
	findById: function(req, res) {
		Message.findById(req.params.id)
			.then(message => res.json(message))
			.catch(err => res.status(422).json(err));
	},
	create: function(req, res) {
		console.log('req', req.body);
		Message.create(req.body)
			.then(newmessage => {
				Conversation.findById(req.body.conversationId)
				.then(conversation=>{
					if (!conversation) {
						return {};
					}
					conversation.messages.push(newmessage);
					conversation.save()
						.then(() => res.json(newmessage))
						.catch(err => res.status(422).json(err));
				})
			.catch(err => res.status(422).json(err));
			})
			.catch(err => res.status(422).json(err));
	},
	update: function(req, res) {
		Message.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(message => res.json(message))
			.catch(err => res.status(422).json(err));
	},
	remove: function(req, res) {
		Message.findById({ _id: req.params.id })
			.then(message => message.remove())
			.then(allmessages => res.json(allmessages))
			.catch(err => res.status(422).json(err));
	}
};