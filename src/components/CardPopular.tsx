import React from 'react'

type Props = {
  img: string;
  title: string;
  subtitle: string;
  price: string;
  priceCol?: string;
  subDomain?: string;
}

const CardPopular = ({title, img, price, subtitle, priceCol, subDomain}: Props) => {
  
  return (
    <div className={subDomain + '-card-popular'}>
      <img src={img} />
      <p className={subDomain + '-title'}>{title}</p>
      <div className={subDomain + '-price-div'}>
        <p className={subDomain + '-subtitle'}>{subtitle + ' /'}</p>
        <p className={subDomain + '-price'} style={{color: priceCol}}>{price}</p>
      </div>
    </div>
  )
}

CardPopular.defaultProps = {
  title: 'iPhone 11 Pro',
  img: '',
  subtitle: 'As low as',
  price: '$897',
  subDomain: 'geebo'
}

export default CardPopular;
