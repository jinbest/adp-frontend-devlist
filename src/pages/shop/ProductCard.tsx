import React from 'react'
import { ProductModel } from './product-model'

type Props = {
  data: ProductModel;
}

const ProductCard = ({data}: Props) => {
  console.log('data', data);

  return (
    <div className='shop-product-card-container'>
      <p style={{backgroundColor: data.color}} className='shop-card-type'>
        {data.type}
      </p>
      <div className='shop-image-container'>
        <img src={data.img} alt='each-item' />
      </div>
      <div style={{padding: '0.8vw 1.5vw'}}>
        <div style={{display: 'flex',justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1vw'}}>
          <p style={{padding: 0, margin: 0}}>{data.title}</p>
          <p style={{padding: 0, margin: 0}}>{data.capacity}</p>
        </div>
        <div style={{display: 'flex',fontWeight: 400, fontSize: '0.8vw'}}>
          <p style={{padding: 0, margin: 0}}>{data.midCol}</p>
        </div>
        <div style={{display: 'flex',fontWeight: 400, fontSize: '0.8vw'}}>
          <p style={{padding: 0, margin: 0}}>{data.availableStore}</p>
        </div>
        <div style={{display: 'flex',fontWeight: 400, fontSize: '0.8vw'}}>
          <p style={{padding: 0, margin: 0}}>{data.availableOnline}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
