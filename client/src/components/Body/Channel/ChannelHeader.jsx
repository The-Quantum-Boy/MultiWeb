import React,{useState,useEffect,useContext} from 'react'

import { AppContext } from '../../../App'
import { Theme } from '../../Theme'

import { Avatar } from '@mui/material'
import { Button } from '@mui/material'

import TabBars from './TabBars'
import { useParams } from 'react-router-dom'


const ChannelHeader = () => {

    const {themeToggler,rootUser} = useContext(AppContext)

    const {user_id,channel_id} = useParams();

    const [channel, setChannel] = useState({})
    const [channelImg, setChannelImg] = useState({})

    const getChannel = async() =>{
      try {
        const res = await fetch(`/getChannel/${channel_id}`,{
          method:'GET',
          headers : {
            'Content-Type' : 'application/json'
          }
        })

        const Data = await res.json();
        setChannel(Data)

        const res2 = await fetch(`/getChannelImg/${channel_id}`,{
          method:'GET',
          headers : {
            'Content-Type' : 'application/json'
          }
        })

        const Data2 = await res2.json();
        setChannelImg(Data2)

      } catch (error) {
        
      }
    }

    useEffect(() => {
      getChannel();
    }, [channel_id])
    

  return (
      <>
        <div
        className="Header_main_body2"
        style={{
          backgroundColor: themeToggler
            ? Theme.Dark.boxColor
            : Theme.Light.boxColor,
          boxShadow: themeToggler
            ? Theme.Dark.BoxShadow
            : Theme.Light.BoxShadow,
          border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
        }}
      >
      
        <div className="Header_main_bottom">
          <div className="logo_holder">
            <div
              className="logo_img2"
              style={{
                backgroundColor: themeToggler
                  ? Theme.Dark.boxColor
                  : Theme.Light.boxColor,
              }}
            >
              <Avatar
                aria-label="recipe"
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                {channelImg.img === "" ? null : (
                  <img
                    src={channelImg.img}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
                
              </Avatar>
            
             
            </div>
            <div className="name_role_info2">
              <h4> {channel.name} </h4>
              <span> { channel.subCounts === 0 ? 'No Subscribers' : `${channel.subCounts} Subscribers`} </span>
            </div>
          </div>
          
          <div className='channel_action'>
                  {
                    user_id === rootUser._id ? <Button variant="contained"  >Customize channel</Button> :
                    <Button variant="contained" color='secondary' >Subscribe</Button>
                  }
            
          </div>
        </div>
        <div className="channel_tabs">
            <TabBars />
        </div>
      </div>
      </>
  )
}

export default ChannelHeader