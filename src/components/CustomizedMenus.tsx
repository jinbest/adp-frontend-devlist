import React, { useState, useEffect } from "react"
import { withStyles } from "@material-ui/core/styles"
import Menu, { MenuProps } from "@material-ui/core/Menu"
import {
  Button,
  // UserInfoModal,
  InputComponent,
} from "./"
import { useT } from "../i18n/index"
import { LangProps } from "../i18n/en"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import { repairWidgetStore } from "../store/"
import { findLocationAPI } from "../services/"
import { Link } from "react-router-dom"
import { GetCurrentLocParams } from "../pages/repair/model/get-current-location"
import { StoresDetails } from "../store/StoresDetails"
import { inject, observer } from "mobx-react"
import { ToastMsgParams } from "./toast/toast-msg-params"
import Toast from "./toast/toast"
import Loading from "./Loading"

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
          hour = "Closed"
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
      distance: (data[i].distance / 1000).toFixed(1) + "km",
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

// function getNearestLocLink(data: any[]) {
//   let nearestLoc: any = data[0]
//   for (let i = 1; i < data.length; i++) {
//     if (data[i].distance < nearestLoc.distance) {
//       nearestLoc = data[i]
//     }
//   }
//   return `https://www.google.com/maps/search/?api=1&query=${nearestLoc.latitude},${nearestLoc.longitude}`
// }

