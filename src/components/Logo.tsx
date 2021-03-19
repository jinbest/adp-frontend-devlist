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
      <img className={subDomain + "-logo-header"} src={logoData.logoHeaderImg} alt="header-logo" />
    </Link>
  ) : (
    <Link to="/" onClick={handleLogoClick}>
      <img className={subDomain + "-logo-footer"} src={logoData.logoFooterImg} alt="footer-logo" />
    </Link>
  )
}

Logo.defaultProps = {
  subDomain: "DeviceList",
  type: "header",
}

export default Logo
