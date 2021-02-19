import React, { useState, useEffect } from "react"
import { CardMobile, Button } from "../../components"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
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
import { StoresDetails } from "../../store/StoresDetails"
import { Link } from "react-router-dom"
import PhoneIcon from "@material-ui/icons/Phone"
import CallSplitIcon from "@material-ui/icons/CallSplit"
import { makeLocations } from "../../components/CustomizedMenus"
interface Props extends StoreProps {
    subDomain?: string
    features: any[]
    locations: any[]
    handleStatus: (status: boolean) => void
}
type StoreProps = {
    headerStore: StoresDetails
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
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        timePanelWrapp: {
            justifyContent: "space-around",
            [theme.breakpoints.down("sm")]: {
                justifyContent: "space-between",
                marginRight: "20%",
            },
            [theme.breakpoints.down("xs")]: {
                marginRight: "0px",
            },
        },

        item1: {
            order: 2,
            [theme.breakpoints.up("lg")]: {
                order: 1,
            },
        },
        item2: {
            order: 1,
            [theme.breakpoints.up("lg")]: {
                order: 2,
            },
        },
    })
)

const SectionMap = inject("headerStore")(
    observer(({ subDomain, features, locations, headerStore, handleStatus }: Props) => {
        const data = require(`../../assets/${subDomain}/Database`)
        const t = useT()
        const classes = useStyles()
        const [feats, setFeatures] = useState<any[]>([])
        const [featSearch, setFeatSearch] = useState<any[]>([])
        const [gridMD, setGridMD] = useState(data.cardMobileData.gridMD)
        const [customeTitle, setCustomTitle] = useState("")
        const [expanded, setExpanded] = React.useState<number | false>(false)
        const handleLocSelect = (location: any) => {
            headerStore.cntUserLocation = makeLocations([location])
            headerStore.changeLocationID(location.id)
            headerStore.changeCntUserLocationSelected(true)
        }

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
        const handleChange = (panel: number) => (
            _: React.ChangeEvent<any>,
            isExpanded: boolean
        ) => {
            setExpanded(isExpanded ? panel : false)
        }
        return (
            <section className={subDomain + "-Container"}>
                <Grid container className={subDomain + "-section1-top"}>
                    <Grid item lg={6} md={12} sm={12} xs={12} className={classes.item1}>
                        {locations.map((element, index) => (
                            <Accordion
                                key={index}
                                expanded={expanded === index}
                                onChange={handleChange(index)}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <h2>{getAddress(element)}</h2>
                                </AccordionSummary>
                                <AccordionDetails style={{ display: "block" }}>
                                    <Grid container>
                                        <Grid
                                            item
                                            container
                                            md={4}
                                            sm={12}
                                            xs={12}
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                height: "fit-content",
                                            }}
                                        >
                                            <Grid
                                                item
                                                container
                                                md={12}
                                                sm={12}
                                                xs={12}
                                                style={{ marginBottom: "20px" }}
                                            >
                                                <Grid
                                                    item
                                                    md={12}
                                                    sm={6}
                                                    xs={6}
                                                    style={{ marginBottom: "20px" }}
                                                >
                                                    <p
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <PhoneIcon />{" "}
                                                        <a href={`tel:${element.phone}`}>
                                                            <span style={{ marginLeft: "10px" }}>
                                                                {element.phone}
                                                            </span>
                                                        </a>
                                                    </p>
                                                </Grid>
                                                <Grid item md={12} sm={6} xs={6}>
                                                    <p
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <CallSplitIcon />{" "}
                                                        <span
                                                            style={{
                                                                marginLeft: "10px",
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            {" "}
                                                            Directions
                                                        </span>
                                                    </p>
                                                </Grid>
                                            </Grid>
                                            <Grid item container md={12} sm={12} xs={12}>
                                                <Grid
                                                    item
                                                    md={12}
                                                    sm={6}
                                                    xs={6}
                                                    style={{
                                                        marginBottom: "20px",
                                                        display: "flex",
                                                    }}
                                                >
                                                    <Link
                                                        to="/get-quote"
                                                        style={{
                                                            textDecoration: "none",
                                                            width: "60px",
                                                        }}
                                                        onClick={handleGetQuote}
                                                    >
                                                        <Button
                                                            title={t("GET_QUOTE")}
                                                            bgcolor={
                                                                data.colorPalle.repairButtonCol
                                                            }
                                                            width="150px"
                                                            borderR="20px"
                                                            subDomain={subDomain}
                                                            onClick={() => {
                                                                handleLocSelect(element)
                                                            }}
                                                        />
                                                    </Link>
                                                </Grid>
                                                <Grid
                                                    item
                                                    md={12}
                                                    sm={6}
                                                    xs={6}
                                                    style={{ display: "flex" }}
                                                >
                                                    <Link
                                                        to="/get-appointment"
                                                        style={{ textDecoration: "none" }}
                                                        onClick={handleGetQuote}
                                                    >
                                                        <Button
                                                            title={"Book Repair"}
                                                            bgcolor={
                                                                data.colorPalle.repairButtonCol
                                                            }
                                                            width="150px"
                                                            borderR="20px"
                                                            subDomain={subDomain}
                                                            onClick={() => {
                                                                handleLocSelect(element)
                                                            }}
                                                        />
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={8} sm={12} xs={12}>
                                            <div
                                                className={
                                                    subDomain +
                                                    "-hours-div " +
                                                    classes.timePanelWrapp
                                                }
                                                // style={{
                                                //     margin: "auto",
                                                //     justifyContent: "space-around",
                                                // }}
                                            >
                                                <div>
                                                    <p
                                                        className={subDomain + "-block-title"}
                                                        style={{ textAlign: "start" }}
                                                    >
                                                        {"Days"}
                                                    </p>{" "}
                                                    {getRegularHours(element.location_hours).map(
                                                        (element, index) => (
                                                            <p
                                                                key={index}
                                                                className={
                                                                    subDomain + "-block-content"
                                                                }
                                                            >
                                                                {DAYS_OF_THE_WEEK[element.day]}
                                                            </p>
                                                        )
                                                    )}
                                                </div>
                                                <div>
                                                    <p
                                                        className={subDomain + "-block-title"}
                                                        style={{ textAlign: "start" }}
                                                    >
                                                        {"Hours"}
                                                    </p>{" "}
                                                    {getRegularHours(element.location_hours).map(
                                                        (element, index) => (
                                                            <p
                                                                key={index}
                                                                className={
                                                                    subDomain + "-block-content"
                                                                }
                                                            >
                                                                {getHourType(element.open)}
                                                                {"-"}
                                                                {getHourType(element.close)}
                                                            </p>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12} className={classes.item2}>
                        <Map locations={locations} />
                    </Grid>
                </Grid>
            </section>
        )
    })
)

export default SectionMap
