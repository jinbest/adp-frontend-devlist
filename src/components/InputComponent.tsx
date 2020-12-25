import React from 'react'
import { InputBase } from '@material-ui/core';

/* eslint-disable */

type Props = {
  color?: string;
  bgcolor?: string;
  border?: string;
  height?: string;
  placeholder?: string;
}

const InputComponent = ({color, bgcolor, border, height, placeholder}: Props) => {

  return (
      <InputBase 
        className="input-component" 
        style={{color: color, background: bgcolor, border: `1px solid ${border}`, height: height}} 
        placeholder={placeholder || ''}
      />
  )
}

export default InputComponent;