import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  subDomain?: string;
  type?: string;
  handleStatus: (status:boolean) => void;
}

const Logo = ({subDomain, type, handleStatus}: Props) => {
  const logoHeaderImg = require(`../assets/${subDomain}/img/logo/logo-header.png`);
  const logoFooterImg = require(`../assets/${subDomain}/img/logo/logo-footer.png`);

  const handleLogoClick = () => {
    localStorage.clear();
    handleStatus(true);
  }

  return (
    type === 'header' ? 
    <Link to='/home' onClick={handleLogoClick}>
      <img className='logo-header' src={logoHeaderImg.default} alt='logo'/>
    </Link> : 
    <Link to='/' onClick={handleLogoClick}>
      <img className='logo-footer' src={logoFooterImg.default} alt='logo'/>
    </Link>
  )
}

Logo.defaultProps = {
  subDomain: 'DeviceList',
  type: 'header'
}

export default Logo;
