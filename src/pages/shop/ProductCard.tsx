import React from 'react'
import { ProductModel } from './product-model'
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CheckIcon from '@material-ui/icons/Check';

type Props = {
  data: ProductModel;
}

const ProductCard = ({data}: Props) => {

  return (
    <div className='shop-product-card-container'>
      <p style={{backgroundColor: data.color}} className='shop-card-type'>
        {data.type}
      </p>
      <div className='shop-image-container'>
        <img src={data.img} alt='each-item' />
      </div>
      <div style={{padding: '0.8vw 1.5vw'}}>
        <div style={{display: 'flex',justifyContent: 'space-between'}}>
          <p className='m-0 p-0 product-card-title' style={{fontWeight: 'bold'}}>{data.title}</p>
          <p className='m-0 p-0 product-card-title' style={{fontWeight: 'bold'}}>{data.capacity}</p>
        </div>
        <div className='product-card-container'>
          <span className='product-card-round-circle' style={{borderRadius: '10px',background: '#3E4A44', marginRight: '5px'}}></span>
          <p className='m-0 p-0 product-card-content'>{data.midCol}</p>
        </div>
        <div className='product-card-container'>
          <CheckIcon className='product-card-icon' style={{marginRight: '5px', color: '#54BA71'}} />
          <p className='m-0 p-0 product-card-content'>{data.availableStore}</p>
        </div>
        <div className='product-card-container'>
          <NotInterestedIcon className='product-card-icon' style={{marginRight: '5px'}} />
          <p className='m-0 p-0 product-card-content'>{data.availableOnline}</p>
        </div>
      </div>
      <div style={{padding: '0 1.5vw 0.8vw'}}>
        <p className='m-0 p-0 card-title' style={{color: data.color}}>{data.price}</p>
        <p className='m-0 p-0 product-card-content'>{data.asLow}</p>
        <p className='m-0 p-0 product-card-content'>{data.warranty}</p>
      </div>
    </div>
  )
}

export default ProductCard
