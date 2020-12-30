import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import {CardRepairSec3} from '../../components'

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Section3 = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);
  const repair = data.repairData.section3
  return (
    <section className=''>
      <div className='Container'>
        <Typography className="repair-section-title-2" style={{color: repair.themeCol}}>
          {repair.title}
        </Typography>
        <Typography className="repair-section-content" style={{color: repair.themeCol}}>
          {repair.content}
        </Typography>
        <Grid container item xs={12} spacing={2}>
          {repair.children.map((item:any, index:number) => {
            return (
              <Grid item xs={6} sm={6} md={3} key={index}>
                <CardRepairSec3 img={item.img} subtitle={item.subtitle} content={item.subcontent} />
              </Grid>
            )
          })}
        </Grid>
      </div>
    </section>
  )
}

export default Section3