const StyledMenu = withStyles({
  paper: {
    borderRadius: "15px",
    boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
    overflow: "inherit",
    marginTop: "5px",
    border: "1px solid #C4C4C4",
    paddingBottom: "15px",
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

type StoreProps = {
  headerStore: StoresDetails
}
interface Props extends StoreProps {
  subDomain?: string
  btnTitle: LangProps
  width: string
  features: any[]
}

// const CustomizedMenus = inject('store')(observer(({subDomain, btnTitle, width, features}: Props) => {
const CustomizedMenus = inject("headerStore")(
  observer((props: Props) => {
    const { subDomain, btnTitle, width, features, headerStore } = props

    const data = require(`../assets/${subDomain}/Database`)
    const themeColor = data.colorPalle.themeColor
    const underLineCol = data.colorPalle.underLineCol
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const t = useT()
    const [pos, setPos] = useState({ latitude: "", longitude: "" })
    // const [userInfo, setUserInfo] = useState({ city: "", state: "", postcode: "", country: "" })
    const [locSelStatus, setLocSelStatus] = useState(headerStore.cntUserLocationSelected)
    const [locations, setLocations] = useState<any[]>(headerStore.cntUserLocation)
    const [requireUserInfo, setRequireUserInfo] = useState(false)
    const [contentWidth, setContentWidth] = useState("215px")
    const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
    const [postCode, setPostCode] = useState("")
    const [isRequest, setIsRequest] = useState(false)

    const handleLocSelect = (index: number) => {
      const cntLocation: any = headerStore.cntUserLocation[index]
      setLocations([cntLocation])
      headerStore.changeLocationID(cntLocation.location_id)
      setLocSelStatus(true)
    }

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null)
    }

    const setCoords = (pos: any) => {
      console.log("setCoords: ", pos)
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
        navigator.permissions &&
          navigator.permissions.query({ name: "geolocation" }).then(function (PermissionStatus) {
            if (PermissionStatus.state == "granted") {
              if (navigator.geolocation) {
                console.log("Geolocation is supported by this browser.")
                navigator.geolocation.getCurrentPosition(setCoords)
                setRequireUserInfo(false)
              } else {
                console.log("Geolocation is not supported by this browser.")
              }
            } else if (PermissionStatus.state == "prompt") {
              console.log("not yet grated or denied")
            } else {
              setRequireUserInfo(true)
              setPos({ latitude: "", longitude: "" })
            }
          })
      }
    }, [anchorEl])

    useEffect(() => {
      if (!requireUserInfo && pos.latitude) {
        if (locations.length) return
        findLocationAPI
          .findGeoLocation(headerStore.store_id, pos)
          .then((res: any) => {
            if (res.data.length) {
              headerStore.changeFindAddLocation(res.data)
              setLocations(makeLocations(headerStore.findAddLocation))
              headerStore.changeLocationID(res.data[0].id)
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
      if (locSelStatus || !locations.length) {
        setContentWidth("215px")
      } else {
        setContentWidth("500px")
      }
      headerStore.changeCntUserLocationSelected(locSelStatus)
    }, [locSelStatus, locations])

    useEffect(() => {
      headerStore.changeCntUserLocation(locations)
    }, [locations])

    // useEffect(() => {
    //   if (userInfo.city) {
    //     if (locations.length) return
    //     findLocationAPI
    //       .findAddLocation(headerStore.store_id, userInfo)
    //       .then((res: any) => {
    //         if (res.data.length) {
    //           headerStore.changeFindAddLocation(res.data)
    //           setLocations(makeLocations(headerStore.findAddLocation))
    //           headerStore.changeLocationID(res.data[0].id)
    //         } else {
    //           setToastParams({
    //             msg: "Response is an empty data, please check your infos.",
    //             isWarning: true,
    //           })
    //         }
    //       })
    //       .catch((error) => {
    //         console.log("Error to find location with Address", error)
    //         setToastParams({
    //           msg: "Error to find location with Address, please check your infos.",
    //           isError: true,
    //         })
    //       })
    //   }
    // }, [userInfo])

    const viewMoreStores = () => {
      setLocations(makeLocations(headerStore.findAddLocation))
      setLocSelStatus(false)
    }

    const handleBookRepair = () => {
      repairWidgetStore.init()
    }

    const handleGetLocation = () => {
      if (!postCode) return
      const data: any = {
        city: "",
        state: "",
        postcode: postCode, // R3P0N2
        country: "",
      }
      setIsRequest(true)
      findLocationAPI
        .findAddLocation(headerStore.store_id, data)
        .then((res: any) => {
          if (res.data.length) {
            headerStore.changeFindAddLocation(res.data)
            setLocations(makeLocations(headerStore.findAddLocation))
            headerStore.changeLocationID(res.data[0].id)
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
              : headerStore.cntUserLocation[0] && headerStore.cntUserLocation[0].address_1
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
          width={width}
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
            <div className={subDomain + "-left-content"} style={{ width: contentWidth }}>
              <div className={subDomain + "-content-block"}>
                {headerStore.cntUserLocation.length || !requireUserInfo ? (
                  <p className={subDomain + "-block-title"}>{t("MY_STORE")}</p>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <InputComponent
                      value={postCode}
                      placeholder={"Postal Code*"}
                      handleChange={(e) => {
                        setPostCode(e.target.value)
                      }}
                      subDomain={subDomain}
                    />
                    <Button
                      title={"Get Location"}
                      bgcolor={themeColor}
                      borderR="20px"
                      width="80%"
                      height="30px"
                      margin="10px auto"
                      fontSize="15px"
                      subDomain={subDomain}
                      onClick={handleGetLocation}
                    >
                      {isRequest && <Loading />}
                    </Button>
                    {/* <p style={{ fontSize: "12px", color: "darkgray" }}>
                      {t("INPUT_YOUR_INFO_DESCRIPTION")}
                    </p>
                    <UserInfoModal
                      bgColor={themeColor}
                      handleUserInfo={setUserInfo}
                      subDomain={subDomain}
                    /> */}
                  </div>
                )}
                {headerStore.cntUserLocation.map((item: any, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      <p
                        onClick={() => handleLocSelect(index)}
                        className={subDomain + "-block-content"}
                      >
                        {item.location_name + ", " + item.address_1 + " (" + item.distance + ")"}
                      </p>
                    </React.Fragment>
                  )
                })}
              </div>
              <div className={subDomain + "-content-block"}>
                {locSelStatus && (
                  <a
                    className={subDomain + "-link"}
                    style={{ color: underLineCol }}
                    // href={getNearestLocLink(headerStore.findAddLocation)}
                    href={
                      headerStore.cntUserLocation[0].business_page_link
                        ? headerStore.cntUserLocation[0].business_page_link
                        : "https://www.google.com/business/"
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("VIEW_STORE_DETAILS")}
                  </a>
                )}
                {headerStore.findAddLocation.length > 1 && (
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
                    href={`https://www.google.com/maps/search/?api=1&query=${getAddress(
                      headerStore.cntUserLocation[0]
                    )
                      .split(" ")
                      .join("+")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("GET_DIRECTIONS")}
                  </a>
                )}
              </div>
              <FeatureToggles features={features}>
                <Feature
                  name="FRONTEND_REPAIR"
                  inactiveComponent={() => <></>}
                  activeComponent={() => (
                    <Link
                      to="/get-quote"
                      style={{ textDecoration: "none" }}
                      onClick={handleBookRepair}
                    >
                      <Button
                        title={t("BOOK_REPAIR")}
                        bgcolor={themeColor}
                        borderR="20px"
                        width="40px"
                        height="30px"
                        margin="0"
                        fontSize="15px"
                        subDomain={subDomain}
                      />
                    </Link>
                  )}
                />
              </FeatureToggles>
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
                  {headerStore.cntUserLocation.map((item: any, id: number) => {
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
                                        style={{ textDecoration: "none", opacity: 1 }}
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
                                        style={{ textDecoration: "none", opacity: 1 }}
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
