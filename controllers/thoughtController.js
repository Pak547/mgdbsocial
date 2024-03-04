const thought = require('../models/Thought');

const thoughtController = {
    getAllThoughts(req, res) {
        thought.find({})
            .then(thoughts => res.json(thoughts))
            .catch(err => res.status(500).json(err));
    },

    getThoughtById(req, res) {
        thought.findById(req.params.id)
            .then(thought => res.json(thought))
            .catch(err => res.status(500).json(err));
    },

    createThought(req, res) {
        thought.create(req.body)
            .then(thought => res.json(thought))
            .catch(err => res.status(500).json(err));
    },

    updateThought(req, res) {
        thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(thought => res.json(thought))
            .catch(err => res.status(500).json(err));
    },

    deleteThought(req, res) {
        thought.findByIdAndDelete(req.params.id)
            .then(() => res.json({ message: 'Thought deleted' }))
            .catch(err => res.status(500).json(err));
    }
};

module.exports = thoughtController;