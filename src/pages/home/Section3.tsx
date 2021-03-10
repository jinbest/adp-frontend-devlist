import React, { useState, useEffect } from "react"
import { Typography, Grid, Box } from "@material-ui/core"
import { CardPopular } from "../../components"
import { useTranslation } from "react-i18next"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"

type Props = {
  subDomain?: string
  features: any[]
}

const Section3 = ({ subDomain, features }: Props) => {
  const data = require(`../../assets/${subDomain}/Database`)
  const commonData = require("../../assets/_common/mockData")
  const deviceCard = data.deviceCard
  const [t] = useTranslation()

  const [feats, setFeatures] = useState<any[]>([])

  useEffect(() => {
    const cntFeatures: any[] = []
    for (let i = 0; i < features.length; i++) {
      if (features[i].isActive) {
        cntFeatures.push(features[i].flag)
      }
    }
    setFeatures(cntFeatures)
  }, [features, data])

  return (
    <FeatureToggles features={feats}>
      <Feature
        name={"FRONTEND_ONLINE_PURCHASE"}
        inactiveComponent={() => <></>}
        activeComponent={() => (
          <section className={subDomain + "-sec3-container-parent"}>
            <div className={subDomain + "-Container"}>
              <Typography className={subDomain + "-section-title"}>
                {t(data.homeTextData.section3.title)}
              </Typography>
            </div>
            <div className={subDomain + "-section3-back"}>
              <div className={subDomain + "-Container"}>
                <Grid container item xs={12} spacing={2}>
                  {commonData.popularCardData.map((item: any, index: number) => {
                    return (
                      <Grid item xs={6} sm={6} md={3} style={{ paddingTop: "0px" }} key={index}>
                        <CardPopular
                          title={item.title}
                          subtitle={t(item.subtitle)}
                          price={item.price}
                          priceCol={data.colorPalle.priceCol}
                          img={item.img}
                          key={index}
                          subDomain={subDomain}
                        />
                      </Grid>
                    )
                  })}
                </Grid>
                <Box className="pd-t-5">
                  <Grid container item xs={12} spacing={2}>
                    <Grid item sm={12} md={7}>
                      <Typography
                        className={subDomain + "-section-title white"}
                        style={{ color: data.homeTextData.section3.color }}
                      >
                        {data.homeTextData.section3.subtitle.map((item: string, index: number) => {
                          return (
                            <React.Fragment key={index}>
                              {t(item)} <br />
                            </React.Fragment>
                          )
                        })}
                      </Typography>
                      <Typography
                        className="white f24"
                        style={{ color: data.homeTextData.section3.color }}
                      >
                        {t(data.homeTextData.section3.content)}
                      </Typography>
                    </Grid>
                    <Grid item sm={12} md={5}>
                      <img
                        src={deviceCard.img}
                        alt="device-list"
                        className={subDomain + "-card-img"}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
          </section>
        )}
      />
    </FeatureToggles>
  )
}

export default Section3
