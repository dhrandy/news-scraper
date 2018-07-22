var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var NoteSchema = new Schema({
    noteTitle: String,
    noteBody: String,
});

var Note = mongoose.model("Notes", NoteSchema);
module.exports = Note;
