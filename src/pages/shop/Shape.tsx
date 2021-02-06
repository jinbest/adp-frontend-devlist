import React from 'react'

type Props = {
  subDomain?: string;
}

const Shape = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/mock-data/mockData`);
  const cornerData = data.shopPageData.cornerShape;
  return (
    <div className={subDomain + '-shop-corner-shape'}>
      <img src={cornerData.img} alt='shop-page-corner-shape' />
    </div>
  )
}

export default Shape
