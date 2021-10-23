const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        max:32
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        index: true
    },
    image: {
        url: String,
        key:String
    },
    content:{
        type:{},
        min:20,
        max:200000
    },
    postedBy:{
        type: ObjectId,
        ref: 'User'
    }
},{timestamps:true});


module.exports = mongoose.model('Category', categorySchema);