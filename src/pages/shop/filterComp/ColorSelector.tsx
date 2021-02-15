import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const colorOptions = [
  { border: 'none', bgCol: '#000000' },
  { border: 'none', bgCol: '#C4C4C4' },
  { border: '1px solid #C4C4C4', bgCol: 'white' },
  { border: 'none', bgCol: '#DF1E1E' },
  { border: 'none', bgCol: '#136F27' },
  { border: 'none', bgCol: '#F4A812' },
  { border: 'none', bgCol: '#ED8B8B' },
  { border: 'none', bgCol: '#1B92D6' },
  { border: 'none', bgCol: '#F36B26' },
  { border: 'none', bgCol: '#FDE1D4' },
];

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '170px'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    width: '34px',
    height: '34px',
    borderRadius: '17px',
    '&:hover': {
      backgroundColor: 'rgba(150, 150, 150, 0.4)'
    }
  },
  item: {
    width: '28px',
    height: '28px',
    borderRadius: '14px',
    margin: 'auto',
    cursor: 'pointer'
  }
});

const ColorSelector = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);

  return (
    <div className={classes.root}>
      {colorOptions.map((item:any, index:number) => {
        return (
          <div 
            className={classes.container} 
            style={{backgroundColor: index === selected ? 'rgba(150, 150, 150, 0.8)' : ''}} 
            onClick={()=>setSelected(index)}
            key={index}
          >
            <div className={classes.item} style={{backgroundColor: item.bgCol, border: item.border}}></div>
          </div>
        )
      })}
    </div>
  )
}

export default ColorSelector