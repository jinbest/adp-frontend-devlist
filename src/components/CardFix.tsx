import React from 'react'

type Props = {
  img: string;
  title: string;
  subDomain?: string;
}

const CardFix = ({title, img, subDomain}: Props) => {
  
  return (
    <div className={subDomain + '-card-fix'}>
      <img src={img} />
      <p>{title}</p>
    </div>
  )
}

CardFix.defaultProps = {
  title: 'Cellphone',
  img: '',
  subDomain: 'geebo'
}

export default CardFix;
