import React, {useEffect, useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useT, useSetLang } from "../i18n/index";
import { LangProps } from "../i18n/en";

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
  const setLang = useSetLang();
  const t = useT();

  const tItem = (item:LangProps) => {
    return t(item);
  }

  const [state, setState] = useState(options[0]);

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const la = event.target.value as keyof typeof state;
    let cntLang:string = 'en';
    setState(la);
    setLang(la === 'ENGLISH' ? 'en' : 'fr');
    cntLang = la === 'ENGLISH' ? 'en' : 'fr';
    window.localStorage.setItem('cntLang', cntLang);
  };

  useEffect(() => {
    const cntLang = window.localStorage.getItem('cntLang') || 'en';
    cntLang === 'en' ? setState(options[0]) : setState(options[1]);
  }, [])

  return (
    <div>      
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={state}
          onChange={handleChange}
          style={{color: color}}
        >
          {options.map((item:LangProps, index:number) => {
            return (
              <option value={item} className={classes.selectOption} style={{color: themeCol}} key={index}>
                {tItem(item)}
              </option>
            )
          })}
        </NativeSelect>
      </FormControl>      
    </div>
  );
}

export default SelectLang;
