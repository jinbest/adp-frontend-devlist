import React from 'react'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { useT } from "../i18n/index";
import { LangProps } from "../i18n/en";

/* eslint-disable */
type Props = {
  title: LangProps;
  bgcolor?: string;
  txcolor?: string;
  borderR?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  width?: string;
  maxWidth?: string;
  height?: string;
  margin?: string;
  fontSize?: string;
  icon?: boolean;
  disable?: boolean;
}

const Button  = ({title, bgcolor, txcolor, borderR, onClick, width, maxWidth, height, margin, fontSize, icon, disable}: Props) => {
  const t = useT();

  return (
    <button 
      onClick={onClick} className='button'
      style={{
        backgroundColor: bgcolor, color: txcolor, borderRadius: borderR, width: width,
        height: height, margin: margin, fontSize: fontSize, maxWidth: maxWidth, opacity: disable ? 0.5 : 1
      }}
      disabled={disable}
    >
      {icon && <RoomOutlinedIcon />}
      {t(title)}
    </button>
  )
}

Button.defaultProps = {
  title: '',
  bgcolor: '#F36B26',
  txcolor: 'white',
  borderR: '10px',
  icon: false,
  disable: false
}

export default Button;
