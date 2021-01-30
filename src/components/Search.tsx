import React from 'react'
import { Box, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useT } from "../i18n/index";
import {LangProps} from '../i18n/en';

type Props = {
  color?: string;
  bgcolor?: string;
  border?: string;
  height?: string;
  placeholder: LangProps;
  subDomain?: string;
  value?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({color, bgcolor, border, height, placeholder, subDomain, value, handleChange}: Props) => {
  const t = useT();
  const tPlaceholder = t(placeholder || 'FIND_YOUR_DEVICE');

  return (
      <Box className={subDomain + "-search-container"} style={{background: bgcolor, border: `1px solid ${border}`, height: height}}>
        <InputBase 
          className={subDomain + "-search-input"} 
          style={{color: color}} 
          placeholder={tPlaceholder}
          value={value ?? ''}
          onChange={handleChange}
        />
        <SearchIcon className={subDomain + "-search-icon"} style={{color: color}}/>
      </Box>
  )
}

export default Search;