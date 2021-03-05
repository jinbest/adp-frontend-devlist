import React, { useEffect, useState } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import { isExternal } from "./Header"
import { Link } from "react-router-dom"
import { useT } from "../i18n/index"
import { Button, InputComponent } from "./"
import Loading from "./Loading"
import { inject, observer } from "mobx-react"
import { ToastMsgParams } from "./toast/toast-msg-params"
import Toast from "./toast/toast"
import { StoresDetails } from "../store/StoresDetails"
import { makeLocations } from "./CustomizedMenus"
import { findLocationAPI } from "../services/"
import { repairWidgetStore } from "../store/"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 200,
      padding: "30px 20px",
    },
    itemDiv: {
      padding: "10px 0",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      "& > a": {
        textDecoration: "none",
        color: "black",
        fontSize: "14px",
      },
      "&:hover": {
        opacity: 0.5,
      },
    },
    findStoreDiv: {
      position: "absolute",
      bottom: "100px",
      width: 200,
      ["@media (max-width:425px)"]: {
        "& button": {
          height: "40px !important",
          fontSize: "15px !important",
        },
      },
    },
    drawerLogo: {
      width: 150,
      margin: "0 auto 10px",
      "& img": {
        width: "100%",
      },
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "none",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid rgba(0,0,0,0.1)",
      borderRadius: "10px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 1),
      outline: "none",
      maxWidth: 300,
    },
    nonHoverEffect: {
      textDecoration: "none !important",
      opacity: "1 !important",
      cursor: "default !important",
    },
  })
)

type Anchor = "top" | "left" | "bottom" | "right"

type StoreProps = {
  storesDetailsStore: StoresDetails
}
interface Props extends StoreProps {
  children?: any
  subDomain?: string
  toggleMenuStatus: (val: boolean) => void
  handleStatus: (status: boolean) => void
  features: any[]
  themeCol: string
}

