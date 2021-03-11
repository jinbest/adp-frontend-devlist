import React, { useState, useEffect } from "react"
import { Grid, Box, Typography, Popover } from "@material-ui/core"
import { Logo } from "../components"
import { useTranslation } from "react-i18next"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import { phoneFormatString } from "../services/helper"
import { getAddress } from "../services/helper"
import { inject, observer } from "mobx-react"
import { StoresDetails } from "../store/StoresDetails"
import { createStyles, makeStyles } from "@material-ui/core/styles"

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
      ["@media (max-width:600px)"]: {
        margin: "20px auto 5px",
      },
    },
    footerLocAddress: {
      width: "fit-content",
      marginTop: "5px",
      ["@media (max-width:600px)"]: {
        margin: "5px auto 0",
      },
    },
  })
)

type GridMDInterface =
  | boolean
  | 2
  | 3
  | 1
  | 4
  | "auto"
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | undefined

type FooterLinksComponentProps = {
  data: any[]
  isMain: boolean
  initGridMD: GridMDInterface
  subDomain?: string
}

const FooterLinksComponent = ({
  data,
  isMain,
  initGridMD,
  subDomain,
}: FooterLinksComponentProps) => {
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
                  className={subDomain + "-footer-subContent-title " + classes.footerLocName}
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
                <div
                  className={subDomain + "-device-list-grid"}
                  style={{ marginTop: "5px", flexWrap: "wrap" }}
                >
                  <a
                    href={`tel:${item.phone}`}
                    style={{ color: "black", whiteSpace: "nowrap" }}
                    className={classes.hoverEffect}
                  >
                    {phoneFormatString(item.phone)} |
                  </a>
                  &nbsp;
                  <a
                    href={`mailto:${item.email}`}
                    style={{ color: "black", whiteSpace: "nowrap" }}
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
                  className={subDomain + "-device-list-grid " + classes.footerLocAddress}
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
  subDomain?: string
  features: any[]
}

const Footer = inject("storesDetailsStore")(
  observer((props: Props) => {
    const { subDomain, features, storesDetailsStore } = props
    const data = require(`../assets/${subDomain}/Database`)
    const commonData = require("../assets/_common/mockData")
    // const footerLink = data.homeTextData.footer.footerLink
    const gridVal = data.homeTextData.footer.gridVal
    const [t] = useTranslation()

    const [feats, setFeatures] = useState<any[]>([])
    const [initGridMD, setInitGridMD] = useState<GridMDInterface>(12)

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

    return (
      <footer className={subDomain + "-footer"}>
        <Typography
          className={subDomain + "-footer-title"}
          style={{ color: data.homeTextData.footer.title.color }}
        >
          {t(data.homeTextData.footer.title.text)}
        </Typography>
        <Box className={subDomain + "-footer-container"}>
          <Grid item container xs={12}>
            {/* <Grid item xs={12} md={gridVal.mainGrid[0]}> */}
            <Grid item xs={12} md={12}>
              {/* <Grid item xs={12} md={gridVal.subGrid[0]}> */}
              <Logo
                subDomain={subDomain}
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
                      subDomain={subDomain}
                      initGridMD={initGridMD}
                    />
                  )
                })}
              </Grid>
              <div className={subDomain + "-device-list-grid copyright"} style={{ color: "grey" }}>
                {`${new Date().getFullYear()} ${storesDetailsStore.storesDetails.name}. ${t(
                  data.homeTextData.footer.copyRight.text1
                )} "${storesDetailsStore.storesDetails.name}" ${t(
                  data.homeTextData.footer.copyRight.text2
                )}`}
              </div>
              {/* </Grid> */}
            </Grid>
            <Grid item xs={12} md={gridVal.mainGrid[1]}>
              {/* <Grid item container xs={12}>
              {footerLink.map((links: any, index: number) => (
                <Grid item xs={12} sm={3} key={index}>
                  <ul className={subDomain + "-footer_link"}>
                    <li className={subDomain + "-link_name"}>{t(links.name)}</li>
                    {links.lists.map((link: any, i: number) => (
                      <li key={i} className={subDomain + "-links"}>
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
                    <div className={subDomain + "-footer-images-div"}>
                      <div>
                        <img
                          src={commonData.footerImageData.deviceList}
                          className={subDomain + "-footer-device-response"}
                        />
                        {commonData.footerImageData.bell && (
                          <img
                            src={commonData.footerImageData.bell}
                            className={subDomain + "-footer-device-response"}
                          />
                        )}
                      </div>
                      <div>
                        <img
                          src={commonData.footerImageData.buyNow}
                          className={subDomain + "-footer-buynow"}
                        />
                        {commonData.footerImageData.others.map((item: any, index: number) => {
                          return (
                            <div className={subDomain + "-footer-others"} key={index}>
                              <img src={item} key={index} />
                            </div>
                          )
                        })}
                        <img
                          src={commonData.footerImageData.deviceList}
                          className={subDomain + "-footer-device-list"}
                        />
                        {commonData.footerImageData.bell && (
                          <img
                            src={commonData.footerImageData.bell}
                            className={subDomain + "-footer-device-list"}
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
