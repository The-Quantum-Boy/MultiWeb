import React,{useContext,useEffect,useState,createContext} from 'react'
import '../../../style/Body/Blog.css'
import search from '../../../images/icon/search.png'
import BlogContainer from './BlogContainer'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TemporaryDrawer from './CreateBlog'
import { AppContext } from '../../../App'
import { Theme } from '../../Theme';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import BlogSkeleton from './BlogSkeleton'
import EmptyBlog from './EmptyBlog';

export const  BlogContext = createContext()

const Blog = () => {


    const {themeToggler,setToggle,setIsEdit,setBlogData,blogs, setBlogs} = useContext(AppContext)
    const [wdt, setWdt] = useState(false)
    
    useEffect(() => {
        var myDiv = document.getElementsByTagName("body")[0];
        myDiv.scrollTop = 0;
        window.scrollTo(0, 0);
    }, []);
    
    const [actualBlog, setActualBlog] = useState([])

    const [blogLoading, setBlogLoading] = useState(false);

    const getBlogs = async() =>{
        try {
            setBlogLoading(true);
            const res = await fetch('/getBlogs',{
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })

            const data = await res.json();
            setBlogs(data);
            
            setActualBlog(data);
            console.log(data);
            setBlogLoading(false);

        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
      getBlogs()
    }, [])
    

    const addBlog = () =>{
        setToggle(true)
        setIsEdit(false);
        setBlogData({
            id : '',
            headerTitle : '',
            file : '',
            description : ''
        })
    }

    const [temp, setTemp] = useState(true);


    const findBlogs = (search_text) =>{

        if(search_text === '' || search_text === ' ' ){
            setBlogs(actualBlog)
            return;
        }

        const arr = actualBlog.filter((e)=>{
            return (e.headerTitle.toLowerCase()).includes(search_text.toLowerCase());
        })

        setTemp(!(arr.length === 0))

        setBlogs(arr)

    }

    return (
        <BlogContext.Provider value={{ }}>
            
            {/* <div className='search_blog' style={{
                 backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                 color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                 boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                 border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
            }}>
                <IconButton color='primary' onClick={()=>setWdt(!wdt)} > <SearchIcon /> </IconButton>
                <input type="text" name="" id="" autoFocus={true} onChange={(e)=>findBlogs(e.target.value)} className='search_bar' placeholder='Search blog...' style={{
                    display : wdt ? 'block' : 'none',
                    color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
                }}/>
            </div> */}
            <section className='blog_body'>
                {
                    blogLoading ? <>
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </> : blogs.length === 0 && temp ? <EmptyBlog /> :
                    blogs.map((blog)=>{
                        return <BlogContainer blog={blog} setBlogs={setBlogs}/>
                    })
                }
                
            </section>
            <div className='create_post'>
                <Fab color="primary" aria-label="add" onClick={addBlog}>
                    <AddIcon />
                </Fab>
            </div>
            <TemporaryDrawer />
        </BlogContext.Provider>
    )
}

export default Blog

