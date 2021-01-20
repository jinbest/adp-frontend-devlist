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
  subDomain?: string;
}

const InputComponent = ({color, bgcolor, border, height, placeholder, value, handleChange, subDomain}: Props) => {

  return (
      <InputBase 
        className={subDomain + "-input-component"} 
        style={{color: color, background: bgcolor, border: `1px solid ${border}`, height: height}} 
        placeholder={placeholder || ''}
        value={value ?? ''}
        onChange={handleChange}
      />
  )
}

export default InputComponent;