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
}

const SelectLang = ({subDomain, color}: Props) => {
  const data = require(`../assets/${subDomain}/Database`);
  const themeCol = data.colorPalle.themeColor;
  const classes = useStyles();

  const [state, setState] = useState<{ lang: string; }>({
    lang: 'en-us'
  });

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const la = event.target.value as keyof typeof state;
    setState({ lang: la });
  };

  return (
    <div>      
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={state.lang}
          onChange={handleChange}
          style={{color: color}}
        >
          <option value={'en-us'} className={classes.selectOption} style={{color: themeCol}}>ENGLISH</option>
          <option value={'en-ca'} className={classes.selectOption} style={{color: themeCol}}>CANADA</option>
        </NativeSelect>
      </FormControl>      
    </div>
  );
}

export default SelectLang;
