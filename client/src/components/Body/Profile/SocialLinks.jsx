import React,{useContext} from 'react'
import { ProfileContext } from './Profile'

const SocialLinks = () => {

  const {social} = useContext(ProfileContext)



  return (
    <div className='social_container'>
      {
        social.map((e,index)=>{
          if(index === 0){
            return <a  href={`mailto:${e.link}`} className='social_link'>
              <img src={e.logo} alt="" srcset="" />
            </a>
          }
            return  e.link === '' ? <a key={index} className='social_link'>
              <img src={e.logo} alt="" srcset="" />
            </a> : <a target={'_blank'} key={index} href={e.link} className='social_link'>
              <img src={e.logo} alt="" srcset="" />
            </a>
        })
      }
    </div>
  )
}

export default SocialLinks