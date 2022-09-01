import React,{useState,useEffect,useContext} from 'react'
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import { Button, Tooltip } from '@mui/material';
import { styled } from "@mui/material/styles";
import CardMedia from '@mui/material/CardMedia';
import { BlogContext } from './Blog';
import { AppContext } from '../../../App'

const Input = styled("input")({
  display: "none",
});

const FileSelector = () => {

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  const { blogData, setBlogData } = useContext(AppContext)

  // const [playFile, setPlayFile] = useState('')

  // const [file, setFile] = useState(null)

  const handleChange = async(e) =>{
    setBlogData({...blogData , file : await toBase64(e.target.files[0])});
    // setFile(e.target.files[0])
    console.log(e.target.files[0]);
    e.target.value = ""
  }

  return (
    <div className='file_selector'>
      <div>
        {
          blogData.file === '' ? null :
          <CardMedia
            component={ blogData.file.includes("video") ? 'video' : 'img'}
            src={blogData.file}
            controls
          />
        }
      </div>
        <div className='file_selector_button'>
        <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={handleChange}
              />
              <Tooltip title='Add a photo'>
                <Button 
                  color='primary'
                  aria-label="upload picture"
                  component="span"
                  // variant="contained"
                >
                  <AddPhotoAlternateRoundedIcon />
                </Button>
              </Tooltip>
            </label>
        <label htmlFor="icon-button-file2">
              <Input
                accept="video/*"
                id="icon-button-file2"
                type="file"
                onChange={handleChange}
              />
              <Tooltip title='Add a video'>
                <Button 
                  color='primary'
                  aria-label="upload video"
                  component="span"
                  // variant="contained"
                >
                  <OndemandVideoRoundedIcon />
                </Button>
              </Tooltip>
            </label>
          
          
        </div>
    </div>
  )
}

export default FileSelector