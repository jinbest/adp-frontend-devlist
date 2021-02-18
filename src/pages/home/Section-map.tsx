import React, { useState, useEffect } from "react"
import { CardMobile, Button } from "../../components"
import {
    Grid,
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@material-ui/core"
import { useT } from "../../i18n/index"
import { repairWidgetStore } from "../../store"
import Map from "../../components/Map"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { inject } from "mobx-react"
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"

type Props = {
    subDomain?: string
    features: any[]
    locations: any[]
    handleStatus: (status: boolean) => void
}
interface LocationHour {
    close: string
    created_by: string
    created_date: string
    day: number
    deleted_by: string | null
    deleted_date: string | null
    id: number
    is_voided: boolean
    location_id: number
    modified_by: string | null
    modified_date: string | null
    open: string
    store_id: boolean
    type: "REGULAR" | "HOLIDAY"
}
const DAYS_OF_THE_WEEK = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]
const SectionMap = ({ subDomain, features, locations, handleStatus }: Props) => {
    const data = require(`../../assets/${subDomain}/Database`)
    const t = useT()

    const [feats, setFeatures] = useState<any[]>([])
    const [featSearch, setFeatSearch] = useState<any[]>([])
    const [gridMD, setGridMD] = useState(data.cardMobileData.gridMD)
    const [customeTitle, setCustomTitle] = useState("")
    const [expansion, setExpansion] = useState(false)

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

    const handleGetQuote = () => {
        const cntAppointment: any = repairWidgetStore.appointResponse
        repairWidgetStore.init()
        repairWidgetStore.changeAppointResponse(cntAppointment)
        handleStatus(false)
    }
    const getAddress = (location: any) => {
        return `${location.address_1}, ${location.address_2 ? location.address_2 + ", " : ""}${
            location.city
        }, ${location.postcode}, ${location.country}`
    }
    const getRegularHours = (hours: any[]) => {
        return hours
            .map((v) => v as LocationHour)
            .filter((p) => {
                return p.type == "REGULAR"
            })
            .sort((d) => d.day)
    }
    const getHourType = (hourStr: string) => {
        const ptr = hourStr.split(":")
        let hour = 12,
            minute = "00"
        let AP = "a.m."
        if (ptr.length > 0) {
            hour = parseInt(ptr[0])
            hour = hour % 12
            if (hour / 12 > 1) {
                AP = "p.m."
            } else {
                AP = "a.m."
            }
        }
        if (ptr.length > 1) {
            minute = ptr[1]
        }
        return `${hour}:${minute} ${AP}`
    }
    return (
        <div className={subDomain + "-section-map-wrapp"}>
            <Grid container className={subDomain + "-section1-top"}>
                <Grid item md={6} sm={6} xs={12}>
                    {locations.map((element, index) => (
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <h2>{getAddress(element)}</h2>
                            </AccordionSummary>
                            <AccordionDetails style={{ display: "block" }}>
                                <Grid container>
                                    <Grid item md={5} sm={12} xs={12}>
                                        <Link
                                            to="/get-quote"
                                            style={{ textDecoration: "none", width: "60px" }}
                                            onClick={handleGetQuote}
                                        >
                                            <Button
                                                title={t("GET_QUOTE")}
                                                bgcolor={data.colorPalle.repairButtonCol}
                                                borderR="20px"
                                                subDomain={subDomain}
                                                // width="50%"
                                            />
                                        </Link>
                                    </Grid>
                                    <Grid item md={7} sm={12} xs={12}>
                                        <Link
                                            to="/get-appointment"
                                            style={{ textDecoration: "none" }}
                                            onClick={handleGetQuote}
                                        >
                                            <Button
                                                title={"Get Appointment"}
                                                bgcolor={data.colorPalle.repairButtonCol}
                                                borderR="20px"
                                                subDomain={subDomain}
                                                // width="70%"
                                            />
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Box style={{ padding: "10px", margin: "auto" }}>
                                    <span>
                                        phone: <a href={`tel:${element.phone}`}>{element.phone}</a>
                                    </span>
                                    <p
                                        className={subDomain + "-block-title"}
                                        style={{ textAlign: "center" }}
                                    >
                                        {"Hours"}
                                    </p>
                                    <div
                                        className={subDomain + "-hours-div"}
                                        style={{ margin: "auto", justifyContent: "center" }}
                                    >
                                        <div>
                                            {getRegularHours(element.location_hours).map(
                                                (element, index) => (
                                                    <p
                                                        key={index}
                                                        className={subDomain + "-block-content"}
                                                    >
                                                        {DAYS_OF_THE_WEEK[element.day]}
                                                    </p>
                                                )
                                            )}
                                        </div>
                                        <div>
                                            {getRegularHours(element.location_hours).map(
                                                (element, index) => (
                                                    <p
                                                        key={index}
                                                        className={subDomain + "-block-content"}
                                                    >
                                                        {getHourType(element.open)}
                                                        {"-"}
                                                        {getHourType(element.close)}
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        // <Box key={index}>
                        //         <h2>{getAddress(element)}</h2>
                        //         <Box style={{ display: "flex", width: "100%" }}>
                        //             <Box style={{ width: "100%" }}>
                        //                 <Link
                        //                     to="/get-quote"
                        //                     style={{ textDecoration: "none", width: "60px" }}
                        //                     onClick={handleGetQuote}
                        //                 >
                        //                     <Button
                        //                         title={t("GET_QUOTE")}
                        //                         bgcolor={data.colorPalle.repairButtonCol}
                        //                         borderR="20px"
                        //                         subDomain={subDomain}
                        //                         width="50%"
                        //                     />
                        //                 </Link>
                        //             </Box>
                        //             <Box style={{ width: "100%" }}>
                        //                 <Link
                        //                     to="/get-appointment"
                        //                     style={{ textDecoration: "none" }}
                        //                     onClick={handleGetQuote}
                        //                 >
                        //                     <Button
                        //                         title={"Get Appointment"}
                        //                         bgcolor={data.colorPalle.repairButtonCol}
                        //                         borderR="20px"
                        //                         subDomain={subDomain}
                        //                         width="70%"
                        //                     />
                        //                 </Link>
                        //             </Box>
                        //         </Box>
                        //         <span>phone: {element.phone}</span>
                        //         <div>
                        //             {`M - F: 10:00 am – 8:00 pm Saturday - Sunday: 10:00 am – 6:00 pm`}
                        //         </div>
                        //     </Box>
                    ))}
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <Map locations={locations} />
                </Grid>
            </Grid>
        </div>
    )
}

export default SectionMap
