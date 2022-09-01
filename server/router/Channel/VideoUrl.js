const express = require('express')

const router = express.Router();

const VideoUrl = require('../../model/Channel/VideoUrl')

router.get('/getVideoFile/:id',async(req,res)=>{
    try {
        const videoFile = await VideoUrl.findOne({id : req.params['id']});
        if(videoFile){
            res.status(200).send(videoFile)
        }else{
            res.status(201).send({})
        }
    } catch (error) {
        res.status(400).send({
            message : 'video not found'
        })
    }
})

module.exports = router