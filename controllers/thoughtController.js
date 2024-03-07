const thought = require('../models/Thought');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        thought.find({})
            .then(thoughts => res.json(thoughts))
            .catch(err => res.status(500).json(err));
    },
    // get thought by id
    getThoughtById(req, res) {
        thought.findById(req.params.id)
            .then(thought => res.json(thought))
            .catch(err => res.status(500).json(err));
    },
    // create thought
    createThought(req, res) {
        thought.create(req.body)
            .then(thought => res.json(thought))
            .catch(err => res.status(500).json(err));
    },
    // update thought by id
    updateThought(req, res) {
        thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(thought => res.json(thought))
            .catch(err => res.status(500).json(err));
    },
    // delete thought by id
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
    // remove reaction
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