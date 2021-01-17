import React from 'react'
import { InputBase } from '@material-ui/core'

type Props = {
  color?: string;
  bgcolor?: string;
  border?: string;
  height?: string;
  placeholder?: string;
  value?: string;
  handleChange: (event: React.ChangeEvent<{ value: string }>) => void;
}

const InputComponent = ({color, bgcolor, border, height, placeholder, value, handleChange}: Props) => {

  return (
      <InputBase 
        className="input-component" 
        style={{color: color, background: bgcolor, border: `1px solid ${border}`, height: height}} 
        placeholder={placeholder || ''}
        value={value ?? ''}
        onChange={handleChange}
      />
  )
}

export default InputComponent;