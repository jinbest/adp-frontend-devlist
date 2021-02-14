import React, { useState, useEffect } from "react"
import { CardMobile } from "../../components"
import { Grid, Box, Typography } from "@material-ui/core"
import { Search } from "../../components"
import { useT } from "../../i18n/index"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"

type Props = {
    subDomain?: string
    features: any[]
}

const Section1 = ({ subDomain, features }: Props) => {
    const data = require(`../../assets/${subDomain}/Database`)
    const t = useT()

    const [feats, setFeatures] = useState<any[]>([])
    const [featSearch, setFeatSearch] = useState<any[]>([])
    const [gridMD, setGridMD] = useState(data.cardMobileData.gridMD)
    const [customeTitle, setCustomTitle] = useState("")

    useEffect(() => {
        const cntCardMobileData: any = data.cardMobileData.data
        const cntFeature: any[] = [],
            cntFeatSearch: any[] = []
        let cntCustomTitle = ""
        for (let j = 0; j < features.length; j++) {
            if (features[j].flag === "FRONTEND_TRADE" && features[j].isActive) {
                cntCustomTitle += cntCustomTitle ? ", " + t("TRADE") : t("TRADE")
            } else if (features[j].flag === "FRONTEND_REPAIR" && features[j].isActive) {
                cntCustomTitle += cntCustomTitle ? ", " + t("REPAIR") : t("REPAIR")
            } else if (features[j].flag === "FRONTEND_BUY" && features[j].isActive) {
                cntCustomTitle += cntCustomTitle ? ", " + t("BUY") : t("BUY")
            } else if (features[j].flag === "SEARCH" && features[j].isActive) {
                cntFeatSearch.push(features[j].flag)
            }
            for (let i = 0; i < cntCardMobileData.length; i++) {
                if (cntCardMobileData[i].flag === features[j].flag && features[j].isActive) {
                    cntFeature.push(cntCardMobileData[i].flag)
                }
            }
        }
        const cntGridMD = Math.round(12 / cntFeature.length)
        setFeatures(cntFeature)
        setFeatSearch(cntFeatSearch)
        setGridMD(cntGridMD)
        setCustomTitle(cntCustomTitle)
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

    return (
        <section className={subDomain + "-Container"}>
            <Grid item xs={12} sm={12} className={subDomain + "-section1-top"}>
                <h1 className={subDomain + "-section1-title"}>
                    {subDomain === "mobiletechlabs"
                        ? t(data.homeTextData.section1.title[0])
                        : customeTitle + " " + t(data.homeTextData.section1.title[0])}
                </h1>
                <h1 className={subDomain + "-section1-title"}>
                    {t(data.homeTextData.section1.title[1])}
                </h1>
                <Typography className={subDomain + "-section1-subtitle"}>
                    {t(data.homeTextData.section1.subtitle)}
                </Typography>

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
            <Grid
                container
                item
                xs={12}
                spacing={3}
                className={subDomain + "-sec1-card-mobile-data"}
            >
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
                                            heart={index === 0 ? data.cardMobileData.heart : ""}
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
            </Grid>
        </section>
    )
}

export default Section1
