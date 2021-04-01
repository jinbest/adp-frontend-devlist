import React, { useState, useEffect } from "react"
// import { CardMobile } from "../../components"
import { Grid, Box, Typography } from "@material-ui/core"
import { Search, Button } from "../../components"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import { Link } from "react-router-dom"
import { repairWidgetStore, storesDetails } from "../../store"
import { useTranslation } from "react-i18next"

type Props = {
  subDomain?: string
  features: any[]
  handleStatus: (status: boolean) => void
}

const Section1 = ({ subDomain, features, handleStatus }: Props) => {
  const data = storesDetails.storeCnts
  const [t] = useTranslation()

  const [feats, setFeatures] = useState<any[]>([])
  const [featSearch, setFeatSearch] = useState<any[]>([])
  // const [gridMD, setGridMD] = useState(data.cardMobileData.gridMD)

  useEffect(() => {
    // const cntCardMobileData: any = data.cardMobileData.data
    const cntFeature: any[] = [],
      cntFeatSearch: any[] = []
    for (let j = 0; j < features.length; j++) {
      if (features[j].flag === "SEARCH" && features[j].isActive) {
        cntFeatSearch.push(features[j].flag)
      }
      if (features[j].isActive) {
        cntFeature.push(features[j].flag)
      }
    }
    // const cntGridMD = Math.round(12 / cntFeature.length)
    setFeatures(cntFeature)
    setFeatSearch(cntFeatSearch)
    // setGridMD(cntGridMD)
  }, [data, features, t])

  /* -------------------  handleScroll for show/hide Search-bar regarding on pageYOffset ---------------------------
  |   const [scrollPosition, setScrollPosition] = useState(0);                                                      |
  |   const [searchBarVisible, setSearchBarVisible] = useState(true);                                               |
  |   const handleScroll = () => {                                                                                  |
  |     const position = window.pageYOffset;                                                                        |
  |     setScrollPosition(position);                                                                                |
  |   };                                                                                                            |
  |   useEffect(() => {                                                                                             |
  |     window.addEventListener('scroll', handleScroll, { passive: true });                                         |
  |     return () => {                                                                                              |
  |       window.removeEventListener('scroll', handleScroll);                                                       |
  |     };                                                                                                          |
  |   }, []);                                                                                                       |
  |   useEffect(() => {                                                                                             |
  |     if (scrollPosition > 460) {                                                                                 |
  |       setSearchBarVisible(false);                                                                               |
  |     } else {                                                                                                    |
  |       setSearchBarVisible(true);                                                                                |
  |     }                                                                                                           |
  |   }, [scrollPosition]);                                                                                         |
  |   useEffect(() => {                                                                                             |
  |     const headerSearch = document.getElementById('header-search') as HTMLElement;                               |
  |     searchBarVisible ? headerSearch.style.visibility = 'hidden' : headerSearch.style.visibility = 'visible';    |
  |   }, [searchBarVisible])                                                                                        |
  ---------------------------------------------------------------------------------------------------------------- */

  const handleGetQuote = () => {
    const cntAppointment: any = repairWidgetStore.appointResponse
    repairWidgetStore.init()
    repairWidgetStore.changeAppointResponse(cntAppointment)
    handleStatus(false)
  }

  return (
    <section className={subDomain + "-Container"}>
      <Grid item xs={12} sm={12} className={subDomain + "-section1-top"}>
        <h1 className={subDomain + "-section1-title"}>{t(data.homeTextData.section1.title)}</h1>
        <Typography className={subDomain + "-section1-subtitle"}>
          {t(data.homeTextData.section1.subtitle)}
        </Typography>
        <div style={{ display: "flex" }}>
          <Box className={subDomain + "-service-section-button"} style={{ margin: "initial" }}>
            <Link
              to={data.homeTextData.section1.quoteBtn.link}
              style={{ textDecoration: "none" }}
              onClick={handleGetQuote}
            >
              <Button
                title={t(data.homeTextData.section1.quoteBtn.title)}
                bgcolor={data.colorPalle.repairButtonCol}
                borderR="20px"
                subDomain={subDomain}
                width="90%"
              />
            </Link>
          </Box>
          <FeatureToggles features={feats}>
            <Feature
              name={"FRONTEND_REPAIR_APPOINTMENT"}
              inactiveComponent={() => <></>}
              activeComponent={() => (
                <Box
                  className={subDomain + "-service-section-button"}
                  style={{ margin: "initial" }}
                >
                  <Link
                    to={data.homeTextData.section1.appointmentBtn.link}
                    style={{ textDecoration: "none" }}
                    onClick={handleGetQuote}
                  >
                    <Button
                      title={t(data.homeTextData.section1.appointmentBtn.title)}
                      bgcolor={data.colorPalle.repairButtonCol}
                      borderR="20px"
                      subDomain={subDomain}
                      width="90%"
                    />
                  </Link>
                </Box>
              )}
            />
          </FeatureToggles>
        </div>

        <FeatureToggles features={featSearch}>
          <Feature
            name={"FRONTEND_GLOBAL_SEARCH"}
            inactiveComponent={() => <></>}
            activeComponent={() => (
              <Box className={subDomain + "-sec1-search_input"}>
                <Search
                  placeholder={data.homeTextData.section1.searchPlaceholder}
                  color="white"
                  bgcolor={data.colorPalle.themeColor}
                  height="60px"
                  subDomain={subDomain}
                  handleChange={() => {}}
                  handleIconClick={() => {}}
                />
              </Box>
            )}
          />
        </FeatureToggles>
      </Grid>

      {/* <Grid container item xs={12} spacing={3} className={subDomain + "-sec1-card-mobile-data"}>
        {data.cardMobileData.data.map((item: any, index: number) => {
          return (
            <FeatureToggles features={feats} key={index}>
              <Feature
                name={item.flag}
                inactiveComponent={() => <></>}
                activeComponent={() => (
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={gridMD}
                    style={{
                      paddingTop: "0px",
                      margin: "0 auto 5px",
                      maxWidth: "500px",
                    }}
                  >
                    <CardMobile
                      title={t(item.title)}
                      img={item.img}
                      btnTitle={item.btnTitle}
                      color={data.colorPalle.orange}
                      key={index}
                      heart={index === 0 ? require('../../assets/_common/img/heart.png').default : ""}
                      heartCol={data.colorPalle.heartCol}
                      subDomain={subDomain}
                      href={item.href}
                    />
                  </Grid>
                )}
              />
            </FeatureToggles>
          )
        })}
      </Grid> */}
    </section>
  )
}

export default Section1
