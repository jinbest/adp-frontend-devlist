import React from 'react'
import { Box, InputBase } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
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
  handleIconClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    searchIconDiv: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        opacity: 0.5
      }
    },
  }),
);

const Search = ({color, bgcolor, border, height, placeholder, subDomain, value, handleChange, handleIconClick}: Props) => {
  const t = useT();
  const tPlaceholder = t(placeholder || 'FIND_YOUR_DEVICE');
  const classes = useStyles();

  return (
      <Box className={subDomain + "-search-container"} style={{background: bgcolor, border: `1px solid ${border}`, height: height}}>
        <InputBase 
          className={subDomain + "-search-input"} 
          style={{color: color}} 
          placeholder={tPlaceholder}
          value={value ?? ''}
          onChange={handleChange}
        />
        <div onClick={handleIconClick} className={classes.searchIconDiv}>
          <SearchIcon className={subDomain + "-search-icon"} style={{color: color}}/>
        </div>
      </Box>
  )
}

export default Search;