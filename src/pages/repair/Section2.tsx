import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import {CardRepairSec2} from '../../components'
import { useT } from '../../i18n/index'

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Section2 = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);
  const repair = data.repairData.section2;
  const t = useT();

  return (
    <section className='repair-section2'>
      <div className='Container repair-section2-text-field'>
        <Typography className="repair-section-title-1" style={{color: repair.themeCol}}>
          {t(repair.title)}
        </Typography>
        <Grid container item xs={12} spacing={2} className='repair-sec-content-div'>
          {repair.content.map((item:any, index:number) => {
            return (
              <Grid item xs={12} md={4} key={index}>
                <CardRepairSec2 img={item.img} subtitle={t(item.subtitle)} content={t(item.content)} />
              </Grid>
            )
          })}
        </Grid>
      </div>
    </section>
  )
}

export default Section2