const HeaderDrawer = inject("storesDetailsStore")(
  observer((props: Props) => {
    const {
      children,
      subDomain,
      toggleMenuStatus,
      handleStatus,
      features,
      themeCol,
      storesDetailsStore,
    } = props
    const data = require(`../assets/${subDomain}/Database`)
    const t = useT()

    const classes = useStyles()
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    })
    const [modalStatus, setModalStatus] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [storeStatus, setStoreStatus] = useState(false)
    const [locSelStatus, setLocSelStatus] = useState(false)
    const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
    const [requireUserInfo, setRequireUserInfo] = useState(false)
    const [pos, setPos] = useState({ latitude: "", longitude: "" })
    const [locations, setLocations] = useState<any[]>(storesDetailsStore.cntUserLocation)
    const [postCode, setPostCode] = useState("")

    useEffect(() => {
      if (storesDetailsStore.findAddLocation.length) {
        setStoreStatus(true)
      }
      setLocSelStatus(storesDetailsStore.cntUserLocationSelected)
    }, [])

    const handleFindStore = () => {
      if (!storeStatus) {
        setGeoPos()
      } else {
        handleModalOpen()
      }
    }

    const handleModalOpen = () => {
      setModalStatus(true)
    }

    const handleModalClose = () => {
      setModalStatus(false)
      setLoadingStatus(false)
    }

    const setCoords = (pos: any) => {
      setPos({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      })
    }

    navigator.geolocation.getCurrentPosition(() => {})

    const setGeoPos = () => {
      if (navigator.platform.includes("Mac")) {
        setRequireUserInfo(true)
        handleModalOpen()
        return
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords(pos)
          setRequireUserInfo(false)
        },
        () => {
          setRequireUserInfo(true)
          handleModalOpen()
        }
      )
    }

    useEffect(() => {
      if (!requireUserInfo && pos.latitude) {
        if (locations.length) return
        setLoadingStatus(true)
        findLocationAPI
          .findGeoLocation(storesDetailsStore.store_id, pos)
          .then((res: any) => {
            if (res.data.length) {
              storesDetailsStore.changeFindAddLocation(res.data)
              setLocations(makeLocations(storesDetailsStore.findAddLocation))
              storesDetailsStore.changeLocationID(res.data[0].id)
              setStoreStatus(true)
              setModalStatus(true)
            } else {
              setToastParams({
                msg: "Response is an empty data, please input your infos.",
                isWarning: true,
              })
              setPos({ latitude: "", longitude: "" })
              setRequireUserInfo(true)
            }
            setLoadingStatus(false)
          })
          .catch((error) => {
            console.log("Error to find location with GeoCode", error)
            setToastParams({
              msg: "Error to find location with GeoCode.",
              isError: true,
            })
            setPos({ latitude: "", longitude: "" })
            setRequireUserInfo(true)
            setLoadingStatus(false)
          })
      }
    }, [pos, locations])

    useEffect(() => {
      storesDetailsStore.changeCntUserLocation(locations)
    }, [locations])

    useEffect(() => {
      storesDetailsStore.changeCntUserLocationSelected(locSelStatus)
    }, [locSelStatus])

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

    const handleGetLocation = (poscode: string) => {
      if (!poscode) return
      const data: any = {
        city: "",
        state: "",
        postcode: poscode, // R3P0N2
        country: "",
      }
      setLoadingStatus(true)
      findLocationAPI
        .findAddLocation(storesDetailsStore.store_id, data)
        .then((res: any) => {
          if (res.data.length) {
            storesDetailsStore.changeFindAddLocation(res.data)
            setLocations(makeLocations(storesDetailsStore.findAddLocation))
            storesDetailsStore.changeLocationID(res.data[0].id)
          } else {
            setToastParams({
              msg: "Response is an empty data, please check your infos.",
              isWarning: true,
            })
          }
          setRequireUserInfo(false)
          setStoreStatus(true)
          setLoadingStatus(false)
        })
        .catch((error) => {
          console.log("Error to find location with Address", error)
          setToastParams({
            msg: "Error to find location with Postal Code, please check your code.",
            isError: true,
          })
          setLoadingStatus(false)
        })
    }

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
      event: React.KeyboardEvent | React.MouseEvent
    ) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
      toggleMenuStatus(open)
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

    const handleLocSelect = (index: number) => {
      const cntLocation: any = storesDetailsStore.cntUserLocation[index]
      setLocations([cntLocation])
      storesDetailsStore.changeLocationID(cntLocation.location_id)
      setLocSelStatus(true)
    }

    const viewMoreStores = () => {
      setLocations(makeLocations(storesDetailsStore.findAddLocation))
      setLocSelStatus(false)
    }

    const getAddress = (location: any) => {
      return `${location.address_1}, ${location.address_2 ? location.address_2 + ", " : ""}${
        location.city ? location.city + ", " : ""
      } ${location.state ? location.state + " " : ""} ${
        location.postcode ? location.postcode + ", " : ""
      } ${location.country ? location.country + ", " : ""}`
    }

    const handleBookRepair = () => {
      setModalStatus(false)
      setState({ ...state, ["left"]: false })
      repairWidgetStore.init()
      toggleMenuStatus(false)
    }

    return (
      <React.Fragment>
        <div onClick={toggleDrawer("left", true)}>{children}</div>
        <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
          <div className={classes.root}>
            <div className={classes.drawerLogo}>
              <img src={data.logoData.logoHeaderImg} alt="drawer-logo" />
            </div>
            <FeatureToggles features={features}>
              {data.mobileNavItemData.left.map((item: any, index: number) => {
                return (
                  <Feature
                    key={index}
                    name={item.flag}
                    inactiveComponent={() => <></>}
                    activeComponent={() => (
                      <React.Fragment>
                        {item.href && item.href !== "#" && (
                          <div
                            className={classes.itemDiv}
                            onClick={() => {
                              setState({ ...state, ["left"]: false })
                              toggleMenuStatus(false)
                              handleStatus(true)
                            }}
                          >
                            {isExternal(item.href) ? (
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                style={{ display: "flex" }}
                              >
                                {t(item.text)}
                              </a>
                            ) : (
                              <Link to={item.href} style={{ display: "flex" }}>
                                {t(item.text)}
                              </Link>
                            )}
                          </div>
                        )}
                      </React.Fragment>
                    )}
                  />
                )
              })}
            </FeatureToggles>
            <div className={classes.findStoreDiv}>
              <Button
                title={t("FIND_A_STORE")}
                bgcolor={themeCol}
                borderR="20px"
                width="80%"
                height="40px"
                margin="10px auto"
                fontSize="17px"
                subDomain={subDomain}
                disable={loadingStatus}
                onClick={handleFindStore}
              >
                {loadingStatus && <Loading />}
              </Button>
            </div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={modalStatus}
              onClose={handleModalClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <div className={classes.paper}>
                {!storeStatus && requireUserInfo && (
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
                      bgcolor={themeCol}
                      borderR="20px"
                      width="80%"
                      height="30px"
                      margin="10px auto"
                      fontSize="15px"
                      subDomain={subDomain}
                      disable={loadingStatus}
                      onClick={() => handleGetLocation(postCode)}
                    >
                      {loadingStatus && <Loading />}
                    </Button>
                  </div>
                )}
                {storeStatus && (
                  <React.Fragment>
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
                              style={{
                                fontSize: locSelStatus ? "15px" : "12px",
                                textAlign: locSelStatus ? "center" : "left",
                              }}
                            >
                              {item.location_name +
                                ", " +
                                item.address_1 +
                                " (" +
                                item.distance +
                                ")"}
                            </p>
                          </React.Fragment>
                        )
                      })}
                    </div>
                    {locSelStatus && (
                      <React.Fragment>
                        {storesDetailsStore.cntUserLocation.map((item: any, id: number) => {
                          return (
                            <div key={id}>
                              {item.days.map((it: any, index: number) => {
                                return (
                                  <div key={index}>
                                    <p
                                      className={subDomain + "-block-title"}
                                      style={{ fontSize: "14px" }}
                                    >
                                      {t("HOURS")}
                                    </p>
                                    <div className={subDomain + "-hours-div"}>
                                      <div>
                                        {it.wkDys.map((itm: any, idx: number) => {
                                          return (
                                            <p
                                              className={subDomain + "-block-content"}
                                              style={{
                                                textDecoration: "none",
                                                opacity: 1,
                                                fontSize: "14px",
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
                                                fontSize: "14px",
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
                      </React.Fragment>
                    )}
                    <div className={subDomain + "-content-block"}>
                      {locSelStatus && (
                        <a
                          className={subDomain + "-link"}
                          style={{ color: themeCol, fontSize: "12px" }}
                          href={
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
                      {storesDetailsStore.findAddLocation.length > 1 && (
                        <a
                          className={subDomain + "-link"}
                          style={{ color: themeCol, fontSize: "12px" }}
                          onClick={viewMoreStores}
                        >
                          {t("VIEW_MORE_STORES")}
                        </a>
                      )}
                      {locSelStatus && (
                        <a
                          className={subDomain + "-link"}
                          style={{ color: themeCol, fontSize: "12px" }}
                          href={`${
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
                              title={t("BOOK_APPOINTMENT")}
                              bgcolor={themeCol}
                              borderR="20px"
                              width="175px"
                              height="30px"
                              margin="0px 0 10px"
                              fontSize="15px"
                              subDomain={subDomain}
                            />
                          </Link>
                        )}
                      />
                    </FeatureToggles>
                  </React.Fragment>
                )}
              </div>
            </Modal>
          </div>
        </Drawer>
        <Toast params={toastParams} resetStatuses={resetStatuses} />
      </React.Fragment>
    )
  })
)

export default HeaderDrawer
