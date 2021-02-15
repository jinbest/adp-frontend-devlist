import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    fontSize: '15px',
    padding: '1px 5px',
    borderRadius: '10px',
    border: '1px solid #C4C4C4',
    color: 'black',
    backgroundColor: 'white',
    outline: 'none',
    cursor: 'pointer',
    margin: '0 5px 5px 0'
  },
})

type Props = {
  title: string;
  col: string;
}

const TabButton = ({title, col}: Props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(false);

  return (
    <button 
      onClick={()=>setSelected(!selected)} 
      className={classes.root}
      style={{
        border: selected ? `1px solid ${col}` : '1px solid #C4C4C4',
        backgroundColor: selected ? col : 'transparent',
        color: selected ? 'white' : 'black'
      }}
    >
      {title}
    </button>
  )
}

export default TabButton