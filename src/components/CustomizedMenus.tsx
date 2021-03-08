import React, { useState, useEffect } from "react"
import { withStyles, createStyles, makeStyles } from "@material-ui/core/styles"
import Menu, { MenuProps } from "@material-ui/core/Menu"
import { Button, InputComponent } from "./"
import { useT } from "../i18n/index"
import { LangProps } from "../i18n/en"
import { repairWidgetStore } from "../store/"
import { findLocationAPI } from "../services/"
import { Link } from "react-router-dom"
import { GetCurrentLocParams } from "../model/get-current-location"
import { StoresDetails } from "../store/StoresDetails"
import { inject, observer } from "mobx-react"
import { ToastMsgParams } from "./toast/toast-msg-params"
import Toast from "./toast/toast"
import Loading from "./Loading"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"

export function makeLocations(data: any[]) {
  const locations: GetCurrentLocParams[] = []
  const days: any[] = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
  for (let i = 0; i < data.length; i++) {
    const hours: any[] = [],
      weekDays: any[] = [],
      storeGroup: any[] = []
    for (let j = 0; j < data[i].location_hours.length; j++) {
      if (data[i].location_hours[j].type === "REGULAR") {
        const cntStoreID = data[i].location_hours[j].store_id
        if (!storeGroup.includes(cntStoreID)) {
          storeGroup.push(cntStoreID)
          hours.push({ store_id: cntStoreID, hrs: [] })
          weekDays.push({ store_id: cntStoreID, wkDys: [] })
        }
        let hour = ""
        if (!data[i].location_hours[j].open || !data[i].location_hours[j].close) {
          hour = "CLOSED"
        } else {
          const open: string =
            (parseInt(data[i].location_hours[j].open.split(":")[0]) % 12) +
            ":" +
            data[i].location_hours[j].open.split(":")[1] +
            " a.m."
          const close: string =
            (parseInt(data[i].location_hours[j].close.split(":")[0]) % 12) +
            ":" +
            data[i].location_hours[j].close.split(":")[1] +
            " p.m."
          hour = open + " - " + close
        }
        for (let k = 0; k < hours.length; k++) {
          if (cntStoreID === hours[k].store_id) {
            hours[k].hrs.push(hour)
            weekDays[k].wkDys.push(days[data[i].location_hours[j].day])
            break
          }
        }
      }
    }
    const cntItem: GetCurrentLocParams = {
      location_name: data[i].location_name,
      address_1: data[i].address_1,
      address_2: data[i].address_2,
      distance: data[i].distance ? (data[i].distance / 1000).toFixed(1) + "km" : "",
      location_id: data[i].id,
      hours: hours,
      days: weekDays,
      latitude: data[i].latitude,
      longitude: data[i].longitude,
      business_page_link: data[i].business_page_link,
    }
    locations.push(cntItem)
  }
  return locations
}

