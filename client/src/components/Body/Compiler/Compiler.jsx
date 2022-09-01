import React,{useEffect,useState,useContext,createContext} from 'react'
import Grid from '@mui/material/Grid';
import { AppContext } from '../../../App';
import { Theme } from '../../Theme';
import { Box , Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom'
import Problem from './Problem'
import InputOutput from './InputOutput';
import '../../../style/Body/Compiler.css'
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const CompilerContext = createContext()
const Compiler = () => {

  useEffect(() => {
    window.scroll(0,0)
  }, [])
  

  const {title,id} = useParams();
  const {themeToggler,rootUser,setRootUser} = useContext(AppContext)
  const [problem, setProblem] = useState({})
  const [selectLang, setSelectLang] = useState(
    JSON.parse(localStorage.getItem('lang')) === null ? 
    'Cpp' : JSON.parse(localStorage.getItem('lang'))
  )


  const [code, setCode] = useState('')
  const [input, setInput] = useState('')
  const [run, setRun] = useState(false)
  const [upload, setUpload] = useState(false)
  const [action, setAction] = React.useState('')
  const [mini, setMini] = useState(false)

  const [checker, setChecker] = useState([])

  



  const getProblem = async() =>{
    try {

      const res = await fetch(`/getProblemById/${id}`,{
        method : 'GET',
        headers : {
          'Content-type' : 'application/json'
        }
      })

      const data = await res.json();

      console.log(data);
      setProblem(data)

      data.testCases.every(function(element, index) {
        if(input !== ''){
          return false;
        }
        // Do your thing, then:
        if (element.input !== '' && element.output !== ''){
          setInput(element.input)
          return false
        } 
        else return true
      })



    } catch (error) {
      console.log(error);
    }
  }


  const [value, updateValue] = useState('');


  
  useEffect(() => {
    getProblem();

  }, [])



  // useEffect(() => {

  //   getSolution();
      
  // }, [selectLang])
  




  

  return (
    <>
      
    <CompilerContext.Provider value={{
      selectLang, 
      setSelectLang,
      code,
      setCode,
      input, 
      setInput,
      run,
      setRun,
      action, 
      setAction,
      problem,
      upload, 
      setUpload,
      checker, 
      setChecker,
      setMini,
      mini,
      value, 
      updateValue
    }}>
      <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 12 }}>
            <Grid item xs={ mini ? 4 : 6} style={{
              position:'relative',
              transition:'all .5s ease'
            }} >
              <Item className='card_container'
              style={{
                      backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                      boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                      border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                      textAlign:'initial',
                  }}
              >
                <Problem />
                
                {/* <About /> */}
              </Item>
            </Grid>
            <Grid item xs={mini ? 8 : 6}  style={{
              position:'relative',
              transition:'all .5s ease'
            }}>
              <Item className='card_container' style={{
                      backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                      boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                      border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                      textAlign:'initial',
                      color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
                  }}>
                  <InputOutput />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </CompilerContext.Provider>
    </>
  )
}

export default Compiler