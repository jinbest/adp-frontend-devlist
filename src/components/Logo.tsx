import React from 'react'
import { Link } from 'react-router-dom'

/* eslint-disable*/
type Props = {
  subDomain?: string;
  type?: string;
}

const Logo = ({subDomain, type}: Props) => {
  const logoHeaderImg = require(`../assets/${subDomain}/img/logo/logo-header.png`);
  const logoFooterImg = require(`../assets/${subDomain}/img/logo/logo-footer.png`);

  return (
    type === 'header' ? 
    <Link to='/home'>
      <img className='logo' src={logoHeaderImg.default} alt='logo'/>
    </Link> : 
    <Link to='/'>
      <img className='logo' src={logoFooterImg.default} alt='logo'/>
    </Link>
  )
}

Logo.defaultProps = {
  subDomain: 'DeviceList',
  type: 'header'
}

export default Logo;
