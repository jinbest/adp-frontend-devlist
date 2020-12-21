import React from 'react';
import {DeviceListComponent} from '../../components'
import {Button} from '../../components'
import { Typography, Grid, Box } from '@material-ui/core';

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Section4 = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);

  return (
    <section className='Container'>
      <Box className='mg-t-7'>
        <Grid container item xs={12}>
          <Grid item xs={12} sm={12} md={6}>
            <Typography className='f40 bold section4-title'>
              Welcome to DeviceList, Canada’s mobile device marketplace
            </Typography>
            <Box className='section4-button mobile'>
              <Button title='Our quality charter' bgcolor='#054DFA' borderR='20px'/>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Grid item container xs={12}>
              {data.devicelistData.slice(0,2).map((item:any, index:number) => {
                return (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box className='cart-device-list'>
                      <DeviceListComponent img={item.img} title={item.title} content={item.content} key={index} />
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box className='section4-button desktop'>
              <Button title='Our quality charter' bgcolor='#054DFA' borderR='20px'/>
            </Box>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} sm={12} md={3}></Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Grid item container xs={12}>
              {data.devicelistData.slice(2,5).map((item:any, index:number) => {
                return (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box className='cart-device-list'>
                      <DeviceListComponent img={item.img} title={item.title} content={item.content} key={index} />
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </section>
  )
}

export default Section4;
