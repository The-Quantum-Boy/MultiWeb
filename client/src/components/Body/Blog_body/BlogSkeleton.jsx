import React ,{useContext}from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';


import { AppContext } from '../../../App'
import { Theme } from '../../Theme';


export default function Facebook({wdt=false}) {
  const {themeToggler,rootUser} = useContext(AppContext)
 
  return (
    <Card 
    sx={ wdt ? {} : { maxWidth: 345 }}
     style={{
        backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
        boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
        border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
      }}>
      <CardHeader
        avatar={
          
            <Skeleton animation="wave" variant="circular" width={50} height={50} />
        }
        
        title={
            <Skeleton
              animation="wave"
              height={20}
              width="20%"
              style={{ marginBottom: 6 }}
            />
          
        }
        subheader={
          
            <Skeleton animation="wave" height={20} width="40%" />
          
        }
      />
      {
        <Skeleton sx={{ height: 250 }} animation="wave" variant="rectangular" />
      }

      <CardContent>
        {
          <React.Fragment>
            <Skeleton animation="wave" height={15} style={{ marginBottom: 10 }} width="10%"/>
            <Skeleton animation="wave" height={15} width="20%" />
            <div style={{
                marginTop:'2rem',
                display:'flex'
            }}>
            <Skeleton animation="wave" variant="circular" width={30} height={30} style={{
                marginRight:'1rem'
            }}/>
            <Skeleton animation="wave" variant="circular" width={30} height={30} />
            </div>
          </React.Fragment>
       }
      </CardContent>
    </Card>
  );
}
