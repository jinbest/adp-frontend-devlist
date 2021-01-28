import React, {useState, useEffect} from 'react'
import {Search, CustomizedMenus, Logo, SelectLang, MegamenuShop} from '../components'
import { Link } from 'react-router-dom'
import { useT } from "../i18n/index"
import { LangProps } from "../i18n/en"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"

type PropsNavItemLink = {
  item: any;
  handleStatus: (status:boolean) => void;
  subDomain?: string;
}

const NavItemLink = ({ item: { href, text }, handleStatus, subDomain }: PropsNavItemLink) => {

  const t = useT();

  const handle = () => {
    if (href === '/repair-widget') {
      handleStatus(false);
    } else {
      handleStatus(true);
    }
    return;
  }

  return (
    <li className={subDomain + '-nav-item'}>
      {text === 'SHOP' ? 
        <MegamenuShop subDomain={subDomain} text={text} /> : 
        <Link className={subDomain + '-nav-link'} to={href} onClick={handle}>
          {t(text)}
        </Link>
      }
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
    <header className={subDomain + '-header'}>
      <div className={subDomain + '-header-brand'} style={{backgroundColor: data.brandItemsData.brandThemeCol}}>
        <div style={{display: 'flex', justifyContent: 'space-between', height: 0, marginTop: '5px'}}>
          <ul style={{display: 'flex', margin: 0, padding: 0}}>
            {brandItemLink.left.map((item:any, index: number) => {
              return <BrandItemLink item={item} key={index} color={brandItemLink.brandCol} trans={true} />
            })}
          </ul>
          <ul style={{display: 'flex', justifyContent: 'flex-end', margin: 0, padding: 0, marginRight: '40px'}}>
            <BrandItemLink item={brandItemLink.right.ip} color={brandItemLink.brandCol} trans={false} />
            <SelectLang subDomain={subDomain} color={brandItemLink.brandCol} options={brandItemLink.selectOption} />
            <FeatureToggles features={feats}>
              <Feature
                name={'FRONTEND_USER_ACCOUNT'}
                inactiveComponent={()=><></>}
                activeComponent={()=>
                  <Feature
                    name={'FRONTEND_USER_LOGIN'}
                    inactiveComponent={()=><></>}
                    activeComponent={()=><BrandItemLink item={brandItemLink.right.log} color={brandItemLink.brandCol} trans={true} />}
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
                    <Search placeholder={searchPlaceholder} color='rgba(0,0,0,0.8)' bgcolor='white' border='rgba(0,0,0,0.2)' subDomain={subDomain} />
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
                    activeComponent={()=><NavItemLink item={item} handleStatus={handleStatus} subDomain={subDomain} />}
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
                <CustomizedMenus subDomain={subDomain} btnTitle={data.homeTextData.header.buttonTitle} width={data.homeTextData.header.width} features={feats} />
              }
            />
          </FeatureToggles>
          <FeatureToggles features={feats}>
            <Feature
              name='FRONTEND_BUY'
              inactiveComponent={()=><></>}
              activeComponent={()=><img src={data.avatarData.store} className={subDomain + '-navlink-avatar-store'} />}
            />
          </FeatureToggles>
        </div>
        <div className={subDomain + '-avatar-div'}>
          {
            userStatus ? 
            <img src={data.avatarData.userActive} onClick={toggleUserStatus} /> :
            <img src={data.avatarData.userDeactive} onClick={toggleUserStatus} /> 
          }
          <FeatureToggles features={feats}>
            <Feature
              name='FRONTEND_BUY'
              inactiveComponent={()=><></>}
              activeComponent={()=><img src={data.avatarData.storeBlue} style={{height: '35px'}}/>}
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
              name='SEARCH'
              inactiveComponent={()=><></>}
              activeComponent={()=>
                <div className={subDomain + '-mobile-search-div'}>
                  <div className={subDomain + '-mobile-child-search'}>
                    <Search placeholder={searchPlaceholder} color='rgba(0,0,0,0.8)' bgcolor='white' border='rgba(0,0,0,0.2)' subDomain={subDomain} />
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
                              <div className='flex-space-between' onClick={()=>{item.text === 'SHOP' && setMobileMenu('right')}}>
                                <a className={subDomain + '-mobile-item'} href={item.href}>{t(item.text)}</a>
                                {item.text === 'SHOP' && 
                                  <img style={{height: '18px'}} src={data.arrowData.arrowRight} />
                                }
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
