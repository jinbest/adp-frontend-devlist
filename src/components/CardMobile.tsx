import React from 'react'
import Button from './Button'

/* eslint-disable */
type Props = {
  title: string;
  img: string;
  btnTitle: string;
  color?: string; 
}

const CardMobile = ({title, img, btnTitle, color}: Props) => {
  
  return (
    <div className='card-mobile'>
      <p style={{color: color}}>{title.toLocaleUpperCase()}</p>
      <img src={img} />
      <Button title={btnTitle} bgcolor={color} borderR='10px' margin='auto' fontSize='16px' />
    </div>
  )
}

CardMobile.defaultProps = {
  title: 'TRADE',
  img: '',
  btnTitle: 'Trade my Device'
}

export default CardMobile;
