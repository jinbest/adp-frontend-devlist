import React, { useEffect } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Grid, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core"
import { useT } from "../../i18n/index"
import { LangProps } from "../../i18n/en"
import { repairWidgetStore, storesDetails } from "../../store"
import CustomMap from "../../components/CustomMap"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { inject } from "mobx-react"
import { observer } from "mobx-react-lite"
import { StoresDetails } from "../../store/StoresDetails"
import { Link } from "react-router-dom"
import PhoneIcon from "@material-ui/icons/Phone"
import CallSplitIcon from "@material-ui/icons/CallSplit"
import { makeLocations } from "../../components/CustomizedMenus"
import { phoneFormatString } from "../../components/Header"

interface Props extends StoreProps {
  subDomain?: string
  locations: any[]
  handleStatus: (status: boolean) => void
  location_id: string | null
  handleLocationID: (id: string | null) => void
}

type StoreProps = {
  storesDetailsStore: StoresDetails
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
  by_appointment_only: boolean
}

const DAYS_OF_THE_WEEK: LangProps[] = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
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
      color: "white",
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
      color: "white",
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
      // justifyContent: "space-around",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "flex-start",
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
      order: 1,
      [theme.breakpoints.up("lg")]: {
        order: 1,
      },
    },
    item2: {
      order: 2,
      [theme.breakpoints.up("lg")]: {
        order: 2,
      },
    },
    directions: {
      color: "black",
      marginLeft: "10px",
      fontWeight: "bold",
      "&:hover": {
        color: "rgba(0,0,0,0.4)",
      },
    },
    nonHoverEffect: {
      textDecoration: "none !important",
      opacity: "1 !important",
      cursor: "default !important",
    },
    phoneText: {
      marginLeft: "10px",
      textDecoration: "none",
      "&:hover": {
        opacity: 0.6,
      },
    },
  })
)

