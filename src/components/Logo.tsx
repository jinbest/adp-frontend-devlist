import React from "react"
import { Link } from "react-router-dom"

type Props = {
  subDomain?: string
  type?: string
  handleStatus: (status: boolean) => void
}

const Logo = ({ subDomain, type, handleStatus }: Props) => {
  const mainData = require(`../assets/${subDomain}/Database.js`)
  const logoData = mainData.logoData

  const handleLogoClick = () => {
    handleStatus(true)
  }

  return type === "header" ? (
    <Link to="/home" onClick={handleLogoClick}>
      {subDomain === "geebodevicerepair" ||
      subDomain === "nanotechmobile" ||
      subDomain === "okotoksphonephix" ||
      subDomain === "wirelessrevottawa" ||
      subDomain === "dccmtx" ||
      subDomain === "mtlcmtx" ? (
        <img
          className={subDomain + "-logo-header"}
          src={logoData.logoHeaderImg}
          alt="header-logo"
        />
      ) : (
        <img
          className={subDomain + "-logo-header"}
          src={require(`../assets/${subDomain}/img/logo/logo-header.svg`).default}
          alt="header-logo"
        />
      )}
    </Link>
  ) : (
    <Link to="/" onClick={handleLogoClick}>
      {subDomain === "mobiletechlab" ? (
        <img
          className={subDomain + "-logo-header"}
          src={require(`../assets/${subDomain}/img/logo/logo-footer.svg`).default}
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
