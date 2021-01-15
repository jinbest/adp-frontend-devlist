import React from 'react';
import { Typography, Grid, Box } from '@material-ui/core'
import { CardPopular } from '../../components'
import { useT } from '../../i18n/index'
import {LangProps} from '../../i18n/en'

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Section3 = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);
  const deviceCard = require(`../../assets/${subDomain}/img/device-card.png`);

  const t = useT();

  return (
    <section className='sec3-container-parent'>
      <div className='Container'>
        <Typography className='section-title'>
          {t(data.homeTextData.section3.title)}
        </Typography>
      </div>
      <div className='section3-back'>
        <div className='Container'>
          <Grid container item xs={12} spacing={2}>
            {data.popularCardData.map((item:any, index:number) => {
              return (
                <Grid item xs={6} sm={6} md={3} style={{paddingTop: '0px'}} key={index}>
                  <CardPopular 
                    title={item.title} 
                    subtitle={t(item.subtitle)} 
                    price={item.price} 
                    priceCol={data.colorPalle.priceCol}
                    img={item.img} 
                    key={index} 
                  />
                </Grid>
              )
            })}
          </Grid>
          <Box className='pd-t-5'>
            <Grid container item xs={12} spacing={2}>
              <Grid item sm={12} md={7}>
                <Typography className='section-title white' style={{color: data.homeTextData.section3.color}}>
                  {data.homeTextData.section3.subtitle.map((item:LangProps, index:number) => {
                    return (
                      <React.Fragment key={index}>
                        {t(item)} <br />
                      </React.Fragment>
                    )
                  })}
                </Typography>
                <Typography className='white f24'  style={{color: data.homeTextData.section3.color}}>
                  {t(data.homeTextData.section3.content)}
                </Typography>
              </Grid>
              <Grid item sm={12} md={5}>
                <img src={deviceCard.default} alt='device-list' className='card-img'/>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </section>
  )
}

export default Section3;
