import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { Tooltip } from '@mui/material'

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ListItemButton from '@mui/material/ListItemButton';

import { useNavigate } from 'react-router-dom';

import { Theme } from '../Theme';
import { AppContext } from '../../App';
const SideLink = ({icon,link,name,open}) => {
    

  const {themeToggler} = useContext(AppContext)
    const navigate = useNavigate();
    const go = () =>{
        navigate(link)
    }
    return (

        <ListItemButton onClick={go} style={{
          // backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor
          backgroundColor:'transparent'
        }}>
       
            <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {
                    open ? <img src={icon} alt="" className='link_icon'/>   :
                <Tooltip title={name} placement="right">

                 <img src={icon} alt="" className='link_icon'/>  
                </Tooltip>
                }
              </ListItemIcon>
              <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
        
        </ListItemButton>

    )
}

export default SideLink
