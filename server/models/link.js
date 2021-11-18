const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const linkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        max:256
    },
    url: {
        type: String,
        required: true,
        trim: true,
        max:256
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,
        index: true
    },
    postedBy:{
        type: ObjectId,
        ref: 'User'
    },
    categories:[{
        type: ObjectId,
        ref: 'Category',
        required: true
    }],
    type: {
        type: String,
        default:'free'
    },
    medium: {
        type: String,
        default:'Video'
    },
    clicks:{
        type: Number,
        default:0
    }
},{timestamps:true});


module.exports = mongoose.model('Link', linkSchema);