import React,{useState,useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom'



import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';

import PlayListCard from './Cards/PlayListCard';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const PlayLists = () => {


  const {user_id,channel_id} = useParams();
  const {themeToggler} = useContext(AppContext)

  const [playLists, setPlayLists] = useState([])

  const getPlayLists = async() => {
    try {
      const res = await fetch(`/getPlayLists/${channel_id}`,{
        method : 'GET',
        headers : {
          'Content-Type'  : 'application/json'
        }
      })

      const data = await res.json();
      console.log(data);
      setPlayLists(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPlayLists();
  }, [])
  

  return (
    <>
      <h6>Created PlayLists</h6>
      <Box sx={{ flexGrow: 1 }} >
        <Grid container spacing={{ xs: 2, md: 1  }} columns={{ xs: 4, sm: 12, md: 20 }}>
            {Array.from(Array(playLists.length)).map((_, index) => (
            <Grid item xs={4} sm={4} md={4} key={index} className='video_grid'>
                {
                  playLists[index].videoCount === 0 ? null : 
                
                <Item className='card_container' style={{
                    // backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                    backgroundColor:'transparent',
                    // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                    boxShadow:'none',
                    border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                    // border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                    padding:'0',
                    textAlign:'initial',
                    color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
                }}>
                
                  <PlayListCard data={playLists[index]}/>
                </Item>
                }
            </Grid>
            ))}
        </Grid>
        </Box>
    </>
  )
}

export default PlayLists