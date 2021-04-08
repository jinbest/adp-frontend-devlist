import React, { useState, useEffect } from "react"
import { Grid, Box } from "@material-ui/core"
import { CardFix, ContentFix } from "../../components"
import { useTranslation } from "react-i18next"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import { Link } from "react-router-dom"
import { repairWidgetStore, storesDetails } from "../../store"

type Props = {
  subDomain?: string
  features: any[]
}

const Section2 = ({ subDomain, features }: Props) => {
  const data = storesDetails.storeCnts
  const thisPage = data.homepage.section2
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

  const handleRepairWidget = () => {
    const cntAppointment: any = repairWidgetStore.appointResponse
    repairWidgetStore.init()
    repairWidgetStore.changeAppointResponse(cntAppointment)
  }

  return (
    <FeatureToggles features={feats}>
      <Feature
        name="FRONTEND_REPAIR"
        inactiveComponent={() => <></>}
        activeComponent={() => (
          <section className={subDomain + "-Container"}>
            <h2 className={subDomain + "-section-title"}>{t(thisPage.title)}</h2>
            <div className={subDomain + "-card-customized-container-desktop"}>
              {thisPage.cards.map((item: any, index: number) => {
                return (
                  <Link
                    to="/get-quote"
                    className={subDomain + "-card-customized-item"}
                    key={index}
                    style={{ textDecoration: "none" }}
                    onClick={handleRepairWidget}
                  >
                    <CardFix
                      title={t(item.title)}
                      img={item.img}
                      key={index}
                      subDomain={subDomain}
                    />
                  </Link>
                )
              })}
            </div>
            <div className={subDomain + "-card-customized-container-mobile"}>
              {thisPage.cards.slice(0, 3).map((item: any, index: number) => {
                return (
                  <Link
                    to="/get-quote"
                    className={subDomain + "-card-customized-item"}
                    key={index}
                    style={{ textDecoration: "none" }}
                    onClick={handleRepairWidget}
                  >
                    <CardFix
                      title={t(item.title)}
                      img={item.img}
                      key={index}
                      subDomain={subDomain}
                    />
                  </Link>
                )
              })}
            </div>
            <div className={subDomain + "-card-customized-container-mobile"}>
              {thisPage.cards.slice(3, 5).map((item: any, index: number) => {
                return (
                  <Link
                    to="/get-quote"
                    className={subDomain + "-card-customized-item"}
                    key={index}
                    style={{ textDecoration: "none" }}
                    onClick={handleRepairWidget}
                  >
                    <CardFix
                      title={t(item.title)}
                      img={item.img}
                      key={index}
                      subDomain={subDomain}
                    />
                  </Link>
                )
              })}
            </div>
            <Grid container item xs={12} spacing={2}>
              {thisPage.contents.map((item: any, index: number) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box className={subDomain + "-cart-contentfix-container"}>
                      <ContentFix
                        title={t(item.title)}
                        content={t(item.content)}
                        themeCol={data.general.colorPalle.underLineCol}
                        key={index}
                        subDomain={subDomain}
                      />
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          </section>
        )}
      />
    </FeatureToggles>
  )
}

export default Section2
