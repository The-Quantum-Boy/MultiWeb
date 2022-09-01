const express = require('express')

const router = express.Router();

const Blog = require('../../model/Blog/Blog')
const Search = require('../../model/Search/Search')

router.post('/createBlog',async(req,res)=>{
    const {
        headerTitle,
        file ,
        description ,
        userId ,
        likeCount 
    } = req.body
    try {
        const data = new Blog({
            headerTitle,
            file ,
            description ,
            userId ,
            likeCount 
        })
        await data.save();

        const search = new Search({
            id : data._id,
            title : headerTitle,
            tag : 'blog',
            user_id : userId
        })

        await search.save();
        
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'channel not created'
        })
    }
})



router.get('/getBlogs',async(req,res)=>{
    try {
        const data = await Blog.find();
        if(data){
            res.status(200).send(data)
        }else{
            res.send([])
        }
    } catch (error) {
        res.status(400).send({'message' : 'data not found'})
    }
})

router.get('/getBlog/:id',async(req,res)=>{
    try {
        const data = await Blog.findOne({_id:req.params['id']});
        if(data){
            res.status(200).send(data)
        }else{
            res.send({})
        }
    } catch (error) {
        res.status(400).send({'message' : 'data not found'})
    }
})

router.get('/userBlogs/:id', async(req,res)=>{
    try {
        const data = await Blog.find({userId:req.params['id']});
        if(data){
            res.status(200).send(data)
        }else{
            res.send([])
        }
    } catch (error) {
        res.status(400).send({'message' : 'data not found'})
    }
})

router.get('/deleteBlog/:id', async(req,res)=>{
    try {
        const data = await Blog.deleteOne({_id:req.params['id']});
        const search = await Search.deleteOne({id : req.params['id']})
        res.status(200).send({
            message : 'delete'
        })
    } catch (error) {
        res.status(400).send({'message' : 'data not found'})
    }
})

router.post('/updateBlog', async(req,res)=>{
    const {id,headerTitle, file, description } = req.body;
    try {
        const data = await Blog.updateOne({_id:id},{
            $set : {
                headerTitle : headerTitle,
                file : file,
                description : description
            }
        });

        const search = await Search.updateOne({id:id},{
            $set : {
                title : headerTitle
            }
        })

        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({'message' : 'not updated'})
    }
} )

router.get('/addLike/:id',async(req,res)=>{
    try {
        const blog = await Blog.findOne({_id : req.params['id']})
        const like = await blog.addLike();
        res.status(200).send({
            message : 'like added'
        })
    } catch (error) {
        res.status(400).send({'message' : 'not updated'})
    }
})

router.get('/subLike/:id',async(req,res)=>{
    try {
        const blog = await Blog.findOne({_id : req.params['id']})
        const like = await blog.subLike();
        res.status(200).send({
            message : 'like subtracted'
        })
    } catch (error) {
        res.status(400).send({'message' : 'not updated'})
    }
})


module.exports = router;