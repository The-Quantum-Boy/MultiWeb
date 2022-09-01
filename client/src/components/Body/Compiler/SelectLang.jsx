// import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { Theme } from '../../Theme';
// import { AppContext } from '../../../App';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//     'Cpp',
//     'Java',
//     'Python',
//     'C'
// ];


// export default function MultipleSelect() {


//     const {themeToggler} = React.useContext(AppContext)

    
// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//     backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
//     color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
//   };
// }

//   const theme = useTheme();
//   const [personName, setPersonName] = React.useState(['Cpp']);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(
//       // On autofill we get a stringified value.
//       typeof value === 'string' ? value.split(',') : value,
//     );
//   };

//   return (
//     <div className='select_lang'>
//       <FormControl sx={{ m: 1, width: 200 }}>
//         {/* <InputLabel id="demo-multiple-name-label">Lang</InputLabel> */}
//         <Select
//           labelId="demo-multiple-name-label"
//           id="demo-multiple-name"
//         //   multiple
//           value={personName}
//           onChange={handleChange}
//           input={<OutlinedInput label="Lang" />}
//           MenuProps={MenuProps}
//           style={{
//               width:'300px',
//                 backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
//                 color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
//           }}
//         >
//           {names.map((name) => (
//             <MenuItem
//               key={name}
//               value={name}
//               style={getStyles(name, personName, theme)}
//             >
//               {name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }


import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { AppContext } from '../../../App';
import { Theme } from '../../Theme';
import { CompilerContext } from './Compiler';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Cpp',
  'Python',
  'Java',
  'C'
];

export default function MultipleSelectCheckmarks() {
  
  const {themeToggler} = React.useContext(AppContext)
  const {selectLang,setSelectLang,setAction,setInput} = React.useContext(CompilerContext)
  const [personName, setPersonName] = React.useState([selectLang]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectLang(value);
    setAction('Console');
    localStorage.setItem('lang',JSON.stringify(value))
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div style={{
      width:'100%',
      marginLeft:'1rem'
    }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          style={{
                backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
                color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
          }}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={{
                backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
                color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
          }}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

