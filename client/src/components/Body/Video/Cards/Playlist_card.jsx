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
import { useParams } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'initial',
  // color: theme.palette.text.secondary,
  border : 'none',
  boxShadow : 'none',
}));
const Playlist_card = ({data,index}) => {

    const {themeToggler} = useContext(AppContext)
    
  const navigate = useNavigate();

  const {id} = useParams()
  
  const goToVideo = () =>{
    navigate(`/video/${data._id}`)
  }

  const [channel, setChannel] = useState({})

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
    <div className='playlist_card_container' style={{
      backgroundColor : id === data._id ? ( themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor ) : 'transparent'
    }}>
        {/* <Box sx={{ flexGrow: 1 }} > */}
          <Grid container wrap={'nowrap'} spacing={1} >
            <Grid item  xs={4} className='point'>
                <div style={{
                  display:'flex',

                }}>
                <Item style={{
                  marginRight:'.3rem',
                  color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                }}>

                <div> {index} </div>
                </Item>
              <Item>

                <img onClick={goToVideo} src={data.thumbnail} alt="" srcset=""  style={{
                  width:'100%',
                  height : '100%'
                }}/>
              </Item>
                </div>
            </Grid>
            <Grid item xs={8}>
              <Item>
              <div className='video_card_info'>
                <div className='point' onClick={goToVideo} style={{
                  display:'flex',
                  flexDirection:'column',
                  justifyContent:'space-between',
                  fontSize:'12px'
                }}>
                  <div style={{
                    color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
                  }} >{data.headerTitle.length > 20 ? data.headerTitle.slice(0, 20) + '...' : data.headerTitle }</div>
                  <span style={{
                    color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                  }} >{channel.name}</span>
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