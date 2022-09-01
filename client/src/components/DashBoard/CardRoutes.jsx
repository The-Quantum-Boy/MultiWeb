import React,{useEffect,useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom'

import Card from '../Shared/LogoCard';
import '../../style/DashBoard/Card.css'
import { AppContext } from '../../App';

import user_icon from '../../images/icon/user.png'
import blog from '../../images/icon/blogging.png'
import users from '../../images/icon/about-us.png'
import code from '../../images/icon/code.png'
import webDev from '../../images/icon/layers.png'
import more from '../../images/icon/more.png'
import machine from '../../images/icon/big-data.png'
import appDev from '../../images/icon/developer.png'
import code2 from '../../images/icon/code (2).png'
import channel from '../../images/icon/youtube (1).png'

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Theme } from '../Theme';

// import Graph from './Graph';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CardRoutes = () => {

    
    const { rootUser, setRootUser,themeToggler  } = useContext(AppContext)

    const card_data = [
        {
          title : 'Profile',
          icon : user_icon,
          link : `/profile/${rootUser._id}`
        },
        {
            title : 'Users',
            icon : users,
            link : '/users'
        },
        {
            title : 'Post',
            icon : blog,
            link : '/post'
        },
        {
            title : 'Problems',
            icon : code2,
            link : '/problems'
        },
        {
            title : 'Channel',
            icon : channel,
            link : `/channel/${rootUser._id}/${rootUser.activeChannel}`
        },
        {
            title : 'Programming',
            icon : code,
            link : '/programming'
        },
        
        {
            title : 'Web Development',
            icon : webDev,
            link : '/webdevelopment'
        },
        {
            title : 'App Development',
            icon : appDev,
            link : '/appdevelopment'
        },
        {
            title : 'Machine Learning',
            icon : machine,
            link : '/machinelearning'
        },
      ]

  return (
      <>
        {/* <h1>Welcome {rootUser.name}</h1> */}
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 8, sm: 8, md:8 }}>
            {Array.from(Array(card_data.length)).map((_, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
                <Item className='card_container' style={{
                    backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                    boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                    border : themeToggler ? Theme.Dark.Border : Theme.Light.Border
                }}>
                    <Card data={card_data[index]}/>
                </Item>
            </Grid>
            ))}
        </Grid>
        </Box>
        {/* <Graph /> */}
      </>
  );
};

export default CardRoutes;
