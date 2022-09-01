import React from 'react'
import empty from '../../../images/assets/undraw_futuristic_interface_re_0cm6.svg'

const EmptyBlog = () => {
  return (
      <>
          <img src={empty} alt="" srcset="" style={{
              width:'100%',
              height:'500px'
          }}/>
            <h3>Be The first to create post</h3>
      </>
  )
}

export default EmptyBlog