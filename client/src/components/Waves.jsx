import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

import React,{useContext} from 'react'
import '../style/wave.css'
import { AppContext } from '../App'



const Waves = () => {

  const {setSearch,searchText, setSearchText} = useContext(AppContext)

  
  const stop = () =>{
    SpeechRecognition.stopListening();
    setSearch(false);
    setSearchText('')
  }

  

  return (
    <div className='waves'>
        
        <div class="circle"></div>
        <button onClick={stop} class="circle">Stop</button>
        <p className="search_text" >{searchText}</p>
        <div class="box">

          <div class="wave -three"></div>
          <div class="wave -two"></div>
          <div class="wave -one"></div>
        </div>
        
    </div>
  )
}

export default Waves