const StyledMenu = withStyles({
  paper: {
    borderRadius: "15px",
    boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
    overflow: "inherit !important",
    marginTop: "5px",
    border: "1px solid #C4C4C4",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))

const useStyles = makeStyles(() =>
  createStyles({
    nonHoverEffect: {
      textDecoration: "none !important",
      opacity: "1 !important",
      cursor: "default !important",
    },
  })
)

type StoreProps = {
  storesDetailsStore: StoresDetails
}
interface Props extends StoreProps {
  subDomain?: string
  btnTitle: LangProps
  width: string
  features: any[]
}

const CustomizedMenus = inject("storesDetailsStore")(
  observer((props: Props) => {
    const { subDomain, btnTitle, width, storesDetailsStore, features } = props

    const data = require(`../assets/${subDomain}/Database`)
    const themeColor = data.colorPalle.themeColor
    const underLineCol = data.colorPalle.underLineCol
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const t = useT()
    const [pos, setPos] = useState({ latitude: "", longitude: "" })
    const [locSelStatus, setLocSelStatus] = useState(storesDetailsStore.cntUserLocationSelected)
    const [locations, setLocations] = useState<any[]>(storesDetailsStore.cntUserLocation)
    const [requireUserInfo, setRequireUserInfo] = useState(false)
    const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
    const [postCode, setPostCode] = useState("")
    const [isRequest, setIsRequest] = useState(false)
    const [myStore, setMyStore] = useState("My Store")

    const classes = useStyles()

    const handleLocSelect = (index: number) => {
      const cntLocation: any = storesDetailsStore.cntUserLocation[index]
      setLocations([cntLocation])
      storesDetailsStore.changeLocationID(cntLocation.location_id)
      setLocSelStatus(true)
    }

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null)
    }

    const setCoords = (pos: any) => {
      setPos({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      })
    }

    const resetStatuses = () => {
      setToastParams({
        msg: "",
        isError: false,
        isWarning: false,
        isInfo: false,
        isSuccess: false,
      })
    }

    navigator.geolocation.getCurrentPosition(() => {})

    useEffect(() => {
      if (Boolean(anchorEl)) {
        if (navigator.platform.includes("Mac")) {
          setRequireUserInfo(true)
          return
        }
        navigator.permissions
          ? navigator.permissions.query({ name: "geolocation" }).then(function (PermissionStatus) {
              if (PermissionStatus.state == "granted") {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(setCoords)
                  setRequireUserInfo(false)
                } else {
                  console.log("Geolocation is not supported by this browser.")
                  setRequireUserInfo(true)
                }
              } else if (PermissionStatus.state == "prompt") {
                console.log("not yet grated or denied")
              } else {
                setRequireUserInfo(true)
                setPos({ latitude: "", longitude: "" })
              }
            })
          : setRequireUserInfo(true)
      }
    }, [anchorEl])

    useEffect(() => {
      if (!requireUserInfo && pos.latitude) {
        if (locations.length) return
        findLocationAPI
          .findGeoLocation(storesDetailsStore.store_id, pos)
          .then((res: any) => {
            if (res.data.length) {
              storesDetailsStore.changeFindAddLocation(res.data)
              setLocations(makeLocations([storesDetailsStore.findAddLocation[0]]))
              storesDetailsStore.changeLocationID(storesDetailsStore.findAddLocation[0].id)
            } else {
              setToastParams({
                msg: "Response is an empty data, please input your infos.",
                isWarning: true,
              })
              setPos({ latitude: "", longitude: "" })
              setRequireUserInfo(true)
            }
          })
          .catch((error) => {
            console.log("Error to find location with GeoCode", error)
            setToastParams({
              msg: "Error to find location with GeoCode.",
              isError: true,
            })
            setPos({ latitude: "", longitude: "" })
            setRequireUserInfo(true)
          })
      }
    }, [pos, locations])

    useEffect(() => {
      storesDetailsStore.changeCntUserLocationSelected(locSelStatus)
      if (locations.length <= 1) {
        setMyStore(t("NEAREST_LOCATION"))
      } else {
        setMyStore(t("ALL_LOCATIONS"))
      }
      if (locSelStatus) {
        setMyStore(t("SELECTED_LOCATION"))
      }
    }, [locSelStatus, locations])

    useEffect(() => {
      storesDetailsStore.changeCntUserLocation(locations)
    }, [locations])

    const viewMoreStores = () => {
      setLocations(makeLocations(storesDetailsStore.findAddLocation))
      setLocSelStatus(false)
    }

    const handleBookRepair = () => {
      repairWidgetStore.init()
    }

    const onKeyPress = (event: any) => {
      if (event.key === "Enter") {
        handleGetLocation(event.target.value)
      }
    }

    useEffect(() => {
      document.addEventListener("keydown", onKeyPress, false)
      return () => {
        document.removeEventListener("keydown", onKeyPress, false)
      }
    }, [])

    useEffect(() => {
      findLocationAPI
        .findAllLocation(storesDetailsStore.store_id)
        .then((res: any) => {
          const locationData = res.data as any[]
          if (locationData.length > 1 || !locationData.length) return
          storesDetailsStore.changeFindAddLocation(locationData)
          storesDetailsStore.changeCntUserLocationSelected(true)
          setLocations(makeLocations([locationData[0]]))
          setLocSelStatus(true)
          storesDetailsStore.changeLocationID(locationData[0].id)
        })
        .catch((error) => {
          console.log("Error in get Features", error)
        })
    }, [])

    const handleGetLocation = (poscode: string) => {
      if (!poscode) return
      const data: any = {
        city: "",
        state: "",
        postcode: poscode, // R3P0N2
        country: "",
      }
      setIsRequest(true)
      findLocationAPI
        .findAddLocation(storesDetailsStore.store_id, data)
        .then((res: any) => {
          if (res.data.length) {
            storesDetailsStore.changeFindAddLocation(res.data)
            setLocations(makeLocations([storesDetailsStore.findAddLocation[0]]))
            storesDetailsStore.changeLocationID(storesDetailsStore.findAddLocation[0].id)
          } else {
            setToastParams({
              msg: "Response is an empty data, please check your infos.",
              isWarning: true,
            })
            setIsRequest(false)
          }
        })
        .catch((error) => {
          console.log("Error to find location with Address", error)
          setToastParams({
            msg: "Error to find location with Postal Code, please check your code.",
            isError: true,
          })
          setIsRequest(false)
        })
    }

    const getAddress = (location: any) => {
      if (!location) return ""
      return `${location.address_1}, ${location.address_2 ? location.address_2 + ", " : ""}${
        location.city ? location.city + ", " : ""
      } ${location.state ? location.state + " " : ""} ${
        location.postcode ? location.postcode + ", " : ""
      } ${location.country ? location.country + ", " : ""}`
    }

    return (
      <div>
        <Button
          title={
            !locSelStatus
              ? t(btnTitle)
              : storesDetailsStore.cntUserLocation[0] &&
                storesDetailsStore.cntUserLocation[0].address_1
          }
          bgcolor={!locSelStatus ? themeColor : "transparent"}
          txcolor={!locSelStatus ? "white" : "black"}
          border={!locSelStatus ? "1px solid rgba(0,0,0,0.1)" : "none"}
          textDecorator={!locSelStatus ? "none" : "underline"}
          borderR="20px"
          aria-controls="customized-menu"
          aria-haspopup="true"
          onClick={handleOpen}
          icon={true}
          fontSize="17px"
          width={!locSelStatus ? width : "auto"}
          subDomain={subDomain}
          hover={!locSelStatus ? true : false}
        />
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <div className="triangle" style={{ right: "65px" }}></div>
          <div className={subDomain + "-menu-content-div"}>
            <div
              className={subDomain + "-left-content"}
              style={{
                width: locSelStatus || !locations.length ? "215px" : "500px",
              }}
            >
              <div className={subDomain + "-content-block"}>
                {storesDetailsStore.cntUserLocation.length || !requireUserInfo ? (
                  <p className={subDomain + "-block-title"}>{myStore}</p>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <InputComponent
                      value={postCode}
                      placeholder={t("POSTAL_CODE")}
                      handleChange={(e) => {
                        setPostCode(e.target.value)
                      }}
                      subDomain={subDomain}
                    />
                    <Button
                      title={t("GET_LOCATION")}
                      bgcolor={themeColor}
                      borderR="20px"
                      width="80%"
                      height="30px"
                      margin="10px auto"
                      fontSize="15px"
                      subDomain={subDomain}
                      disable={isRequest}
                      onClick={() => handleGetLocation(postCode)}
                    >
                      {isRequest && <Loading />}
                    </Button>
                  </div>
                )}
                <div className="custom-menu-locations-container">
                  {storesDetailsStore.cntUserLocation.map((item: any, index: number) => {
                    return (
                      <React.Fragment key={index}>
                        <p
                          onClick={() => handleLocSelect(index)}
                          className={
                            subDomain +
                            "-block-content" +
                            (locSelStatus ? ` ${classes.nonHoverEffect}` : "")
                          }
                        >
                          {item.distance
                            ? item.location_name +
                              ", " +
                              item.address_1 +
                              " (" +
                              item.distance +
                              ")"
                            : item.location_name + ", " + item.address_1}
                        </p>
                      </React.Fragment>
                    )
                  })}
                </div>
              </div>
              <div className={subDomain + "-content-block"}>
                {locSelStatus && (
                  <a
                    className={subDomain + "-link"}
                    style={{ color: underLineCol }}
                    href={
                      storesDetailsStore.cntUserLocation[0] &&
                      storesDetailsStore.cntUserLocation[0].business_page_link
                        ? storesDetailsStore.cntUserLocation[0].business_page_link
                        : "https://www.google.com/business/"
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("VIEW_STORE_DETAILS")}
                  </a>
                )}
                {storesDetailsStore.findAddLocation.length > 1 &&
                  locations.length < storesDetailsStore.findAddLocation.length && (
                    <a
                      className={subDomain + "-link"}
                      style={{ color: underLineCol }}
                      onClick={viewMoreStores}
                    >
                      {t("VIEW_MORE_STORES")}
                    </a>
                  )}
                {locSelStatus && (
                  <a
                    className={subDomain + "-link"}
                    style={{ color: underLineCol }}
                    href={`${
                      storesDetailsStore.cntUserLocation[0] &&
                      storesDetailsStore.cntUserLocation[0].business_page_link != null
                        ? storesDetailsStore.cntUserLocation[0].business_page_link
                        : `https://www.google.com/maps/search/?api=1&query=${getAddress(
                            storesDetailsStore.cntUserLocation[0]
                          )
                            .split(" ")
                            .join("+")}`
                    }`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("GET_DIRECTIONS")}
                  </a>
                )}
              </div>
              {locSelStatus && (
                <FeatureToggles features={features}>
                  <Feature
                    name={"FRONTEND_REPAIR_APPOINTMENT"}
                    inactiveComponent={() => <></>}
                    activeComponent={() => (
                      <Link
                        to="/get-quote"
                        style={{ textDecoration: "none" }}
                        onClick={handleBookRepair}
                      >
                        <Button
                          title={t("BOOK_APPOINTMENT")}
                          bgcolor={themeColor}
                          borderR="20px"
                          width="175px"
                          height="30px"
                          margin="0"
                          fontSize="15px"
                          subDomain={subDomain}
                        />
                      </Link>
                    )}
                  />
                </FeatureToggles>
              )}
            </div>
            {locSelStatus && (
              <React.Fragment>
                <div
                  style={{
                    borderLeft: "2px solid rgba(0,0,0,0.25)",
                    margin: "30px 10px",
                  }}
                ></div>
                <div style={{ width: "390px" }}>
                  {storesDetailsStore.cntUserLocation.map((item: any, id: number) => {
                    return (
                      <div key={id}>
                        {item.days.map((it: any, index: number) => {
                          return (
                            <div key={index}>
                              <p className={subDomain + "-block-title"}>{t("HOURS")}</p>
                              <div className={subDomain + "-hours-div"}>
                                <div>
                                  {it.wkDys.map((itm: any, idx: number) => {
                                    return (
                                      <p
                                        className={subDomain + "-block-content"}
                                        style={{
                                          textDecoration: "none",
                                          opacity: 1,
                                          cursor: "default",
                                        }}
                                        key={idx}
                                      >
                                        {t(itm)}
                                      </p>
                                    )
                                  })}
                                </div>
                                <div>
                                  {item.hours[index].hrs.map((itm: any, idx: number) => {
                                    return (
                                      <p
                                        className={subDomain + "-block-content"}
                                        style={{
                                          textDecoration: "none",
                                          opacity: 1,
                                          cursor: "default",
                                        }}
                                        key={idx}
                                      >
                                        {t(itm)}
                                      </p>
                                    )
                                  })}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </React.Fragment>
            )}
          </div>
        </StyledMenu>
        <Toast params={toastParams} resetStatuses={resetStatuses} />
      </div>
    )
  })
)

export default CustomizedMenus
