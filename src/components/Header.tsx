import React, {useState} from 'react'
import {Search, CustomizedMenus, Logo, SelectComponent} from '../components'

/*eslint-disable*/
type PropsNavItemLink = {
  item: any;
}

const NavItemLink = ({ item: { href, text } }: PropsNavItemLink) => {
  return (
    <li className='nav-item'>
      <a className='nav-link' href={href}>
        {text}
      </a>
    </li>
  )
}

type PropsBrand = {
  item: string;
}

const BrandItemLink = ({ item }: PropsBrand) => {
  return (    
    <li style={{listStyle: 'none'}}>
      <a style={{color: 'white', padding: '0 5px', fontWeight: 100, fontSize: '15px'}}>
        {item}
      </a>
    </li>
  )
}

type PropsHeader = {
  subDomain?: string;
}

const Header = ({subDomain}: PropsHeader) => {
  const data = require(`../assets/${subDomain}/Database`);
  const navItemsLink = data.navItemsData, brandItemLink = data.brandItemsData;

  const [userStatus, setUserStatus] = useState(true);
  const [menuStatus, setMenuStatus] = useState(true);
  const [mobileMenu, setMobileMenu] = useState('left');

  function toggleUserStatus() {
    setUserStatus(!userStatus);
    setMenuStatus(true);
  }

  function toggleMenuStatus() {
    setMenuStatus(!menuStatus);
    setUserStatus(true);
  }

  function toggleMobileMenu() {
    mobileMenu === 'left' ? setMobileMenu('right') : setMobileMenu('left');
  }

  return (
    <header className='header'>
      <div className='header-brand'>
        <div style={{display: 'flex', justifyContent: 'space-between', height: 0, marginTop: '5px'}}>
          <ul style={{display: 'flex', margin: 0, padding: 0}}>
            {brandItemLink.left.map((item:any, index: number) => {
              return <BrandItemLink item={item} key={index} />
            })}
          </ul>
          <ul style={{display: 'flex', justifyContent: 'flex-end', margin: 0, padding: 0, marginRight: '40px'}}>
            {/* {brandItemLink.right.map((item:any, index:number) => {
              return <BrandItemLink item={item} key={index} />
            })} */}
            <BrandItemLink item='204.221.5898' />
            <SelectComponent subDomain={subDomain} />
            <BrandItemLink item='LOG IN' />
          </ul>          
        </div>
      </div>
      <div className='container-header'>
        <Logo subDomain={subDomain} type='header' />
        
        <div className='search-div'>
          <Search color='rgba(0,0,0,0.8)' bgcolor='white' border='rgba(0,0,0,0.2)'/>
        </div>
        <div className='nav-div'>
          <ul className='navlink-parent'>
            {navItemsLink.map((item:any, index:number) => {
              return <NavItemLink item={item} key={index} />
            })}
          </ul>
          <CustomizedMenus subDomain={subDomain} />
          <img src={data.avatarData.store} />
        </div>
        <div className='avatar-div'>
          {
            userStatus ? 
            <img src={data.avatarData.userActive} onClick={toggleUserStatus} /> :
            <img src={data.avatarData.userDeactive} onClick={toggleUserStatus} /> 
          }
          <img src={data.avatarData.storeBlue} style={{height: '35px'}}/>
          {
            menuStatus ? 
            <img src={data.avatarData.menu} onClick={toggleMenuStatus} /> :
            <img src={data.avatarData.cancel} onClick={toggleMenuStatus} />
          }
        </div>
      </div>
      <div className='container-mobile'>
        {
          userStatus && menuStatus ? 
          <div className='mobile-search-div'>
            <div className='mobile-child-search'>
              <Search color='rgba(0,0,0,0.8)' bgcolor='white' border='rgba(0,0,0,0.2)'/>
            </div>
          </div> : 
          <div className='mobile-menu-navbar'>
            {userStatus && <div className='arrow'>
              {mobileMenu === 'left' ? 
                <img className='arrow-left' src={data.arrowData.arrowRight} onClick={toggleMobileMenu} /> : 
                <img className='arrow-right' src={data.arrowData.arrowLeft} onClick={toggleMobileMenu} />
              }
            </div>}
            { 
              userStatus ? 
              <div>
                {mobileMenu === 'left' ? 
                  <div>
                    {data.mobileNavItemData.left.map((item:any, index:number) => {
                      return (
                        <a key={index} className='mobile-item' href={item.href}>{item.text}</a>
                      )
                    })}
                  </div> : 
                  <div>
                    <p className='arrow-back' onClick={toggleMobileMenu}>Back</p>
                    {data.mobileNavItemData.right.map((item:any, index:number) => {
                      return (
                        <a key={index} className='mobile-item' href={item.href}>{item.text}</a>
                      )
                    })}
                  </div>
                }
              </div> : 
              <div>
                {data.userNavItemData.map((item:any, index:number) => {
                  return (
                    <a key={index} className='mobile-item' href={item.href}>{item.text}</a>
                  )
                })}
                <a href='#' style={{color: 'blue'}}>Sign Out</a>
              </div>
            }
          </div>
        }
      </div>
    </header>
  )
}

export default Header;
