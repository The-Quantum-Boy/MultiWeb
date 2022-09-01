import React,{useState,useEffect} from 'react'
import BlogContainer from '../../../Blog_body/BlogContainer'
import { useParams }  from 'react-router-dom'
import empty from '../../../../../images/assets/alien.svg'
import CardLoader from '../../../Blog_body/BlogSkeleton'

const Posts = () => {

    const [posts, setPosts] = useState([])

    
  const {id} = useParams();

  const [load, setLoad] = useState(false)

  const getPosts = async() =>{
    try {
      setLoad(true)
      const res3 = await fetch(`/userBlogs/${id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const blogs = await res3.json();
      console.log(blogs);
      setPosts(blogs)
      setLoad(false)


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    
    getPosts();
  }, [])
  


  return (
    <>
        {
             load ? <CardLoader wdt={true}/> : posts.length === 0 ?
        <div className='empty_container' style={{
          // display: posts.length === 0 ? 'flex' : 'none',
          padding:'1rem'
        }}>
            <h4> No Post Yet </h4>
            <img src={empty} alt="" srcset="" className='empty_img' />
        </div> : 
            posts.map((e)=>{
              return <BlogContainer blog={e} setBlogs={setPosts} wdt={true}/>
            })
          }
    </>
  )
}

export default Posts