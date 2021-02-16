import React, {useState, useEffect} from 'react'
import {Search, CustomizedMenus, Logo, SelectLang, MegamenuShop} from '../components'
import { Link } from 'react-router-dom'
import { useT } from "../i18n/index"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import { storesDetails } from '../store'

type PropsNavItemLink = {
  item: any;
  handleStatus: (status:boolean) => void;
  subDomain?: string;
  feats: any[];
}

export function phoneFormatString(phnumber: string) {
  let formatPhnumber: string = phnumber, countrycode = '', Areacode = '', number = '';
  if (phnumber.length <= 10 && phnumber.length > 6) {
    countrycode = phnumber.substring(0, 3);
    Areacode = phnumber.substring(3, 6);
    number = phnumber.substring(6, phnumber.length);
    formatPhnumber ="(" + countrycode + ") " + Areacode + "-" + number;
  } else if (phnumber.length > 10) {
    countrycode = phnumber.substring(phnumber.length - 10, phnumber.length - 7);
    Areacode = phnumber.substring(phnumber.length - 7, phnumber.length - 4);
    number = phnumber.substring(phnumber.length - 4, phnumber.length);
    formatPhnumber = phnumber.substring(0, phnumber.length - 10) + " (" + countrycode + ") " + Areacode + "-" + number;
  }
  return formatPhnumber;
}

