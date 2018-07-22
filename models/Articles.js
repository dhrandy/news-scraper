var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
    
    headlines: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    // excerpt: {
    //     type: String,
    //     require: true
    // },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Notes"
    }
});

var Articles = mongoose.model("Articles", ArticleSchema);

module.exports = Articles;
