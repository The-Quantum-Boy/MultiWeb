import React,{useState,useEffect,useContext} from 'react'

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';

import { AppContext } from '../../../../../App'
import { Theme } from '../../../../Theme'

import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
const PlayListCard = ({data}) => {

  const navigate = useNavigate();

    const {themeToggler} = useContext(AppContext)

    
  const goToVideo = () =>{
    navigate(`/video/${data.firstVideoId}`)
  }

  return (
    <div style={{
      backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
      // backgroundColor:'transparent',
      // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
      // boxShadow:'none',
      
      textAlign:'initial',
      color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
      borderRadius:'4px'
  }}>

    <CardActionArea>
        <div onClick={goToVideo}>

            <CardMedia
            component="img"
              height="130"
            image={data.playListImg}
            alt="green iguana"
            />
            <div className='playlist_card_info' style={{
              // color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
              color: 'white'
            }}>
                <span>{data.videoCount}</span>
                <PlaylistPlayRoundedIcon />
            </div>
        </div>
          
      </CardActionArea>
      <div style={{
        padding:'0 .5rem'
      }}>
        {data.name}
      </div>
      <Button onClick={goToVideo} style={{
        textTransform:'uppercase',
        cursor:'pointer',
        marginTop : '.2rem',
        // padding:'.2rem 0'
      }}> View full playlist</Button>
    </div>
  )
}

export default PlayListCard