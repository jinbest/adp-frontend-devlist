import React from 'react'

type Props = {
  img: string;
  subtitle: string;
  content: string;
  subDomain?: string;
}

const CardRepairSec3 = ({subtitle, img, content, subDomain}: Props) => {
  
  return (
    <div className={subDomain + '-card-repair-sec3-container'}>
      <p className={subDomain + '-subtitle'}>{subtitle}</p>
      <img src={img} />        
      <p className={subDomain + '-content'}>{content}</p>
    </div>
  )
}

CardRepairSec3.defaultProps = {
  subtitle: 'NEW',
  content: 'A brand new device with no signs of wear',
  img: '',
  subDomain: 'geebo'
}

export default CardRepairSec3;
