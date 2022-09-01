const mongoose = require('mongoose')

const videoUrl = new mongoose.Schema({
    id : {
        type : String,
    },
    url : {
        type : String
    }
})

const VideoUrl = mongoose.model('VIDEO URL', videoUrl)
module.exports = VideoUrl