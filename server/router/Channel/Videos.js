const express = require('express')

const router = express.Router();

const Videos = require('../../model/Channel/Videos')
const PlayList = require('../../model/Channel/Play_list');
const VideoUrl = require('../../model/Channel/VideoUrl')
const Search = require('../../model/Search/Search')
const VideoWatch = require('../../model/Channel/VideoWatch')
const { route } = require('./Channel');

router.post('/createVideo', async(req,res)=>{
    const {
        channel_id,
        playlist_id,
        userId,
        file,
        headerTitle,
        description,
        thumbnail,
        langType,
    } = req.body;

    try {
        const video = new Videos({
            channel_id,
            playlist_id,
            userId,
            thumbnail,
            headerTitle,
            description,
            langType,
            createAt : new Date()
        })

        await video.save();

        const videoView = new VideoWatch({id : video._id});
        await videoView.save();
        
        const search = new Search({
            id : video._id,
            title : headerTitle,
            user_id : userId,
            tag : 'video'
        })
        await search.save();

        const videoUrl = new VideoUrl({id : video._id,url : file})
        await videoUrl.save();
        if(playlist_id !== ''){
            const playlist = await PlayList.findOne({_id : playlist_id})
            const add = await playlist.addVideo(video._id)
        }

        res.status(200).send(video)

    } catch (error) {
        res.status(400).send({
            message : 'video not added'
        })
    }
})

router.get('/getVideoById/:id', async(req,res)=>{
    try {
        const data = await Videos.findOne({_id : req.params['id']})
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'video not found'
        })
    }
})

router.get('/getVideosByField/:field', async(req,res)=>{
    try {
        const data = await Videos.find({field : req.params['field']})
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'data not found'
        })
    }
})

router.get('/getVideosByLang/:lang', async(req,res)=>{
    try {
        const data = await Videos.find({langType : req.params['lang']})
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'data not found'
        })
    }
})

router.get('/getVideosByChannel/:id',async(req,res)=>{
    try {
        const data = await Videos.find({channel_id : req.params['id']})
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'data not found'
        }) 
    }
})

module.exports = router
