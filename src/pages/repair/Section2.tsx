import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import {CardRepairSec2} from '../../components'

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Section2 = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);
  const repair = data.repairData.section2
  return (
    <section className='repair-section2'>
      <div className='Container repair-section2-text-field'>
        <Typography className="repair-section-title-1" style={{color: repair.themeCol}}>
          {repair.title}
        </Typography>
        <Grid container>
          {repair.content.map((item:any, index:number) => {
            return (
              <Grid item xs={12} sm={4} className='repair-sec-content-div' key={index}>
                <CardRepairSec2 img={item.img} subtitle={item.subtitle} content={item.content} />
              </Grid>              
            )
          })}
        </Grid>
      </div>
    </section>
  )
}

export default Section2
