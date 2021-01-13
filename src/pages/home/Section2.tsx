import React from 'react';
import { Typography, Grid, Box } from '@material-ui/core'
import { CardFix, ContentFix } from '../../components'

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Section2 = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);

  return (
    <section className='Container'>
      <Typography className='section-title'>
        {data.homeTextData.section2.title}
      </Typography>
      <div className='card-customized-container-desktop'>
        {
          data.cardFixData.map((item:any, index:number) => {
            return (
              <div className='card-customized-item' key={index}>
                <CardFix title={item.title} img={item.img} key={index} />
              </div>
            )
          })
        }
      </div>
      <div className='card-customized-container-mobile'>
        {
          data.cardFixData.slice(0,3).map((item:any, index:number) => {
            return (
              <div className='card-customized-item' key={index}>
                <CardFix title={item.title} img={item.img} key={index} />
              </div>
            )
          })
        }
      </div>
      <div className='card-customized-container-mobile'>
        {
          data.cardFixData.slice(3, 5).map((item:any, index:number) => {
            return (
              <div className='card-customized-item' key={index}>
                <CardFix title={item.title} img={item.img} key={index} />
              </div>
            )
          })
        }
      </div>
      <Grid container item xs={12} spacing={2}>
        {
          data.contentFixData.map((item:any, index:number) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box className='cart-contentfix-container'>
                  <ContentFix title={item.title} content={item.content} themeCol={data.colorPalle.underLineCol} key={index} />
                </Box>
              </Grid>
            )
          })
        }
      </Grid>
    </section>
  )
}

export default Section2;
