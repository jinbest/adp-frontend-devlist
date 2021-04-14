import React, { useState, useEffect } from "react"
import { Grid, Box, Typography, Popover } from "@material-ui/core"
import { Logo } from "../components"
import { useTranslation } from "react-i18next"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import { getAddress, phoneFormatString } from "../services/helper"
import { inject, observer } from "mobx-react"
import { StoresDetails } from "../store/StoresDetails"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { GridMDInterface } from "../model/grid-params"

const getWidth = () =>
  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

type FooterLinksComponentProps = {
  data: any[]
  isMain: boolean
  initGridMD: GridMDInterface
}

const FooterLinksComponent = ({ data, isMain, initGridMD }: FooterLinksComponentProps) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  return (
    <React.Fragment>
      {data.map((item: any, index: number) => {
        return (
          <React.Fragment key={index}>
            {item.is_main === isMain && (
              <Grid item xs={12} sm={initGridMD}>
                <Typography
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  className={classes.footerLocName}
                >
                  <a
                    href={
                      item.business_page_link ||
                      `https://www.google.com/maps/search/?api=1&query=${getAddress(item)
                        .split(" ")
                        .join("+")}`
                    }
                    className={classes.hoverEffect}
                    style={{ color: "black" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.location_name}
                  </a>
                </Typography>
                <div className={classes.emailPhoneContainer}>
                  <a
                    href={`tel:${item.phone}`}
                    style={{ color: "black" }}
                    className={classes.hoverEffect}
                  >
                    {`${phoneFormatString(item.phone)} `}
                  </a>
                  &nbsp;
                  <a
                    href={`mailto:${item.email}`}
                    style={{ color: "black" }}
                    className={classes.hoverEffect}
                  >
                    {item.email}
                  </a>
                </div>
                <Typography
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  className={classes.footerLocAddress}
                >
                  <a
                    href={
                      item.business_page_link ||
                      `https://www.google.com/maps/search/?api=1&query=${getAddress(item)
                        .split(" ")
                        .join("+")}`
                    }
                    style={{ color: "black" }}
                    className={classes.hoverEffect}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {(item.address_1 ? item.address_1 + ", " : "") +
                      (item.address_2 ? item.address_2 + ", " : "") +
                      (item.city ? item.city + ", " : "") +
                      (item.state ? item.state + ", " : "") +
                      (item.postcode
                        ? item.postcode.substring(0, 3) +
                          " " +
                          item.postcode.substring(3, item.postcode.length)
                        : "")}
                  </a>
                </Typography>
                <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: -5,
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography className={classes.popovertext}>
                    Find address on Google maps.
                  </Typography>
                </Popover>
              </Grid>
            )}
          </React.Fragment>
        )
      })}
    </React.Fragment>
  )
}

type StoreProps = {
  storesDetailsStore: StoresDetails
}
interface Props extends StoreProps {
  features: any[]
}

