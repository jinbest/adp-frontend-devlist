import React from "react"
import { Grid, Typography } from "@material-ui/core"
import { CardRepairSec3 } from "../../components"
import { useTranslation } from "react-i18next"
import { storesDetails } from "../../store"

type Props = {
  subDomain?: string
}

const Section3 = ({ subDomain }: Props) => {
  const data = storesDetails.storeCnts
  const repair = data.repairData.section3
  const [t] = useTranslation()

  return (
    <section className={subDomain + "-service-section-3"}>
      <div className={subDomain + "-Container"}>
        <Typography
          className={subDomain + "-service-section-title-2"}
          style={{ color: repair.themeCol }}
        >
          {t(repair.title)}
        </Typography>
        <Typography
          className={subDomain + "-service-section-content"}
          style={{ color: repair.themeCol }}
        >
          {t(repair.content)}
        </Typography>
        <Grid container item xs={12} spacing={2}>
          {repair.children.map((item: any, index: number) => {
            return (
              <Grid item xs={6} sm={6} md={3} key={index}>
                <CardRepairSec3
                  img={item.img}
                  subtitle={t(item.subtitle)}
                  content={t(item.subcontent)}
                  subDomain={subDomain}
                />
              </Grid>
            )
          })}
        </Grid>
      </div>
    </section>
  )
}

export default Section3
