import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  subDomain?: string;
  type?: string;
  handleStatus: (status:boolean) => void;
}

const Logo = ({subDomain, type, handleStatus}: Props) => {
  const mainData = require(`../assets/${subDomain}/Database.js`);
  const logoData = mainData.logoData;

  const handleLogoClick = () => {
    localStorage.clear();
    handleStatus(true);
  }

  return (
    type === 'header' ? 
    <Link to='/home' onClick={handleLogoClick}>
      <img className='logo-header' src={logoData.logoHeaderImg} alt='logo'/>
    </Link> : 
    <Link to='/' onClick={handleLogoClick}>
      <img className='logo-footer' src={logoData.logoFooterImg} alt='logo'/>
    </Link>
  )
}

Logo.defaultProps = {
  subDomain: 'DeviceList',
  type: 'header'
}

export default Logo;
