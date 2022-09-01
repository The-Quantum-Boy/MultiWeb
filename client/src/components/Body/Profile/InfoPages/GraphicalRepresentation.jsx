import React,{useContext} from 'react'
import Bar from '../Bar'
import Polar from '../Polar'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const GraphicalRepresentation = () => {

    const {themeToggler} = useContext(AppContext)

  return (
      <>
        <Item className='card_container' style={{
            backgroundColor : 'transparent',
            boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
        }}>
        <Polar />
        </Item>
        <Item className='card_container' style={{
            backgroundColor : 'transparent',
            boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
        }}>
        <Bar 
            bgColor = {'rgba(36, 153, 239, 0.85)'} 
            labels={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']}
            data = {[10,5,30,10,20,4,9,11,15,4,1,8]}
            label = {'Problems Solved'}
        />
        </Item>
    </>
  )
}

export default GraphicalRepresentation