import React from 'react'

/* eslint-disable */
type Props = {
  img: string;
  title: string;
}

const CardFix = ({title, img}: Props) => {
  
  return (
    <div className='card-fix'>
      <img src={img} />
      <p>{title}</p>
    </div>
  )
}

CardFix.defaultProps = {
  title: 'Cellphone',
  img: '',
}

export default CardFix;
