const mongoose = require("mongoose")
const {Schema} = mongoose
const SentenceSchema = new Schema({
    title:{
        type: String,
        required: true
    }
} )


module.exports = mongoose.model("notes",SentenceSchema);


