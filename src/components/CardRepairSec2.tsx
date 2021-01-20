import React from 'react'

type Props = {
  img: string;
  subtitle: string;
  content: string;
  subDomain?: string;
}

const CardRepairSec2 = ({subtitle, img, content, subDomain}: Props) => {
  
  return (
    <div className={subDomain + '-card-repair-sec2'}>
      <div><img src={img} className={subDomain + '-card-repair-sec2-img'}/></div>
      <div>
        <p className={subDomain + '-card-repair-sec2-subtitle'}>{subtitle}</p>
        <p className={subDomain + '-card-repair-sec2-content'}>{content}</p>
      </div>
    </div>
  )
}

CardRepairSec2.defaultProps = {
  subtitle: 'Select a repair category',
  content: 'Make an account with us and indicate what needs to be repaired.',
  img: '',
  subDomain: 'geebo'
}

export default CardRepairSec2;
