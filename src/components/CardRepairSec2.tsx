import React from 'react'

/* eslint-disable */
type Props = {
  img: string;
  subtitle: string;
  content: string;
}

const CardRepairSec2 = ({subtitle, img, content}: Props) => {
  
  return (
    <div className='card-repair-sec2'>
      <div><img src={img} className='card-repair-sec2-img'/></div>
      <div>
        <p className='card-repair-sec2-subtitle'>{subtitle}</p>
        <p className='card-repair-sec2-content'>{content}</p>
      </div>
    </div>
  )
}

CardRepairSec2.defaultProps = {
  subtitle: 'Select a repair category',
  content: 'Make an account with us and indicate what needs to be repaired.',
  img: '',
}

export default CardRepairSec2;
