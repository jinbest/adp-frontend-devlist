import React from 'react'
import { LangProps } from '../i18n/en'
import Button from './Button'

type Props = {
  title: string;
  img: string;
  btnTitle: LangProps;
  color?: string; 
  heart?: string;
  heartCol?: string;
  subDomain?: string;
}

const CardMobile = ({title, img, btnTitle, color, heart, heartCol, subDomain}: Props) => {
  
  return (
    <div className={subDomain + '-card-mobile'}>
      <p style={{color: color}}>{title.toLocaleUpperCase()}</p>
      {heart && <div className={subDomain + '-card-mobile-heart'} style={{background: heartCol}}>
        <img src={heart} alt='heart' />
      </div>}
      <img src={img} alt='mobile-img' />
      <Button title={btnTitle} bgcolor={color} borderR='10px' margin='auto' fontSize='16px' subDomain={subDomain} />
    </div>
  )
}

CardMobile.defaultProps = {
  title: 'TRADE',
  img: '',
  btnTitle: 'Trade my Device',
  heart: ''
}

export default CardMobile;
