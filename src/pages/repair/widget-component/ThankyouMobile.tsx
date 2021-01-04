import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Card } from './'

type Props = {
  params: any;
}


const ThankyouMobile = ({params}: Props) => {

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Card className='thankyou-mobile-card'>
        <div className='repair-choose-device-container'>
          <Typography className='thankyou-mobile-title'>
            Thank you for choosing Mobile Tech Lab for your repair!
          </Typography>
          <Typography className='thankyou-mobile-content'>
            You will receive {params.pref} <b>{params.method}</b> at <b>{params.at}</b> shortly, with a detailed service quote.
          </Typography>
          <Grid container className='thankyou-mobile-detail-container' spacing={3}>
            <Grid item xs={12} sm={6} className='every-container'>
              <Typography className='topic'>Your Information</Typography>
              <Typography className='details'>John Smith</Typography>
              <Typography className='details'>devicelist@outlook.com</Typography>
              <Typography className='details'>(204)555-5555</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='every-container'>
              <Typography className='topic'>Preferred Contact Method</Typography>
              <Typography className='details'>Email</Typography>
            </Grid>
          </Grid>
          <Grid container className='thankyou-mobile-detail-container' spacing={3}>
            <Grid item xs={12} sm={6} className='every-container'>
              <Typography className='topic'>Delivery Method</Typography>
              <Typography className='details' style={{color: params.themeCol}}>Pick-Up & Drop-Off Service</Typography>
              <Typography className='details bolder'>Pick-Up From</Typography>
              <Typography className='details'>111 Mailing Street, lqaluit NU</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='every-container'>
              <Typography className='topic'>Message</Typography>
              <Typography className='details'>Can't wait to fix my phone!</Typography>
            </Grid>
          </Grid>
          <div className='thankyou-mobile-detail-container'>
            <div className='thankyou-flex-container bordered'>
              <Typography className='topic'>Device</Typography>
              <Typography className='topic'>Repair Service</Typography>
            </div>
            <div className='thankyou-flex-container'>
              <Typography className='details'>Apple iPhone 11</Typography>
              <Typography className='details'>Screen, Charging Port</Typography>
            </div>
            <div className='thankyou-flex-container'>
              <Typography className='details'>Apple iPhone 11</Typography>
              <Typography className='details'>Camera (Back), Charging Port</Typography>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ThankyouMobile
