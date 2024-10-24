import React,{useState,useEffect,useContext} from 'react'
import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';

import { CardMedia, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../Shared/Functions';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'initial',
  // color: theme.palette.text.secondary,
  border : 'none',
  boxShadow : 'none',
}));
const Playlist_card = ({data}) => {

    const {themeToggler} = useContext(AppContext)
    
  const navigate = useNavigate();
  
  const goToVideo = () =>{
    navigate(`/video/${data._id}`)
  }

  const [channel, setChannel] = useState({})

  
  const [views, setViews] = useState(0)

  const getViews = async() =>{
    try {
      const res3 = await fetch(`/getView/${data._id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const viewData = await res3.json();
      setViews(viewData.videosCount)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getViews();
  }, [])
  

  const getChannel = async() => {
    try {
      const res = await fetch(`/getChannel/${data.channel_id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const Data = await res.json();
      setChannel(Data)
      

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getChannel();
  }, [])
  
  

  return (
    <div className='playlist_card_container'>
        {/* <Box sx={{ flexGrow: 1 }} > */}
          <Grid container wrap={'nowrap'} spacing={1} >
            <Grid item  xs={5} className='point'>
              <Item>
                <img onClick={goToVideo} src={data.thumbnail} alt="" srcset=""  style={{
                  width:'100%',
                  height : '100%'
                }}/>
              </Item>
            </Grid>
            <Grid item xs={7}>
              <Item>
              <div className='video_card_info'>
                <div className='point' onClick={goToVideo} style={{
                  display:'flex',
                  flexDirection:'column',
                  justifyContent:'space-between',
                  fontSize:'12px'
                }}>
                  <h6 style={{
                    color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                    fontSize:'13px'
                  }} >{data.headerTitle.length > 20 ? data.headerTitle.slice(0, 20) + '...' : data.headerTitle }</h6>
                  <span style={{
                    color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                  }} >{channel.name}</span>
                  <span style={{
                    color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                    }}>{views}{" "} views  | {" "}{formatDate(data.createAt)}</span>
                </div>
                <div>

                <IconButton style={{
                    color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                  }}>
                  <MoreVertIcon />
                </IconButton>
                </div>
              </div>
              </Item>
            </Grid>
            
          </Grid>
        {/* </Box> */}

    </div>
  )
}

export default Playlist_card