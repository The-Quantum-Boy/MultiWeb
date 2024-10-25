import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BlogContainer from '../../Blog_body/BlogContainer'

import Posts from './infoPosts/Posts';
import Likes from './infoPosts/Likes';
import All from './infoPosts/All';

import { AppContext } from '../../../../App'
import { Theme } from '../../../Theme'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const {themeToggler} = useContext(AppContext)

  return (
    <Box sx={{ bgcolor: 'transparent', width: '100%' }}>
      <AppBar position="static" style={{
            backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
            boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
            borderRadius:'4px',
            padding:'0 .5rem',
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
          }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          
        >
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Like" {...a11yProps(1)} />
          <Tab label="Posts" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{
            backgroundColor:'transparent'
        }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <All />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Likes />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            <Posts />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
