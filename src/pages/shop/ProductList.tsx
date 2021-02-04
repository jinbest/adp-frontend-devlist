import React from 'react'
import { ProductCard } from './'
import { ProductModel } from './product-model'
import { Grid } from '@material-ui/core'

type Props = {
  subDomain?: string;
}

const ProductList = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/mock-data/mockData`);
  const shopEachItem = data.shopPageData.shopEachItem;
  const propsData: ProductModel = shopEachItem;
  const products: any[] = [];
  for (let i = 0; i < 20; i++) {
    const type = (i % 4 === 0) ? 'New' : (i % 4 === 1) ? 'Fair' : (i % 4 === 2) ? 'Good' : 'Mint';
    const cntPropsData: ProductModel = propsData;
    cntPropsData.type = type;
    products.push(cntPropsData);
  }

  return (
    <Grid container spacing={2}>
      {products.map((item:any, index:number) => {
        return (
          <Grid item xs={12} sm={3} key={index}>
            <ProductCard data={item} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ProductList
