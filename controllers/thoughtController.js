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
    },
    addReaction(req, res) {
        thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
    },
    removeReaction(req, res) {
        thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.json(err));
    }
};

module.exports = thoughtController;