import React from 'react';
import {CardWhyCustomer} from '../../components'
import { Typography, Grid, Box } from '@material-ui/core'

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Section6 = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);
  
  return (
    <section className='Container center sec6-container'>      
      <Typography className='f40 bold mg-t-1'>
        {data.homeTextData.section6.title}
      </Typography>
      <Typography className='f24'>
        View More
      </Typography>
      <Grid container item xs={12} spacing={2} className='sec6-card'>
        {data.homeTextData.section6.review.map((item:any, index:number) => {
          return (
            <Grid item xs={12} md={4} key={index}>
              <Box className='sec6-card'>
                <CardWhyCustomer key={index} score={item.score} days={item.days} content={item.content} reviewer={item.reviewer} />
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </section>
  )
}

export default Section6;
