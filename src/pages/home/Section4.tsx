import React from 'react';
import {DeviceListComponent} from '../../components'
import {Button} from '../../components'
import { Typography, Grid, Box } from '@material-ui/core';
import { useT } from '../../i18n/index'
import {LangProps} from '../../i18n/en'

type Props = {
  subDomain?: string;
}

const Section4 = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);
  const t =useT();

  return (
    <div className='sec4-background'>
      <section className='Container'>
        <Box className='mg-t-7 sec4-container-box'>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography className='f40 bold section4-title'>
                {t(data.homeTextData.section4.title)}
              </Typography>
              <Box className='section4-button mobile'>
                <Button 
                  title={data.homeTextData.section4.btnTitle} 
                  bgcolor={data.colorPalle.themeColor} 
                  borderR='20px'
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Grid item container xs={12}>
                {data.devicelistData.slice(0,2).map((item:any, index:number) => {
                  return (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box className='cart-device-list'>
                        <DeviceListComponent img={item.img} title={t(item.title)} content={t(item.content)} key={index} />
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box className='section4-button desktop'>
                <Button title={data.homeTextData.section4.btnTitle} bgcolor={data.colorPalle.themeColor} borderR='20px'/>
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
                        <DeviceListComponent img={item.img} title={t(item.title)} content={t(item.content)} key={index} />
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box className='mg-t-7 sec4-container-special-box'>
          <Grid container item xs={12}>
            <Typography className='f40 bold section-title'>
              {t(data.homeTextData.section4.title)}
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <div style={{display: 'flex'}}>
              {data.devicelistData.map((item:any, index:number) => {
                return (
                  <Box className='cart-device-list' key={index}>
                    <DeviceListComponent img={item.img} title={t(item.title)} content={t(item.content)} key={index} />
                  </Box>
                )
              })}
            </div>
          </Grid>
        </Box>
      </section>
    </div>
  )
}

export default Section4;
