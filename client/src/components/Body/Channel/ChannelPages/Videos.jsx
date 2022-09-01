import React,{useState,useEffect,useContext,createContext} from 'react'
import { AppContext } from '../../../../App'

import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';

import UploadVideos from './SubChannelPages/UploadVideos'
import VideoBody from './SubChannelPages/VideoBody';

export const VideoChannelContext = createContext();
const Videos = () => {

  const {rootUser} = useContext(AppContext)

  const {user_id,channel_id} = useParams();

  const [openVideoDialog,setOpenVideoDialog] = useState(false)
  const [channelVideos, setChannelVideos] = useState([])

  const [playLists, setPlayLists] = useState([])
  
  const getPlayLists = async() =>{
    try {
      const res = await fetch(`/getPlayLists/${channel_id}`,{
        method : 'GET',
        headers : {
          'Content-Type'  : 'application/json'
        }
      })

      const data = await res.json();
      console.log(data);
      setPlayLists(data)

    } catch (error) {
      
    }
  }

  useEffect(() => {

    getPlayLists()
  
  }, [])
  

  return (
    <VideoChannelContext.Provider value={{
      openVideoDialog,
      setOpenVideoDialog,
      setChannelVideos,
      channelVideos,
      playLists,
      setPlayLists
    }}>
      <UploadVideos />
      {
        user_id === rootUser._id ? <div className='create_channel_button'>
          <Button variant="contained" onClick={()=>setOpenVideoDialog(true)} > <VideoCallRoundedIcon /> {" "} Create video</Button>
        </div> : null
      }
      <VideoBody />
    </VideoChannelContext.Provider>
  )
}

export default Videos