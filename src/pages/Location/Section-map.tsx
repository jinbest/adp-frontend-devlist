import React from "react"
import Button from "@material-ui/core/Button"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Grid, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core"
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
        root: {
            [theme.breakpoints.down("sm")]: {
                justifyContent: "space-between",
                "& h2": {
                    fontSize: " 18px",
                },
                "& span": {
                    fontSize: "12px",
                },
            },
            [theme.breakpoints.down("xs")]: {
                "& h2": {
                    fontSize: " 18px",
                },
                "& span": {
                    fontSize: "12px",
                },
            },
        },
        getQuote: {
            width: "170px",
            fontSize: "13px!important" as any,
            [theme.breakpoints.down("sm")]: {
                width: "120px",
                fontSize: "12px!important" as any,
            },
            [theme.breakpoints.down("xs")]: {
                width: "80px",
                fontSize: "10px!important" as any,
            },
        },
        getAppoint: {
            width: "170px",
            fontSize: "13px!important" as any,
            [theme.breakpoints.down("sm")]: {
                width: "170px",
                fontSize: "12px!important" as any,
            },
            [theme.breakpoints.down("xs")]: {
                width: "130px",
                fontSize: "10px!important" as any,
            },
        },
        timePanelWrapp: {
            justifyContent: "space-around",
            [theme.breakpoints.down("sm")]: {
                justifyContent: "space-between",
                "& p": {
                    fontSize: "16px",
                },
            },
            [theme.breakpoints.down("xs")]: {
                "& p": {
                    fontSize: "12px",
                },
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
    observer(({ subDomain, locations, headerStore, handleStatus }: Props) => {
        const data = require(`../../assets/${subDomain}/Database`)
        const t = useT()
        const classes = useStyles()
        const [expanded, setExpanded] = React.useState<number | false>(false)
        const handleLocSelect = (location: any) => {
            headerStore.cntUserLocation = makeLocations([location])
            headerStore.changeLocationID(location.id)
            headerStore.changeCntUserLocationSelected(true)
        }
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
            <section className={subDomain + "-Container " + classes.root}>
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
                                                        {" "}
                                                        <a
                                                            href={`https://www.google.com/maps/search/?api=1&query=${element.latitude},${element.longitude}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            style={{
                                                                textDecoration: "none",
                                                                color: "black",
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
                                                        </a>
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
                                                        <button
                                                            style={{
                                                                backgroundColor:
                                                                    data.colorPalle.repairButtonCol,
                                                                borderRadius: "20px",
                                                            }}
                                                            className={
                                                                subDomain +
                                                                "-button " +
                                                                classes.getQuote
                                                            }
                                                            onClick={() => {
                                                                handleLocSelect(element)
                                                            }}
                                                        >
                                                            {t("GET_QUOTE")}
                                                        </button>
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
                                                        to="/get-quote"
                                                        style={{ textDecoration: "none" }}
                                                        onClick={handleGetQuote}
                                                    >
                                                        <button
                                                            style={{
                                                                backgroundColor:
                                                                    data.colorPalle.repairButtonCol,
                                                                borderRadius: "20px",
                                                            }}
                                                            className={
                                                                subDomain +
                                                                "-button " +
                                                                classes.getAppoint
                                                            }
                                                            onClick={() => {
                                                                handleLocSelect(element)
                                                            }}
                                                        >
                                                            {t("BOOK_AN_APPOINTMENT")}
                                                        </button>
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            item
                                            container
                                            md={8}
                                            sm={12}
                                            xs={12}
                                            className={
                                                subDomain + "-hours-div " + classes.timePanelWrapp
                                            }
                                        >
                                            <div>
                                                <p
                                                    className={subDomain + "-block-title"}
                                                    style={{ textAlign: "start" }}
                                                >
                                                    {"Days"}
                                                </p>{" "}
                                            </div>

                                            {getRegularHours(element.location_hours).map(
                                                (element, index) => (
                                                    <Grid
                                                        key={index}
                                                        item
                                                        container
                                                        md={12}
                                                        sm={12}
                                                        xs={12}
                                                    >
                                                        <Grid md={6} sm={6} xs={6}>
                                                            <p
                                                                className={
                                                                    subDomain + "-block-content"
                                                                }
                                                            >
                                                                {DAYS_OF_THE_WEEK[element.day]}
                                                            </p>
                                                        </Grid>
                                                        <Grid md={6} sm={6} xs={6}>
                                                            <p
                                                                className={
                                                                    subDomain + "-block-content"
                                                                }
                                                            >
                                                                {getHourType(element.open)}
                                                                {"-"}
                                                                {getHourType(element.close)}
                                                            </p>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            )}
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
