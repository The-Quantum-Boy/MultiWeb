import React from 'react'
import { Player, PosterImage,BigPlayButton } from 'video-react';
import { CardMedia } from '@mui/material';
import "../../../../node_modules/video-react/dist/video-react.css"

const VideoPlayer = ({url}) => {
  return (
      <div className='video_player'>
          
          <Player
            playsInline
            // poster="/assets/poster.png"
            // auto
            muted
            autoPlay={true}
            src={url}
            
          >
            {/* <source autoPlay src={url} /> */}
            <BigPlayButton position="center" />
          </Player>
      </div>
  )
}

export default VideoPlayer