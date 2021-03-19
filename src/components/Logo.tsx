import React from "react"
import { Link } from "react-router-dom"
import { storesDetails } from "../store"

type Props = {
  subDomain?: string
  type?: string
  handleStatus: (status: boolean) => void
}

const Logo = ({ subDomain, type, handleStatus }: Props) => {
  const mainData = storesDetails.storeCnts
  const logoData = mainData.logoData

  const handleLogoClick = () => {
    handleStatus(true)
  }

  return type === "header" ? (
    <Link to="/home" onClick={handleLogoClick}>
      {subDomain === "geebodevicerepair" ||
      subDomain === "nanotechmobile" ||
      subDomain === "phonephix" ||
      subDomain === "wirelessrevottawa" ||
      subDomain === "mtlcmtx" ? (
        <img
          className={subDomain + "-logo-header"}
          src={logoData.logoHeaderImg}
          alt="header-logo"
        />
      ) : (
        <img
          className={subDomain + "-logo-header"}
          src={mainData.logoData.logoHeaderSVG}
          alt="header-logo"
        />
      )}
    </Link>
  ) : (
    <Link to="/" onClick={handleLogoClick}>
      {subDomain === "mobiletechlab" ? (
        <img
          className={subDomain + "-logo-header"}
          src={mainData.logoData.logoFooterSVG}
          alt="footer-logo"
        />
      ) : (
        <img
          className={subDomain + "-logo-footer"}
          src={logoData.logoFooterImg}
          alt="footer-logo"
        />
      )}
    </Link>
  )
}

Logo.defaultProps = {
  subDomain: "DeviceList",
  type: "header",
}

export default Logo