const SectionMap = inject("storesDetailsStore")(
  observer(
    ({
      subDomain,
      locations,
      storesDetailsStore,
      handleStatus,
      location_id,
      handleLocationID,
    }: Props) => {
      const data = require(`../../assets/${subDomain}/Database`)
      const t = useT()
      const classes = useStyles()
      const [expanded, setExpanded] = React.useState<number | false>(0)
      const [selectedLocation, setSelectedLocation] = React.useState<null | any>(locations[0])
      const [isExpanded, setIsExpanded] = React.useState<boolean>(true)

      const handleLocSelect = (location: any) => {
        storesDetailsStore.cntUserLocation = makeLocations([location])
        storesDetailsStore.changeLocationID(location.id)
        storesDetailsStore.changeCntUserLocationSelected(true)
      }
      const handleGetQuote = () => {
        const cntAppointment: any = repairWidgetStore.appointResponse
        repairWidgetStore.init()
        repairWidgetStore.changeAppointResponse(cntAppointment)
        handleStatus(false)
      }

      useEffect(() => {
        if (!storesDetails.cntUserLocationSelected) return
        const loc_id = storesDetails.cntUserLocation[0].location_id
        handleLocationID(loc_id.toString())
        for (let i = 0; i < locations.length; i++) {
          if (parseInt(locations[i].id) === loc_id) {
            setExpanded(i)
            setIsExpanded(true)
            setSelectedLocation(locations[i])
            break
          }
        }
      }, [])

      useEffect(() => {
        if (!location_id) {
          return
        }
        for (let i = 0; i < locations.length; i++) {
          if (parseInt(locations[i].id) === parseInt(location_id)) {
            setExpanded(i)
            setIsExpanded(true)
            setSelectedLocation(locations[i])
            break
          }
        }
      }, [locations, location_id])

      const getAddress = (location: any) => {
        return `${location.address_1}, ${location.address_2 ? location.address_2 + ", " : ""}${
          location.city ? location.city + ", " : ""
        } ${location.state ? location.state + " " : ""} ${
          location.postcode
            ? location.postcode.substring(0, 3) +
              " " +
              location.postcode.substring(3, location.postcode.length)
            : ""
        }`
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
          if (hour >= 12) {
            AP = "p.m."
          } else {
            AP = "a.m."
          }
        }
        if (ptr.length > 1) {
          minute = ptr[1]
        }
        return `${hour % 12 === 0 ? 12 : hour % 12}:${minute} ${AP}`
      }
      const handleChange = (panel: number) => (_: React.ChangeEvent<any>, isExpanded: boolean) => {
        // setExpanded(isExpanded ? panel : false)
        // setIsExpanded(isExpanded)
        setExpanded(panel)
        setIsExpanded(true)
        if (storesDetailsStore.cntUserLocationSelected) {
          handleLocSelect(locations[panel])
        }
        if (isExpanded) {
          setSelectedLocation(locations[panel])
          handleLocationID(locations[panel].id)
        }
      }

      useEffect(() => {
        if (storesDetailsStore.cntUserLocationSelected && locations.length) {
          for (let i = 0; i < locations.length; i++) {
            if (storesDetailsStore.cntUserLocation[0].location_id === locations[i].id) {
              setSelectedLocation(locations[i])
              handleLocationID(locations[i].id)
              setExpanded(i)
              setIsExpanded(true)
              break
            }
          }
          return
        }
      }, [storesDetailsStore.cntUserLocation])

      return (
        <section className={subDomain + "-Container " + classes.root}>
          <Grid container style={{ marginTop: "180px", marginBottom: "100px" }}>
            <Grid item lg={6} md={12} sm={12} xs={12} className={classes.item1}>
              {locations.map((element, index) => (
                <Accordion key={index} expanded={expanded === index} onChange={handleChange(index)}>
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
                          <Grid item md={12} sm={6} xs={6} style={{ marginBottom: "20px" }}>
                            <p
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <PhoneIcon />
                              <a href={`tel:${element.phone}`} className={classes.phoneText}>
                                <span style={{ color: data.colorPalle.repairButtonCol }}>
                                  {phoneFormatString(element.phone)}
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
                              <a
                                href={`${
                                  element.business_page_link != null
                                    ? element.business_page_link
                                    : `https://www.google.com/maps/search/?api=1&query=${getAddress(
                                        element
                                      )
                                        .split(" ")
                                        .join("+")}`
                                }`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                <CallSplitIcon />
                                <span className={classes.directions}>{t("DIRECTIONS")}</span>
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
                                  backgroundColor: data.colorPalle.repairButtonCol,
                                  borderRadius: "20px",
                                }}
                                className={subDomain + "-button " + classes.getQuote}
                                onClick={() => {
                                  handleLocSelect(element)
                                }}
                              >
                                {t("GET_QUOTE")}
                              </button>
                            </Link>
                          </Grid>
                          <Grid item md={12} sm={6} xs={6} style={{ display: "flex" }}>
                            <Link
                              to="/get-quote"
                              style={{ textDecoration: "none" }}
                              onClick={handleGetQuote}
                            >
                              <button
                                style={{
                                  backgroundColor: data.colorPalle.repairButtonCol,
                                  borderRadius: "20px",
                                }}
                                className={subDomain + "-button " + classes.getAppoint}
                                onClick={() => {
                                  handleLocSelect(element)
                                }}
                              >
                                {t("BOOK_APPOINTMENT")}
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
                        className={subDomain + "-hours-div " + classes.timePanelWrapp}
                      >
                        <div>
                          <p className={subDomain + "-block-title"} style={{ textAlign: "start" }}>
                            {t("HOURS")}
                          </p>
                        </div>

                        {getRegularHours(element.location_hours).map((item, index) => (
                          <Grid key={index} item container md={12} sm={12} xs={12}>
                            <Grid item md={6} sm={6} xs={6}>
                              <p className={subDomain + "-block-content " + classes.nonHoverEffect}>
                                {t(DAYS_OF_THE_WEEK[item.day])}
                              </p>
                            </Grid>
                            <Grid item md={6} sm={6} xs={6}>
                              <p className={subDomain + "-block-content " + classes.nonHoverEffect}>
                                {!item.open || !item.close
                                  ? item.by_appointment_only
                                    ? t("CALL_TO_BOOK_APPOINTMENT")
                                    : t("CLOSED")
                                  : getHourType(item.open) + "-" + getHourType(item.close)}
                              </p>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12} className={classes.item2}>
              <CustomMap
                selectedLocation={selectedLocation}
                locations={locations}
                isDetail={isExpanded}
              />
            </Grid>
          </Grid>
        </section>
      )
    }
  )
)

export default SectionMap
