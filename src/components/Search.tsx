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
}

const Search = ({color, bgcolor, border, height, placeholder}: Props) => {
  const t = useT();
  const tPlaceholder = t(placeholder || 'FIND_YOUR_DEVICE');

  return (
      <Box className="search-container" style={{background: bgcolor, border: `1px solid ${border}`, height: height}}>
        <InputBase 
          className="search-input" 
          style={{color: color}} 
          placeholder={tPlaceholder}
        />
        <SearchIcon className="search-icon" style={{color: color}}/>
      </Box>
  )
}

export default Search;