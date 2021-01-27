import React from 'react'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { useT } from '../i18n/index';
import { LangProps } from '../i18n/en';

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
  subDomain?: string;
  border?: string;
  textDecorator?: string;
  hover?: boolean;
}

const Button  = ({
  title, bgcolor, txcolor, borderR, onClick, width, maxWidth, hover,
  height, margin, fontSize, icon, disable, subDomain, border, textDecorator
}: Props) => {
  const t = useT();

  return (
    <button 
      onClick={onClick} className={hover ? subDomain + '-button' : subDomain + '-button no-hover'}
      style={{
        backgroundColor: bgcolor, color: txcolor, borderRadius: borderR, width: width, border: border, textDecoration: textDecorator,
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
  disable: false,
  hover: true
}

export default Button;
