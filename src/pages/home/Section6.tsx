import React from "react"
import { CardWhyCustomer } from "../../components"
import { Typography, Grid, Box } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import { storesDetails } from "../../store"

type Props = {
  subDomain?: string
}

const Section6 = ({ subDomain }: Props) => {
  const data = storesDetails.storeCnts
  const [t] = useTranslation()

  return (
    <section className={subDomain + "-Container center " + subDomain + "-sec6-container"}>
      <Typography className="f40 bold mg-t-1">
        {`${t("See Why Customers Love")} ${storesDetails.storesDetails.name
          .replace(/ Inc/g, "")
          .replace(/ Inc./g, "")}`}
      </Typography>
      {/* <Typography className="f24">{t("View More")}</Typography> */}
      <Grid container item xs={12} spacing={2} className={subDomain + "-sec6-card"}>
        {data.homeTextData.section6.review.map((item: any, index: number) => {
          return (
            <Grid item xs={12} md={4} key={index}>
              <Box className={subDomain + "-sec6-card"}>
                <CardWhyCustomer
                  key={index}
                  score={item.score}
                  days={item.days}
                  content={item.content}
                  reviewer={item.reviewer}
                  subDomain={subDomain}
                />
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </section>
  )
}

export default Section6
