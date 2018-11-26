const Conversation = require('../schema/conversation');
const Message = require('../schema/message');
const mongoose = require("mongoose");

// Defining all methods and business logic for routes

const findByContacts = function(req, res) {
	Conversation.findOne({ sender: req.query.sender, recipient:req.query.recipient}, function (err, conversation) {
		if( err ) return res.status(422).json(err);
		if (conversation) {
		  if (conversation.messages.length > 0) {
			//console.log('here');
			const arr = conversation.messages.map(id => new mongoose.Types.ObjectId(id));
			const q = req.query.lastReadMessageId ? { $in: arr, $gt: mongoose.Types.ObjectId(req.query.lastReadMessageId)} : { $in: arr};
			Message.find({
				'_id': q,
			}, function(err, messages) {
			  if( err ) return res.status(422).json(err);
			  let conversationWithMessages = conversation.toObject();
			  conversationWithMessages.messages = messages;
			  return res.json(conversationWithMessages);
			});
		  } else {
			return res.json({conversation});
		  }
		} else {
		  new Conversation({
			sender    : req.query.sender,
			recipient    : req.query.recipient
		  }).save( function ( err, conversation, count ){
			if( err ) return res.status(422).json(err);
			return res.json(conversation);
		  });
		}
	})
}

module.exports = {
	findAll: function(req, res) {
		if (req.query.sender && req.query.recipient) {
			return findByContacts(req, res);
		} else {
			Conversation.find(req.query)
			.then(conversations => res.json(conversations))
			.catch(err => res.status(422).json(err));
		}
	},
	findById: function(req, res) {
		Conversation.findById(req.params.id)
			.then(message => res.json(message))
			.catch(err => res.status(422).json(err));
	},
	create: function(req, res) {
		Conversation.create(req.body)
			.then(newconversation => res.json(newconversation))
			.catch(err => res.status(422).json(err));
	},
	update: function(req, res) {
		Conversation.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(conversation => res.json(conversation))
			.catch(err => res.status(422).json(err));
	},
	remove: function(req, res) {
		Conversation.findById({ _id: req.params.id })
			.then(conversation => conversation.remove())
			.then(allconversations => res.json(allconversations))
			.catch(err => res.status(422).json(err));
	},
	findByContacts
};