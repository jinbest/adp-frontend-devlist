import React from "react"
import { Grid, Typography } from "@material-ui/core"
import { CardRepairSec2 } from "../../components"
import { useTranslation } from "react-i18next"
import { storesDetails } from "../../store"

type Props = {
  subDomain?: string
}

const Section2 = ({ subDomain }: Props) => {
  const data = require(`../../assets/${subDomain}/Database`)
  const repair = data.repairData.section2
  const [t] = useTranslation()

  return (
    <section className={subDomain + "-service-section2"}>
      <div className={subDomain + "-Container " + subDomain + "-service-section2-text-field"}>
        <Typography
          className={subDomain + "-service-section-title-1"}
          style={{ color: repair.themeCol, textShadow: `1px 0 ${repair.themeCol}` }}
        >
          {t(repair.title)}
        </Typography>
        <Grid container item xs={12} spacing={2} className={subDomain + "-repair-sec-content-div"}>
          {repair.content.map((item: any, index: number) => {
            return (
              <Grid item xs={12} md={4} key={index}>
                <CardRepairSec2 type={item.type} subtitle={t(item.subtitle)} subDomain={subDomain}>
                  {item.type === "ReceiveDevice"
                    ? `${storesDetails.storesDetails.name} ${t(item.content)}`
                    : t(item.content)}
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
