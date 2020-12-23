import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import { Button } from '../../components';

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Section1 = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);
  const repair = data.repairData.section1
  return (
    <section className='Container'>
      <Grid container className='repair-section1'>
        <Grid item xs={12} sm={7}>
          <Typography className="repair-section-title-1" style={{color: repair.themeCol}}>
            {repair.title}
          </Typography>
          <Typography className="repair-section-content" style={{color: repair.themeCol}}>
            {repair.content}
          </Typography>
          <Box className='repair-section-button'>
            <Button 
              title={repair.btnTitle} 
              bgcolor={data.colorPalle.themeColor} 
              borderR='20px'
              onClick={()=>{console.log("get quote")}}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={5}>
          <img src={repair.img} style={{width: '100%', marginTop: '-80px'}}/>
        </Grid>
      </Grid>
    </section>
  )
}

export default Section1
