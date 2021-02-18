import React, { useState, useEffect } from "react"
import { CardMobile } from "../../components"
import { Grid, Box, Typography } from "@material-ui/core"
import { Search, Button } from "../../components"
import { useT, T } from "../../i18n/index"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import { Link } from "react-router-dom"
import { repairWidgetStore } from "../../store"

type Props = {
    subDomain?: string
    features: any[]
    handleStatus: (status: boolean) => void
}

const Section1 = ({ subDomain, features, handleStatus }: Props) => {
    const data = require(`../../assets/${subDomain}/Database`)
    const t = useT()

    const [feats, setFeatures] = useState<any[]>([])
    const [featSearch, setFeatSearch] = useState<any[]>([])
    const [gridMD, setGridMD] = useState(data.cardMobileData.gridMD)
    // const [customeTitle, setCustomTitle] = useState("")

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
        // setCustomTitle(cntCustomTitle)
    }, [data, features, t])

    const handleGetQuote = () => {
        const cntAppointment: any = repairWidgetStore.appointResponse
        repairWidgetStore.init()
        repairWidgetStore.changeAppointResponse(cntAppointment)
        handleStatus(false)
    }

    return (
        <section className={subDomain + "-Container"}>
            <Grid item xs={12} sm={12} className={subDomain + "-section1-top"}>
                <h1 className={subDomain + "-section1-title"}>
                    {t("REPAIR_BUY_PROTECT_ESSENTIAL_MOBILE_DEVICE")}
                </h1>
                <Typography className={subDomain + "-section1-subtitle"}>
                    <T
                        id={"CITY_MOBILE_DEVICE_SPECIALISTS"}
                        data={data.homeTextData.section1.city}
                    />
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
        </section>
    )
}

export default Section1
