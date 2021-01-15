import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import {CardRepairSec3} from '../../components'
import { useT } from '../../i18n/index'

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Section3 = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);
  const repair = data.repairData.section3;
  const t = useT();

  return (
    <section className='repair-section-3'>
      <div className='Container'>
        <Typography className="repair-section-title-2" style={{color: repair.themeCol}}>
          {t(repair.title)}
        </Typography>
        <Typography className="repair-section-content" style={{color: repair.themeCol}}>
          {t(repair.content)}
        </Typography>
        <Grid container item xs={12} spacing={2}>
          {repair.children.map((item:any, index:number) => {
            return (
              <Grid item xs={6} sm={6} md={3} key={index}>
                <CardRepairSec3 img={item.img} subtitle={t(item.subtitle)} content={t(item.subcontent)} />
              </Grid>
            )
          })}
        </Grid>
      </div>
    </section>
  )
}

export default Section3
