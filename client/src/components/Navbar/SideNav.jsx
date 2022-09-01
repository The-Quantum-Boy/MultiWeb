import React,{useContext} from 'react'
import '../../style/Navbar/SideNav.css'
import SideLink from './SideLink';
import user from '../../images/icon/user.png'
import blog from '../../images/icon/blogging.png'
import users from '../../images/icon/about-us.png'
import code from '../../images/icon/code.png'
import webDev from '../../images/icon/layers.png'
import more from '../../images/icon/more.png'
import machine from '../../images/icon/big-data.png'
import appDev from '../../images/icon/developer.png'
import home from '../../images/icon/homepage.png'
import code2 from '../../images/icon/code (2).png'
import channel from '../../images/icon/youtube (1).png'
import { Theme } from '../Theme';
import { AppContext } from '../../App';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AlignHorizontalLeftRoundedIcon from '@mui/icons-material/AlignHorizontalLeftRounded';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} color='primary' />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
const SideNav = ({ open}) => {

    
    

    const {rootUser,themeToggler} = useContext(AppContext)

    return (
        <
        //     className='side_nav' style={{
        //     backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        //     boxShadow : Theme.Dark.BoxShadow ,
        // }}
        >
            
            
             <SideLink icon={home} link={'/'} name={'Home'}  open={open} /> 
            <SideLink icon={user} link={`/profile/${rootUser._id}`} name={'Profile'}  open={open} />
            <SideLink icon={users} link={'/users'} name={'Users'} open={open} />
            <SideLink icon={blog} link={'/post'} name={'Post'} open={open} />
            <SideLink icon={code2} link={'/problems'} name={'Problems'} open={open} />
            <SideLink icon={channel} link={`/channel/${rootUser._id}/${rootUser.activeChannel}`} name={'Channel'} open={open} />
            <SideLink icon={code} link={'/programming'} name={'Programming'} open={open} />
            <SideLink icon={webDev} link={'/webdevelopment'} name={'Web Development'} open={open} />
            <SideLink icon={appDev} link={'/appdevelopment'} name={'App Development'} open={open} />
            <SideLink icon={machine} link={'/machinelearning'} name={'Machine Learning'} open={open} />
            {/* <SideLink icon={more} link={'/'} name={'More'} open={open} />  */}
        </>
    )
}

export default SideNav
