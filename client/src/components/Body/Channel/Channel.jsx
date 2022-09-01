import React,{useEffect,createContext,useState} from 'react'
import createChannel from '../../../images/assets/undraw_building_blocks_re_5ahy.svg'
import '../../../style/Channel/Channel.css'
import Button from '@mui/material/Button';
import CreateChannel from './CreateChannel'
import ChannelHeader from './ChannelHeader';
import ChannelBody from './ChannelBody';
import { useParams, useNavigate } from 'react-router-dom'


export const ChannelContext = createContext()
const Channel = () => {

    

     
    useEffect(() => {
        var myDiv = document.getElementsByTagName("body")[0];
        myDiv.scrollTop = 0;
        window.scrollTo(0, 0);
    }, []);

   const [page, setPage] = useState('Videos')

  return (
    <ChannelContext.Provider value={{
      page,
      setPage
    }}>
      <ChannelHeader />
      <ChannelBody />
    </ChannelContext.Provider>
  )
}

export default Channel