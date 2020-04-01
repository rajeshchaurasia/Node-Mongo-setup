const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
     img: {contentType: String , name: String, size: String}
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);