const Footer = inject("storesDetailsStore")(
  observer((props: Props) => {
    const classes = useStyles()
    const { features, storesDetailsStore } = props
    const data = storesDetailsStore.storeCnts
    const thisPage = data.homepage.footer
    const commonData = storesDetailsStore.commonCnts
    // const footerLink = thisPage.footerLinks
    const [t] = useTranslation()

    const [feats, setFeatures] = useState<any[]>([])
    const [initGridMD, setInitGridMD] = useState<GridMDInterface>(12)
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
      const cntFeatures: any[] = []
      for (let i = 0; i < features.length; i++) {
        if (features[i].isActive) {
          cntFeatures.push(features[i].flag)
        }
      }
      setFeatures(cntFeatures)
    }, [features])

    useEffect(() => {
      if (storesDetailsStore.allLocations.length <= 1) {
        setInitGridMD(12)
      } else if (storesDetailsStore.allLocations.length == 2) {
        setInitGridMD(6)
      } else {
        setInitGridMD(4)
      }
    })

    useEffect(() => {
      handleResize()
      window.addEventListener("resize", handleResize)
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [])

    const handleResize = () => {
      if (getWidth() < 960) {
        setMobile(true)
      } else {
        setMobile(false)
      }
    }

    return (
      <footer
        className={"footer"}
        style={{
          backgroundImage: mobile
            ? "url(" + thisPage.images.mobile + ")"
            : "url(" + thisPage.images.desktop + ")",
        }}
      >
        <Typography className={"footer-title"} style={{ color: thisPage.title.color }}>
          {t(thisPage.title.text)}
        </Typography>
        <Box className={classes.footerContainer}>
          <Grid item container xs={12}>
            {/* <Grid item xs={12} md={gridVal.mainGrid[0]}> */}
            <Grid item xs={12} md={12}>
              {/* <Grid item xs={12} md={gridVal.subGrid[0]}> */}
              <Logo
                type="footer"
                handleStatus={() => {
                  console.log("logo clicked")
                }}
              />
              <Grid item container xs={12} md={12}>
                {[true, false].map((item: any, index: number) => {
                  return (
                    <FooterLinksComponent
                      key={index}
                      data={storesDetailsStore.allLocations}
                      isMain={item}
                      initGridMD={initGridMD}
                    />
                  )
                })}
              </Grid>
              <div className={"device-list-grid copyright"} style={{ color: "grey" }}>
                {t(thisPage.copyRight)}
              </div>
              <div className={classes.bottomLink}>
                {thisPage.bottomLinks.privacyPolicy.externalLink && (
                  <Link to={thisPage.bottomLinks.privacyPolicy.href}>
                    {t(thisPage.bottomLinks.privacyPolicy.text)}
                  </Link>
                )}
                {thisPage.bottomLinks.covidPage.visible && (
                  <Link to={thisPage.bottomLinks.covidPage.link} style={{ marginLeft: "15px" }}>
                    {t(thisPage.bottomLinks.covidPage.text)}
                  </Link>
                )}
              </div>
              {/* </Grid> */}
            </Grid>
            <Grid item xs={12} md={12}>
              {/* <Grid item container xs={12}>
              {footerLink.map((links: any, index: number) => (
                <Grid item xs={12} sm={3} key={index}>
                  <ul className={"footer_link"}>
                    <li className={"link_name"}>{t(links.name)}</li>
                    {links.lists.map((link: any, i: number) => (
                      <li key={i} className={"links"}>
                        <a href={link.href}>{t(link.text)}</a>
                      </li>
                    ))}
                  </ul>
                </Grid>
              ))}
            </Grid> */}
              <FeatureToggles features={feats}>
                <Feature
                  name={"FRONTEND_ONLINE_PURCHASE"}
                  inactiveComponent={() => <></>}
                  activeComponent={() => (
                    <div className={"footer-images-div"}>
                      <div>
                        <img
                          src={commonData.footerImageData.deviceList}
                          className={"footer-device-response"}
                          width="1"
                          height="auto"
                          alt="footer-device-list"
                        />
                        {commonData.footerImageData.bell && (
                          <img
                            src={commonData.footerImageData.bell}
                            className={"footer-device-response"}
                            width="1"
                            height="auto"
                            alt="footer-bell"
                          />
                        )}
                      </div>
                      <div>
                        <img
                          src={commonData.footerImageData.buyNow}
                          className={"footer-buynow"}
                          width="1"
                          height="auto"
                          alt="footer-buynow"
                        />
                        {commonData.footerImageData.others.map((item: any, index: number) => {
                          return (
                            <div className={"footer-others"} key={index}>
                              <img
                                src={item}
                                key={index}
                                width="1"
                                height="auto"
                                alt={`footer-${index}-img`}
                              />
                            </div>
                          )
                        })}
                        <img
                          src={commonData.footerImageData.deviceList}
                          className={"-footer-device-list"}
                          width="1"
                          height="auto"
                          alt="footer-device-list-img"
                        />
                        {commonData.footerImageData.bell && (
                          <img
                            src={commonData.footerImageData.bell}
                            className={"footer-device-list"}
                            width="1"
                            height="auto"
                            alt="footer-bell-img"
                          />
                        )}
                      </div>
                    </div>
                  )}
                />
              </FeatureToggles>
            </Grid>
          </Grid>
        </Box>
      </footer>
    )
  })
)

export default Footer

const useStyles = makeStyles(() =>
  createStyles({
    hoverEffect: {
      "&:hover": {
        opacity: 0.5,
      },
    },
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: "5px 10px 3px",
      boxShadow: "none",
      color: "white",
      background: "#bdbdbd",
    },
    popovertext: {
      fontSize: "12px !important",
    },
    footerLocName: {
      width: "fit-content",
      fontWeight: "bold",
      margin: "20px 0 5px",
      ["@media (max-width:768px)"]: {
        fontSize: "14px",
      },
      ["@media (max-width:600px)"]: {
        margin: "20px auto 5px",
      },
    },
    footerLocAddress: {
      width: "fit-content",
      ["@media (max-width:768px)"]: {
        fontSize: "14px",
      },
      ["@media (max-width:600px)"]: {
        margin: "5px auto 0",
      },
    },
    emailPhoneContainer: {
      marginTop: "5px",
      flexWrap: "wrap",
      ["@media (max-width:768px)"]: {
        fontSize: "14px",
      },
    },
    bottomLink: {
      textAlign: "right",
      paddingRight: "30px",
      "& a": {
        textDecoration: "none",
        color: "gray",
        fontSize: "13px",
        "&:hover": {
          opacity: 0.7,
        },
      },
    },
    footerContainer: {
      maxWidth: "1440px",
      margin: "auto",
      ["@media (max-width:600px)"]: {
        textAlign: "center",
      },
    },
  })
)
