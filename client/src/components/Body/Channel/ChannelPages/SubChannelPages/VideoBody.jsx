import React,{useState,useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom'
import {VideoChannelContext} from '../Videos'
import VideoCard from '../Cards/VideoCard'
import VideoCardRes from '../Cards/VideoCardRes'
const VideoBody = () => {

  const { user_id, channel_id } = useParams();

  const {channelVideos, setChannelVideos} = useContext(VideoChannelContext)

  const getVideos = async() =>{
    try {
      const res = await fetch(`/getVideosByChannel/${channel_id}`, {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data = await res.json();

      console.log(data);
      setChannelVideos(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVideos();
  }, [])
  

  return (
    <div className='video_body'>
      {
        channelVideos.map((e)=>{
          return ( window.screen.width <= '600' ? <VideoCardRes data={e}/> :  <VideoCard data={e}/> )
        })
      }
    </div>
  )
}

export default VideoBody