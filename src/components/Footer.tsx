import React, { useState, useEffect } from "react"
import { Grid, Box, Typography, Popover } from "@material-ui/core"
import { Logo } from "../components"
import { useTranslation } from "react-i18next"
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
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.location_name}
                  </a>
                </Typography>
                <div className={classes.emailPhoneContainer}>
                  <a href={`tel:${item.phone}`} className={classes.hoverEffect}>
                    {`${phoneFormatString(item.phone)} `}
                  </a>
                  &nbsp;
                  <a href={`mailto:${item.email}`} className={classes.hoverEffect}>
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
                    className={classes.hoverEffect}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {getAddress(item)}
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
    const { storesDetailsStore } = props
    const data = storesDetailsStore.storeCnts
    const thisPage = data.homepage.footer
    const [t] = useTranslation()

    const [mobile, setMobile] = useState(false)

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
          <Logo
            type="footer"
            handleStatus={() => {
              console.log("logo clicked")
            }}
          />
          <Grid item container>
            {[true, false].map((item: any, index: number) => {
              return (
                <FooterLinksComponent
                  key={index}
                  data={storesDetailsStore.allLocations}
                  isMain={item}
                  initGridMD={4}
                />
              )
            })}
          </Grid>
          <p className={"device-list-grid copyright"} style={{ color: "grey" }}>
            {t(thisPage.copyRight)}
          </p>
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
      "& > a": {
        color: "black",
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
      "& > a": {
        color: "black",
      },
    },
    emailPhoneContainer: {
      marginTop: "5px",
      flexWrap: "wrap",
      ["@media (max-width:768px)"]: {
        fontSize: "14px",
      },
      "& > a": {
        color: "black",
      },
    },
    bottomLink: {
      textAlign: "right",
      paddingRight: "30px",
      marginLeft: "auto",
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
