import React, {useState} from 'react'
import {Search, CustomizedMenus, Logo, SelectLang} from '../components'
import { Link } from 'react-router-dom'
import { useT } from "../i18n/index"
import { LangProps } from "../i18n/en"


/*eslint-disable*/
type PropsNavItemLink = {
  item: any;
  handleStatus: (status:boolean) => void;
}

const NavItemLink = ({ item: { href, text }, handleStatus }: PropsNavItemLink) => {

  const t = useT();

  const handle = () => {
    if (href === '/repair-widget') {
      handleStatus(false);
    } else {
      handleStatus(true);
    }
    if (href === '/repair') {
      const headerSearch = document.getElementById('header-search') as HTMLElement;
      headerSearch.style.visibility = 'visible';
    }
  }

  return (
    <li className='nav-item'>
      <Link className='nav-link' to={href} onClick={handle}>
        {t(text)}
      </Link>
    </li>
  )
}

type PropsBrand = {
  item: LangProps;
  color: string;
  trans: boolean;
}

const BrandItemLink = ({ item, color, trans }: PropsBrand) => {
  const t = useT();

  return (    
    <li style={{listStyle: 'none'}}>
      <a style={{color: color, padding: '0 5px', fontWeight: 100, fontSize: '15px'}}>
        {trans ? t(item).toLocaleUpperCase() : item.toLocaleUpperCase()}
      </a>
    </li>
  )
}

type PropsHeader = {
  subDomain?: string;
  handleStatus: (status:boolean) => void;
}

const Header = ({subDomain, handleStatus}: PropsHeader) => {
  const data = require(`../assets/${subDomain}/Database`);
  const navItemsLink = data.navItemsData, 
    brandItemLink = data.brandItemsData, 
    searchPlaceholder = data.homeTextData.section1.searchPlaceholder;

  const t = useT();

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
      <div className='header-brand' style={{backgroundColor: data.brandItemsData.brandThemeCol}}>
        <div style={{display: 'flex', justifyContent: 'space-between', height: 0, marginTop: '5px'}}>
          <ul style={{display: 'flex', margin: 0, padding: 0}}>
            {brandItemLink.left.map((item:any, index: number) => {
              return <BrandItemLink item={item} key={index} color={brandItemLink.brandCol} trans={true} />
            })}
          </ul>
          <ul style={{display: 'flex', justifyContent: 'flex-end', margin: 0, padding: 0, marginRight: '40px'}}>
            <BrandItemLink item={brandItemLink.right.ip} color={brandItemLink.brandCol} trans={false} />
            <SelectLang subDomain={subDomain} color={brandItemLink.brandCol} options={brandItemLink.selectOption} />
            <BrandItemLink item={brandItemLink.right.log} color={brandItemLink.brandCol} trans={true} />
          </ul>          
        </div>
      </div>
      <div className='container-header'>
        <Logo subDomain={subDomain} type='header' handleStatus={handleStatus} />
        
        <div className='search-div' id='header-search'>
          <Search placeholder={searchPlaceholder} color='rgba(0,0,0,0.8)' bgcolor='white' border='rgba(0,0,0,0.2)'/>
        </div>
        <div className='nav-div'>
          <ul className='navlink-parent'>
            {navItemsLink.map((item:any, index:number) => {
              return <NavItemLink item={item} key={index} handleStatus={handleStatus}/>
            })}
          </ul>
          <CustomizedMenus subDomain={subDomain} btnTitle={data.homeTextData.header.buttonTitle} width={data.homeTextData.header.width} />
          <img src={data.avatarData.store} className='navlink-avatar-store' />
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
              <Search placeholder={searchPlaceholder} color='rgba(0,0,0,0.8)' bgcolor='white' border='rgba(0,0,0,0.2)'/>
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
                        <a key={index} className='mobile-item' href={item.href}>{t(item.text)}</a>
                      )
                    })}
                  </div> : 
                  <div>
                    <p className='arrow-back' onClick={toggleMobileMenu}>{t('BACK')}</p>
                    {data.mobileNavItemData.right.map((item:any, index:number) => {
                      return (
                        <a key={index} className='mobile-item' href={item.href}>{t(item.text)}</a>
                      )
                    })}
                  </div>
                }
              </div> : 
              <div>
                {data.userNavItemData.map((item:any, index:number) => {
                  return (
                    <a key={index} className='mobile-item' href={item.href}>{t(item.text)}</a>
                  )
                })}
                <a href='#' style={{color: data.colorPalle.textThemeCol}}>{t('SIGN_OUT')}</a>
              </div>
            }
          </div>
        }
      </div>
    </header>
  )
}

export default Header;
