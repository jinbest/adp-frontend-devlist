import React from "react"
import { Link } from "react-router-dom"
import { storesDetails } from "../store"

type Props = {
  type?: string
  handleStatus: (status: boolean) => void
}

const Logo = ({ type, handleStatus }: Props) => {
  const mainData = storesDetails.storeCnts
  const logoData = mainData.logoData

  const handleLogoClick = () => {
    handleStatus(true)
  }

  return type === "header" ? (
    <Link to="/" onClick={handleLogoClick}>
      <img className={"logo-header"} src={logoData.logoHeaderImg} alt="header-logo" />
    </Link>
  ) : (
    <Link to="/" onClick={handleLogoClick}>
      <img className={"logo-footer"} src={logoData.logoFooterImg} alt="footer-logo" />
    </Link>
  )
}

Logo.defaultProps = {
  type: "header",
}

export default Logo
