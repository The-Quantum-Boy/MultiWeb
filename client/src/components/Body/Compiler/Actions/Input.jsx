import React,{useContext,useState,useEffect} from 'react'
import { Theme } from '../../../Theme'
import { AppContext } from '../../../../App';
import { CompilerContext } from "../Compiler";


const Input = () => {

  const {themeToggler} = useContext(AppContext)
  const {input,setInput,problem} = useContext(CompilerContext)
  

  return (
    <div>
      <h6>INPUT</h6>
      <div >
        <textarea class="form-control code_input_textarea" id="exampleFormControlTextarea1" rows="7" 
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        style={{
          backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor ,
          color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
          border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
          resize:'none',
          marginTop:'1rem'

        }}></textarea>
      </div>
    </div>
  )
}

export default Input