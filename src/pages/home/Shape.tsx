import React from 'react'

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Shape = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);
  return (
    <div>
      <div className='corner-shape'>
        <img src={data.shapeData.cornerShape} />
      </div>
      <div className='mockup-shape'>
        <img src={data.shapeData.mockupShape} />
      </div>
    </div>
  )
}

export default Shape
