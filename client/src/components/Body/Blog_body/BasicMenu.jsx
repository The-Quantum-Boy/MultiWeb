import React,{useContext} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';


import { AppContext } from '../../../App'
import { Theme } from '../../Theme';
export default function BasicMenu({deleteBlog,editBlog}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteB = () =>{
    if(!window.confirm('Want to delete ? ')){
      setAnchorEl(null);
      return
    }
    deleteBlog();
    setAnchorEl(null);
  }

  const editB = () =>{
    editBlog();
    setAnchorEl(null);
  }

  const {themeToggler} = useContext(AppContext)

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-label="settings"
        onClick={handleClick}
        style={{
            color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        
      >
        <MenuItem onClick={editB} style={{
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor

        }}>Edit</MenuItem>
        <MenuItem onClick={deleteB} style={{
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor

        }}>Delete</MenuItem>
        {/* <MenuItem onClick={handleClose} style={{
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor

        }}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
}
