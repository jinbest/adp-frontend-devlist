import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import {CardRepairSec2} from '../../components'
import { useT, T } from '../../i18n/index'
import { storesDetails } from '../../store'

type Props = {
  subDomain?: string;
}

const Section2 = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);
  const repair = data.repairData.section2;
  const t = useT();

  return (
    <section className={subDomain + '-repair-section2'}>
      <div className={subDomain + '-Container ' + subDomain + '-repair-section2-text-field'}>
        <Typography className={subDomain + "-repair-section-title-1"} style={{color: repair.themeCol}}>
          {t(repair.title)}          
        </Typography>
        <Grid container item xs={12} spacing={2} className={subDomain + '-repair-sec-content-div'}>
          {repair.content.map((item:any, index:number) => {
            return (
              <Grid item xs={12} md={4} key={index}>
                <CardRepairSec2 type={item.type} subtitle={t(item.subtitle)} subDomain={subDomain}>
                  <T id={item.content} data={storesDetails.storesDetails.name} />
                </CardRepairSec2>
              </Grid>
            )
          })}
        </Grid>
      </div>
    </section>
  )
}

export default Section2
