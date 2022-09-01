import React,{useContext,useEffect,useState} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import img from "../../../images/assets/code.jpg"
import TemporaryDrawer from './CreateBlog'


import { AppContext } from '../../../App'
import { BlogContext } from './Blog'
import { Theme } from '../../Theme';
import BasicMenu from './BasicMenu';

import { Button } from '@mui/material';

import { RWebShare } from "react-web-share";

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({blog,setBlogs,wdt=false,isShare = false}) {


  const [expanded, setExpanded] = React.useState(false);

  const {themeToggler,rootUser,setToggle,setIsEdit,setBlogData} = useContext(AppContext)

  const [isLike, setIsLike] = React.useState(false)

  const [img, setImg] = useState('')

  const [likes, setLikes] = useState(blog.likeCount)

  const [userMeatData, setUserMeatData] = useState({
    name: '',
    profession : '' 
  })

  const navigate = useNavigate()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const makeLike = async() =>{
    try {
      
    if(!isLike){
      setLikes(likes+1)
      setIsLike(!isLike);
      const res = await fetch(`/addLike/${blog._id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const res2 = await fetch('/addLikeBlog',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          userId : rootUser._id,
          blogId : blog._id
        })
      })

      if(res.status === 400) return;
    }else{
      setLikes(likes-1)
      setIsLike(!isLike);
      const res = await fetch(`/subLike/${blog._id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const res2 = await fetch('/subLikeBlog',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          userId : rootUser._id,
          blogId : blog._id
        })
      })

      if(res.status === 400) return;
    }
    
  } catch (error) {
     console.log(error); 
  }
    
  }

  const go = () =>{
    navigate(`/profile/${blog.userId}`)
  }

  const deleteBlog = async() => {

    console.log(blog._id);

    try {

      const res = await fetch(`/deleteBlog/${blog._id}`,{
        method:'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const res2 = await fetch(`/decAllFieldGraph/${0}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      console.log(res);

      if(res.status === 200){

        toast.success('blog deleted')

        setBlogs((pre)=>{
          return pre.filter((e)=>{
            return e._id !== blog._id
          });
        })
      }else{
        toast.error('blog not deleted')
      }

     
    } catch (error) {
      console.log(error);
    }

    
  }


  const editBlog = () =>{
    console.log(blog);
    setToggle(true);
    setIsEdit(true);
    setBlogData({
        id : blog._id,
        headerTitle : blog.headerTitle,
        file : blog.file,
        description : blog.description,
        likeCount : blog.likeCount
    })
    console.log('under edit');
  }

  

  const getImage = async() =>{
    try {

      const res = await fetch(`/getLikeArray/${rootUser._id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const list = await res.json();
      console.log(list);
      if(list.find(element => element === blog._id) !== undefined){
        setIsLike(true);
      }

      const res2 = await fetch(`/getListUser/${blog.userId}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data2 = await res2.json();
      setUserMeatData(data2)
      
      const res3 = await fetch(`/getImg/${blog.userId}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data3 = await res3.json();
      setImg(data3.img)


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getImage();

  }, [])
  

  return (
    <Card 
          sx={ wdt ? {} : { maxWidth: 345 }}
    style={{
      backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
      color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
      boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
      border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
      marginBottom : '1rem'
    }}>
      
      <CardHeader
        avatar={
          <Avatar src={img} onClick={go} style={{
          cursor:'pointer'
        }}/>
        }
        action={
          blog.userId === rootUser._id && !isShare ?
          <BasicMenu deleteBlog={deleteBlog} editBlog={editBlog}/> : null
          // <Button variant='contained'  size='small' > follow </Button>
        }
        title={userMeatData.name}
        subheader={
          <span style={{color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor}}>{userMeatData.profession}</span>
        }
        
        
      />
      <CardMedia
        component={ blog.file.includes("video") ? 'video' : 'img'}
        src={blog.file}
        controls
      />
      <CardContent>
        <p >likes : {likes}</p>  
        {/* <Typography variant="body2" color={col}> */}
          {
            blog.headerTitle.split("\n").map((e) => {
                if (e === "") return ``;
                return <div> {e} </div>;
              })
          }
        {/* </Typography> */}
        
        
      </CardContent>
      <CardActions disableSpacing>
      
        <IconButton aria-label="add to favorites" style={{
            color :  isLike ? '#f50057' : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
            
          }}
          onClick={makeLike}
        >
          <FavoriteIcon />
        </IconButton>
        
        <RWebShare
          data={{
            text: "check out this amazing post",
            url: `${window.location.origin}/post/${blog._id}`,
            title: "Code++",
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <IconButton aria-label="share" style={{
              color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
            }}>
            <ShareIcon />
          </IconButton>
        </RWebShare>
        {
          blog.description === '' ? null :
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={{
            color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
          }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
        }
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {
          blog.description.split("\n").map((e) => {
            if (e === "") return ``;
            return <div> {e} </div>;
          })
        }
        </CardContent>
      </Collapse>
    </Card>
  );
}


