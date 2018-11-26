const Projects = require('../schema/projects');

// Defining all methods and business logic for routes

module.exports = {
	findAll: function(req, res) {
		Projects.find(req.query)
			.then(i => res.json(i))
			.catch(err => res.status(422).json(err));
	},
	findById: function(req, res) {
		Projects.findById(req.params.id)
			.then(i => res.json(i))
			.catch(err => res.status(422).json(err));
	},
	create: function(req, res) {
		console.log(req);
		Projects.create(req.body)
			.then(newI=> res.json(newI))
			.catch(err => res.status(422).json(err));
	},
	update: function(req, res) {
		Projects.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(i => res.json(i))
			.catch(err => res.status(422).json(err));
	},
	remove: function(req, res) {
		Projects.findById({ _id: req.params.id })
			.then(i => i.remove())
			.then(all => res.json(all))
			.catch(err => res.status(422).json(err));
	}
};