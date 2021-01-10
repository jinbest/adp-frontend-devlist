import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      margin: '0 5px',
      marginTop: '-3px',
    },
    selectOption: {
      color: 'black',
      padding: '10px',
      marginLeft: '10px'
    }
  }),
);

 /*eslint-disable*/
type Props = {
  subDomain?: string;
  color: string;
  options: any[];
}

const SelectLang = ({subDomain, color, options}: Props) => {
  const data = require(`../assets/${subDomain}/Database`);
  const themeCol = data.colorPalle.themeColor;
  const classes = useStyles();

  const [state, setState] = useState(options[0])

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const la = event.target.value as keyof typeof state;
    setState(la);
  };

  return (
    <div>      
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={state}
          onChange={handleChange}
          style={{color: color}}
        >
          {options.map((item:any, index:number) => {
            return (
              <option value={item} className={classes.selectOption} style={{color: themeCol}} key={index}>{item}</option>
            )
          })}
        </NativeSelect>
      </FormControl>      
    </div>
  );
}

export default SelectLang;
