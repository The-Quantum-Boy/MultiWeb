import React,{useEffect,useContext,useState,createContext} from 'react';
import '../../../style/Body/Profile.css'
import UserHeader from './UserHeader';
import ProfileHolder from './ProfileHolder';
import { AppContext } from '../../../App';
import { useParams } from 'react-router-dom';
import EditPage from './EditProfile/EditPage'
import PreProfile from './PreProfile';


import email from '../../../images/social/email.png'
import linkedin from '../../../images/social/linkedin.png'
import github from '../../../images/social/github.png'
import facebook from '../../../images/social/facebook.png'
import twitter from '../../../images/social/twitter.png'
import instagram from '../../../images/social/instagram.png'


import Drawer from '../Blog_body/CreateBlog'


export const ProfileContext = createContext()

const Profile = () => {

  const {id} = useParams();
  // const {rootUser} = useContext(AppContext)


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])

  const [social, setSocial] = useState([])

  const [loader, setLoader] = useState(false)

  
  const [followCount, setFollowCount] = useState({
    followers : 0,
    followings : 0,
  })


  const getData = async() =>{
    try {
      setLoader(true);
      const res = await fetch(`/usersFollowCount/${id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data = await res.json();
      console.log(data);
      setFollowCount(data)

      const res2 = await fetch(`/getUser/${id}`,{
          method:'GET',
          headers:{
              "Content-Type":"application/json"
          }
      })

      const res3 = await fetch(`/getImg/${id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data3 = await res3.json();


      const res4 = await fetch(`/getBgImg/${id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data4 = await res4.json();

          const Data = await res2.json();
          console.log(Data);
          setUser({...Data,img : data3.img, bgImg : data4.bgImg});
          setPosts([])




          setSocial([
            {
              logo : email,
              link : Data.email
            },
            {
              logo : linkedin,
              link : Data.socialLinks.linkedin
            },
            
            {
              logo : facebook,
              link : Data.socialLinks.facebook
            },
            {
              logo : twitter,
              link : Data.socialLinks.twitter
            },
            {
              logo : instagram,
              link : Data.socialLinks.instagram
            },
            {
              logo : github,
              link : Data.socialLinks.github
            },
          ])

        setLoader(false);

      } catch (error) {
          console.log('data not found');
      }
  }

  

  useEffect(() => {
    getData();
  },[id]);

  const [Switch, setSwitch] = useState('Profile')

  
  const [toggle, setToggle] = useState(false);


  return (
    <>
      <ProfileContext.Provider value={{
        Switch,
        setSwitch,
        user,
        setUser,
        posts,
        toggle, 
        setToggle,
        social,
        setSocial,
        followCount,
        setFollowCount
      }} >
      {
        loader ? <PreProfile /> : 
        <>
          <EditPage />
          <UserHeader />
          <ProfileHolder />
          <Drawer />
        </>
      }
      </ProfileContext.Provider>
    </>
  )
};

export default Profile;