const checkDomain = (url:string) => {
  if ( url.indexOf('//') === 0 ) { url = location.protocol + url; }
  return url.toLowerCase().replace(/([a-z])?:\/\//,'$1').split('/')[0];
};

const isExternal = (url:string) => {
  return ( ( url.indexOf(':') > -1 || url.indexOf('//') > -1 ) && checkDomain(location.href) !== checkDomain(url) );
};

const NavItemLink = ({ item: { href, text }, handleStatus, subDomain, feats }: PropsNavItemLink) => {

  const t = useT();

  const handle = () => {
    if (href === '/get-quote') {
      handleStatus(false);
    } else {
      handleStatus(true);
    }
    return;
  }  

  return (
    <li className={subDomain + '-nav-item'}>
      {isExternal(href) ? 
        <a className={subDomain + '-nav-link'} href={href} target='_blank' rel='noreferrer'>
          {text === 'SHOP' ? 
            <MegamenuShop subDomain={subDomain} text={text} disableMenu={feats.includes('FRONTEND_MEGA_MENU')} /> : t(text)}
        </a> :
        <Link className={subDomain + '-nav-link'} to={href} onClick={handle}>
          {text === 'SHOP' ? 
            <MegamenuShop subDomain={subDomain} text={text} disableMenu={feats.includes('FRONTEND_MEGA_MENU')} /> : t(text)}
        </Link>
      }
    </li>
  )
}

type PropsBrand = {
  item: string;
  color: string;
  phoneNumber?: boolean;
}

const BrandItemLink = ({ item, color, phoneNumber }: PropsBrand) => {
  return (    
    <li style={{listStyle: 'none'}}>
      <a style={{color: color, padding: '0 5px', fontWeight: 100, fontSize: '15px', textDecoration: 'none'}} href={phoneNumber ? `tel:${item}` : '#'}>
        {phoneNumber ? phoneFormatString(item).toLocaleUpperCase() : item.toLocaleUpperCase()}
      </a>
    </li>
  )
}

type PropsHeader = {
  subDomain?: string;
  handleStatus: (status:boolean) => void;
  features: any[];
}

const Header = ({subDomain, handleStatus, features}: PropsHeader) => {
  const data = require(`../assets/${subDomain}/Database`);
  
  const navItemsLink = data.navItemsData, 
    brandItemLink = data.brandItemsData, 
    searchPlaceholder = data.homeTextData.section1.searchPlaceholder;

  const t = useT();

  const [userStatus, setUserStatus] = useState(true);
  const [menuStatus, setMenuStatus] = useState(true);
  const [mobileMenu, setMobileMenu] = useState('left');
  const [mobileShopType, setMobileShopType] = useState(999);
  const [feats, setFeatures] = useState<any[]>([]);

  useEffect(() => {
    const cntFeatures:any[] = [];
    for (let i = 0; i < features.length; i++) {
      if (features[i].isActive) {
        cntFeatures.push(features[i].flag);
      }
    }
    setFeatures(cntFeatures);
  }, [data, features])

  // function toggleUserStatus() {
  //   setUserStatus(!userStatus);
  //   setMenuStatus(true);
  // }

  function toggleMenuStatus() {
    setMenuStatus(!menuStatus);
    setUserStatus(true);
  }

  function toggleMobileMenu() {
    mobileMenu === 'left' ? setMobileMenu('right') : setMobileMenu('left');
  }

  return (
    <header className={subDomain + '-header'}>
      <div className={subDomain + '-header-brand'} style={{backgroundColor: data.brandItemsData.brandThemeCol}}>
        <div style={{display: 'flex', justifyContent: 'space-between', height: 0, marginTop: '5px'}}>
          <ul style={{display: 'flex', margin: 0, padding: 0}}>
            {brandItemLink.left.map((item:any, index: number) => {
              return <BrandItemLink item={t(item)} key={index} color={brandItemLink.brandCol} />
            })}
          </ul>
          <ul style={{display: 'flex', justifyContent: 'flex-end', margin: 0, padding: 0, marginRight: '40px'}}>
            <BrandItemLink item={storesDetails.storesDetails.phone} color={brandItemLink.brandCol} phoneNumber={true} />
            <SelectLang subDomain={subDomain} color={brandItemLink.brandCol} options={brandItemLink.selectOption} />
            <FeatureToggles features={feats}>
              <Feature
                name={'FRONTEND_USER_ACCOUNT'}
                inactiveComponent={()=><></>}
                activeComponent={()=>
                  <Feature
                    name={'FRONTEND_USER_LOGIN'}
                    inactiveComponent={()=><></>}
                    activeComponent={()=><BrandItemLink item={t(brandItemLink.right.log)} color={brandItemLink.brandCol} />}
                  />
                }
              />
            </FeatureToggles>
          </ul>          
        </div>
      </div>
      <div className={subDomain + '-container-header'}>
        <Logo subDomain={subDomain} type='header' handleStatus={handleStatus} />
        
        <FeatureToggles features={feats}>
          <Feature
            name={'SEARCH'}
            inactiveComponent={()=><></>}
            activeComponent={()=>
              <Feature
                name={'FRONTEND_GLOBAL_SEARCH'}
                inactiveComponent={()=><></>}
                activeComponent={()=>
                  <div className={subDomain + '-search-div'} id='header-search'>
                    <Search 
                      placeholder={searchPlaceholder} 
                      color='rgba(0,0,0,0.8)' 
                      bgcolor='white' 
                      border='rgba(0,0,0,0.2)' 
                      subDomain={subDomain} 
                      handleChange={()=>{}} 
                      handleIconClick={()=>{}}
                    />
                  </div>
                }
              />
            }
          />
        </FeatureToggles>

        <div className={subDomain + '-nav-div'}>
          <ul className={subDomain + '-navlink-parent'}>
            {navItemsLink.map((item:any, index:number) => {
              return (
                <FeatureToggles features={feats} key={index}>
                  <Feature
                    name={item.flag}
                    inactiveComponent={()=><></>}
                    activeComponent={()=><NavItemLink item={item} handleStatus={handleStatus} subDomain={subDomain} feats={feats} />}
                  />
                </FeatureToggles>
              )
            })}
          </ul>
          <FeatureToggles features={feats}>
            <Feature
              name='FRONTEND_FIND_A_STORE'
              inactiveComponent={()=><></>}
              activeComponent={()=>
                <CustomizedMenus headerStore={storesDetails} subDomain={subDomain} btnTitle={data.homeTextData.header.buttonTitle} width={data.homeTextData.header.width} features={feats} />
              }
            />
          </FeatureToggles>
          <FeatureToggles features={feats}>
            <Feature
              name='FRONTEND_BUY'
              inactiveComponent={()=><></>}
              activeComponent={()=>
                <a href={data.avatarData.store.link} className={subDomain + '-navlink-avatar-store'} target='_blank' rel='noreferrer'>
                  <img src={data.avatarData.store.img} alt='shop-img' />
                </a>
              }
            />
          </FeatureToggles>
        </div>
        <div className={subDomain + '-avatar-div'}>
          {/* {
            userStatus ? 
            <img src={data.avatarData.userActive} onClick={toggleUserStatus} /> :
            <img src={data.avatarData.userDeactive} onClick={toggleUserStatus} /> 
          } */}
          <FeatureToggles features={feats}>
            <Feature
              name='FRONTEND_BUY'
              inactiveComponent={()=><></>}
              activeComponent={()=>
                <a href={data.avatarData.store.link} target='_blank' rel='noreferrer' style={{height: '35px'}}>
                  <img src={data.avatarData.storeBlue} style={{height: '35px'}}/>
                </a>
              }
            />
          </FeatureToggles>          
          {
            menuStatus ? 
            <img src={data.avatarData.menu} onClick={toggleMenuStatus} /> :
            <img src={data.avatarData.cancel} onClick={toggleMenuStatus} />
          }
        </div>
      </div>
      <div className={subDomain + '-container-mobile'}>
        {
          userStatus && menuStatus ? 
          <FeatureToggles features={feats}>
            <Feature
              name='FRONTEND_GLOBAL_SEARCH'
              inactiveComponent={()=><></>}
              activeComponent={()=>
                <div className={subDomain + '-mobile-search-div'}>
                  <div className={subDomain + '-mobile-child-search'}>
                    <Search 
                      placeholder={searchPlaceholder} 
                      color='rgba(0,0,0,0.8)' 
                      bgcolor='white' 
                      border='rgba(0,0,0,0.2)' 
                      subDomain={subDomain} 
                      handleChange={()=>{}} 
                      handleIconClick={()=>{}}
                    />
                  </div>
                </div>
              }
            />
          </FeatureToggles> :
          <div className={subDomain + '-mobile-menu-navbar'}>
            {userStatus && <div className={subDomain + '-arrow'}>
              {mobileMenu === 'right' && 
                <img className={subDomain + '-arrow-right'} src={data.arrowData.arrowLeft} onClick={toggleMobileMenu} />
              }
            </div>}
            { 
              userStatus ? 
              <div>
                {mobileMenu === 'left' ? 
                  <div>
                    {data.mobileNavItemData.left.map((item:any, index:number) => {
                      return (
                        <FeatureToggles features={feats} key={index}>
                          <Feature
                            name={item.flag}
                            inactiveComponent={()=><></>}
                            activeComponent={()=>
                              <div className='flex-space-between' onClick={()=>{
                                // item.text === 'SHOP' && setMobileMenu('right')
                              }}>
                                {isExternal(item.href) ? 
                                  <a className={subDomain + '-mobile-item'} href={item.href} target='_blank' rel='noreferrer'>{t(item.text)}</a> : 
                                  (item.href === '#' || !item.href) ? <></> :
                                  <Link className={subDomain + '-mobile-item'} to={item.href}>{t(item.text)}</Link>
                                }
                                
                                {/* Megamenu on mobile disabled
                                {item.text === 'SHOP' && 
                                  <img style={{height: '18px'}} src={data.arrowData.arrowRight} />
                                } */}
                              </div>
                            }
                          />
                        </FeatureToggles>
                      )
                    })}
                  </div> : 
                  <div>
                    {mobileShopType === 999 ? 
                      <p className={subDomain + '-arrow-back'} onClick={toggleMobileMenu}>
                        {t('BACK')}
                      </p> : 
                      <p className={subDomain + '-arrow-back'} onClick={()=>setMobileShopType(999)}>
                        {data.navShop.mainList[mobileShopType].type}
                      </p>
                    }
                    <div className='mobile-scroll-nav-div'>
                      {mobileShopType === 999 ? 
                        data.navShop.mainList.map((item:any, index:number) => {
                          return (
                            <a key={index} className={subDomain + '-mobile-item'} href='#' onClick={()=>setMobileShopType(index)}>{item.type}</a>
                          )
                        }) : 
                        data.navShop.mainList[mobileShopType].list.map((item:any, index:number) => {
                          return (
                            <a key={index} className={subDomain + '-mobile-item'} href='#'>{item}</a>
                          )
                        })
                      }
                    </div>
                  </div>
                }
              </div> : 
              <div>
                {data.userNavItemData.map((item:any, index:number) => {
                  return (
                    <FeatureToggles features={feats} key={index}>
                      <Feature
                        name={item.flag}
                        inactiveComponent={()=><></>}
                        activeComponent={()=>
                          <a className={subDomain + '-mobile-item'} href={item.href}>{t(item.text)}</a>
                        }
                      />
                    </FeatureToggles>
                  )
                })}
                <FeatureToggles features={feats}>
                  <Feature
                    name={'FRONTEND_USER_ACCOUNT'}
                    inactiveComponent={()=><></>}
                    activeComponent={()=>
                      <Feature
                        name={'FRONTEND_USER_SIGNUP'}
                        inactiveComponent={()=><></>}
                        activeComponent={()=>
                          <a href='#' style={{color: data.colorPalle.textThemeCol}}>{t('SIGN_OUT')}</a>
                        }
                      />
                    }
                  />
                </FeatureToggles>
              </div>
            }
          </div>
        }
      </div>
    </header>
  )
}

export default Header;
