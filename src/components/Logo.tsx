import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

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
    <Router>
      <Link to='/'>
        <img className='logo' src={logoHeaderImg.default} alt='logo'/>
      </Link>
    </Router> : 
    <Router>
      <Link to='/'>
        <img className='logo' src={logoFooterImg.default} alt='logo'/>
      </Link>
    </Router>
  )
}

export default Logo;
