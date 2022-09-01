import React,{useContext,useEffect} from 'react'
import { Theme } from '../../../Theme'
import { AppContext } from '../../../../App';
import { CompilerContext } from "../Compiler";
import Loader from './Loader'


const Run = () => {
  const {themeToggler} = useContext(AppContext)

  const {code,input,selectLang,run} = useContext(CompilerContext)

  console.log(code,input,selectLang);

  const [output, setOutput] = React.useState('')
  const [load, setLoad] = React.useState(false)

  const execute = async() => {
    try {
      setLoad(true);
      setOutput('');
      const res = await fetch('/execute',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          lang : selectLang,
          input,
          code
        })
      })

      const Data = await res.json();

      console.log(Data);

      if(Data.error){
        setOutput(Data.error)
        setLoad(false);
        return;
      }

      setOutput(Data.output)
      setLoad(false)

    } catch (error) {
      console.log('error');
      setOutput('error')
      setLoad(false)
    }
  }

  useEffect(() => {
    execute()
  }, [run])


  useEffect(() => {
    setOutput(output)
  }, [output])
  
  

  return (
    <>
      <h6 style={{
        display:'flex',
        margin:'0',
        alignItems:'center'
      }} > <span style={{ marginRight:'1rem' }}> OUTPUT </span>  <span style={{
        visibility : load ? 'visible' : 'hidden'
      }}> <Loader /> </span> </h6>
      <div >
        <textarea class="form-control code_input_textarea" id="exampleFormControlTextarea1" rows="7" 
        value={output}
        style={{
          backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor ,
          color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
          border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
          resize:'none',
          marginTop:'1rem'

        }}>
        </textarea>
      </div>
    </>
  )
}

export default Run