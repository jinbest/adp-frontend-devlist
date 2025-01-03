import React, { useState, useEffect } from "react"
import { Search, CustomizedMenus, Logo, MegamenuShop, HeaderDrawer, LangDropdown } from "./"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import { storesDetails, repairWidgetStore } from "../store"
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined"
import { phoneFormatString, isExternal, getBusinessLink } from "../services/helper"
import _ from "lodash"

type PropsNavItemLink = {
  item: any
  handleStatus: (status: boolean) => void
  feats: any[]
}

const NavItemLink = ({ item: { href, text }, handleStatus, feats }: PropsNavItemLink) => {
  const [t] = useTranslation()
  const data = storesDetails.storeCnts

  const handle = () => {
    if (href === data.general.routes.repairWidgetPage) {
      handleStatus(false)
    } else {
      handleStatus(true)
    }
    return
  }

  return (
    <li className={"nav-item"} style={{ whiteSpace: "nowrap" }}>
      {isExternal(href) ? (
        <a className={"nav-link"} href={href} target="_blank" rel="noreferrer">
          {text === "SHOP" ? (
            <MegamenuShop text={text} disableMenu={feats.includes("FRONTEND_MEGA_MENU")} />
          ) : (
            t(text)
          )}
        </a>
      ) : (
        <Link className={"nav-link"} to={href} onClick={handle}>
          {text === "SHOP" ? (
            <MegamenuShop text={text} disableMenu={feats.includes("FRONTEND_MEGA_MENU")} />
          ) : (
            t(text)
          )}
        </Link>
      )}
    </li>
  )
}

type PropsBrand = {
  item: string
  color: string
  phoneNumber?: boolean
  href: string
}

const BrandItemLink = ({ item, color, phoneNumber, href }: PropsBrand) => {
  return (
    <li style={{ listStyle: "none" }}>
      {phoneNumber ? (
        <a
          style={{
            color: color,
            padding: "0 5px",
            fontWeight: 100,
            fontSize: "15px",
            textDecoration: "none",
          }}
          href={`tel:${item}`}
        >
          {phoneFormatString(item).toLocaleUpperCase()}
        </a>
      ) : (
        <Link
          style={{
            color: color,
            padding: "0 5px",
            fontWeight: 100,
            fontSize: "15px",
            textDecoration: "none",
          }}
          to={href}
        >
          {item.toLocaleUpperCase()}
        </Link>
      )}
    </li>
  )
}

const getWidth = () =>
  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

type PropsHeader = {
  handleStatus: (status: boolean) => void
  features: any[]
}

const Header = ({ handleStatus, features }: PropsHeader) => {
  const data = storesDetails.storeCnts
  const thisPage = data.homepage.header
  const businessLink = getBusinessLink(storesDetails.allLocations)

  const navItemsLink = _.sortBy(thisPage.navItems, (o) => o.order),
    brandItemLink = _.sortBy(thisPage.brandItems, (o) => o.order),
    brandData = thisPage.brandData,
    searchPlaceholder = data.homepage.section1.searchPlaceholder

  const [t] = useTranslation()

  const [menuStatus, setMenuStatus] = useState(false)
  const [feats, setFeatures] = useState<any[]>([])
  const [mobile, setMobile] = useState(false)
  const [getQuteStatus, setGetQuoteStatus] = useState(false)

  const handleResize = () => {
    if (getWidth() < 768) {
      setMobile(true)
    } else {
      setMobile(false)
    }
    if (getWidth() > 425 && getWidth() < 768) {
      setGetQuoteStatus(true)
    } else {
      setGetQuoteStatus(false)
    }
  }

  const handleRepairWidget = () => {
    const cntAppointment: any = repairWidgetStore.appointResponse
    repairWidgetStore.init()
    repairWidgetStore.changeAppointResponse(cntAppointment)
    handleStatus(false)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const cntFeatures: any[] = []
    for (let i = 0; i < features.length; i++) {
      if (features[i].isActive) {
        cntFeatures.push(features[i].flag)
      }
    }
    setFeatures(cntFeatures)
  }, [data, features])

  function toggleMenuStatus() {
    setMenuStatus(!menuStatus)
  }

  return (
    <header className={"header"}>
      <div className={"header-brand"} style={{ backgroundColor: brandData.brandThemeCol }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "35px",
            alignItems: "center",
          }}
        >
          {!mobile && (
            <ul style={{ display: "flex", margin: 0, padding: 0 }}>
              {brandItemLink.map((item: any, index: number) => {
                return (
                  <React.Fragment key={index}>
                    {item.visible ? (
                      <BrandItemLink
                        item={t(item.text)}
                        href={item.href}
                        color={brandData.brandCol}
                      />
                    ) : (
                      <></>
                    )}
                  </React.Fragment>
                )
              })}
            </ul>
          )}
          {mobile && (
            <>
              {businessLink ? (
                <a
                  href={businessLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: brandData.brandCol,
                    height: "35px",
                    padding: "0",
                    display: "flex",
                    textDecoration: "none",
                    alignItems: "center",
                  }}
                >
                  <RoomOutlinedIcon />
                  {t("Directions")}
                </a>
              ) : (
                <Link
                  to={data.general.routes.contactPage}
                  style={{
                    color: brandData.brandCol,
                    height: "35px",
                    padding: "0",
                    display: "flex",
                    textDecoration: "none",
                    alignItems: "center",
                  }}
                >
                  <RoomOutlinedIcon />
                  {t("Directions")}
                </Link>
              )}
            </>
          )}
          <ul
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: 0,
              padding: 0,
              marginRight: mobile && getQuteStatus ? 0 : "40px",
              alignItems: "center",
            }}
          >
            {thisPage.visibility.phone && (
              <BrandItemLink
                item={storesDetails.storesDetails.phone}
                color={brandData.brandCol}
                phoneNumber={true}
                href="#"
              />
            )}
            {!mobile && thisPage.visibility.lang && <LangDropdown color={brandData.brandCol} />}
            {!mobile && thisPage.visibility.covidPage && (
              <BrandItemLink
                item={data.homepage.footer.bottomLinks.covidPage.text}
                color={brandData.brandCol}
                phoneNumber={false}
                href={data.homepage.footer.bottomLinks.covidPage.link}
              />
            )}
            <FeatureToggles features={feats}>
              <Feature
                name={"FRONTEND_USER_ACCOUNT"}
                inactiveComponent={() => <></>}
                activeComponent={() => (
                  <Feature
                    name={"FRONTEND_USER_LOGIN"}
                    inactiveComponent={() => <></>}
                    activeComponent={() => (
                      <BrandItemLink item={t("LOG_IN")} color={brandData.brandCol} href="#" />
                    )}
                  />
                )}
              />
            </FeatureToggles>
          </ul>
          {mobile && getQuteStatus && (
            <Link
              to={data.general.routes.repairWidgetPage}
              className={"mobile-brand-button"}
              style={{ background: data.general.colorPalle.repairButtonCol, color: "white" }}
              onClick={handleRepairWidget}
            >
              {t("Get Quote")}
            </Link>
          )}
        </div>
        <div
          style={{
            width: "100%",
            height: "30px",
            background: data.general.colorPalle.repairButtonCol,
            textAlign: "center",
            padding: "2px 0",
            marginLeft: "-20px",
            opacity: 1,
          }}
        >
          <Link
            to={data.general.routes.repairWidgetPage}
            style={{
              color: "white",
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {t("Get Quote")}
          </Link>
        </div>
      </div>
      <div
        className={"container-header"}
        style={{ marginTop: mobile && !getQuteStatus ? "65px" : "35px" }}
      >
        <Logo type="header" handleStatus={handleStatus} />

        <FeatureToggles features={feats}>
          <Feature
            name={"SEARCH"}
            inactiveComponent={() => <></>}
            activeComponent={() => (
              <Feature
                name={"FRONTEND_GLOBAL_SEARCH"}
                inactiveComponent={() => <></>}
                activeComponent={() => (
                  <div className={"search-div"} id="header-search">
                    <Search
                      placeholder={searchPlaceholder}
                      color="rgba(0,0,0,0.8)"
                      bgcolor="white"
                      border="rgba(0,0,0,0.2)"
                      handleChange={() => {}}
                      handleIconClick={() => {}}
                    />
                  </div>
                )}
              />
            )}
          />
        </FeatureToggles>

        <div className={"nav-div"}>
          <ul className={"navlink-parent"}>
            {navItemsLink.map((item: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  {item.visible ? (
                    <FeatureToggles features={feats}>
                      <Feature
                        name={item.flag}
                        inactiveComponent={() => <></>}
                        activeComponent={() => (
                          <NavItemLink item={item} handleStatus={handleStatus} feats={feats} />
                        )}
                      />
                    </FeatureToggles>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              )
            })}
          </ul>
          <FeatureToggles features={feats}>
            <Feature
              name="FRONTEND_FIND_A_STORE"
              inactiveComponent={() => <></>}
              activeComponent={() => (
                <CustomizedMenus
                  storesDetailsStore={storesDetails}
                  btnTitle={thisPage.button.title}
                  width={thisPage.button.width}
                  features={feats}
                />
              )}
            />
          </FeatureToggles>
          {/* <FeatureToggles features={feats}>
            <Feature
              name='FRONTEND_BUY'
              inactiveComponent={()=><></>}
              activeComponent={()=>
                <a href={thisPage.mobileNavData.avatarData.store.link} className={ 'navlink-avatar-store'} target='_blank' rel='noreferrer'>
                  <img src={thisPage.mobileNavData.avatarData.store.img} alt='shop-img' />
                </a>
              }
            />
          </FeatureToggles> */}
        </div>
        <div className={"avatar-div"}>
          <HeaderDrawer
            toggleMenuStatus={toggleMenuStatus}
            handleStatus={handleStatus}
            features={feats}
            themeCol={data.general.colorPalle.repairButtonCol}
            storesDetailsStore={storesDetails}
          >
            {!menuStatus ? (
              <img
                src={thisPage.mobileNavData.avatarData.menu}
                onClick={toggleMenuStatus}
                alt="menu-img"
              />
            ) : (
              <img
                src={thisPage.mobileNavData.avatarData.cancel}
                onClick={toggleMenuStatus}
                alt="cancel-img"
              />
            )}
          </HeaderDrawer>
          {/* <FeatureToggles features={feats}>
            <Feature
              name="FRONTEND_BUY"
              inactiveComponent={() => <></>}
              activeComponent={() => (
                <a
                  href={thisPage.mobileNavData.avatarData.store.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ height: "35px" }}
                >
                  <img src={thisPage.mobileNavData.avatarData.storeBlue} style={{ height: "35px" }} />
                </a>
              )}
            />
          </FeatureToggles> */}
        </div>
      </div>

      {/* <div className={ "container-mobile"}>
        {userStatus && menuStatus ? (
          <FeatureToggles features={feats}>
            <Feature
              name="FRONTEND_GLOBAL_SEARCH"
              inactiveComponent={() => <></>}
              activeComponent={() => (
                <div className={ "mobile-search-div"}>
                  <div className={ "mobile-child-search"}>
                    <Search
                      placeholder={searchPlaceholder}
                      color="rgba(0,0,0,0.8)"
                      bgcolor="white"
                      border="rgba(0,0,0,0.2)"
                      handleChange={() => {}}
                      handleIconClick={() => {}}
                    />
                  </div>
                </div>
              )}
            />
          </FeatureToggles>
        ) : (
          <div className={ "mobile-menu-navbar"}>
            {userStatus && (
              <div className={ "arrow"}>
                {mobileMenu === "right" && (
                  <img
                    className={ "arrow-right"}
                    src={commonData.arrowData.arrowLeft}
                    onClick={toggleMobileMenu}
                  />
                )}
              </div>
            )}
            {userStatus ? (
              <div>
                {mobileMenu === "left" ? (
                  <div>
                    {navItemsLink.map((item: any, index: number) => {
                      return (
                        <FeatureToggles features={feats} key={index}>
                          <Feature
                            name={item.flag}
                            inactiveComponent={() => <></>}
                            activeComponent={() => (
                              <div
                                className="flex-space-between"
                                onClick={() => {
                                  // item.text === 'SHOP' && setMobileMenu('right')
                                }}
                              >
                                {isExternal(item.href) ? (
                                  <a
                                    className={ "mobile-item"}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {t(item.text)}
                                  </a>
                                ) : item.href === "#" || !item.href ? (
                                  <></>
                                ) : (
                                  <Link className={ "mobile-item"} to={item.href}>
                                    {t(item.text)}
                                  </Link>
                                )}

                                {item.text === 'SHOP' && 
                                  <img style={{height: '18px'}} src={commonData.arrowData.arrowRight} />
                                }
                              </div>
                            )}
                          />
                        </FeatureToggles>
                      )
                    })}
                  </div>
                ) : (
                  <div>
                    {mobileShopType === 999 ? (
                      <p className={ "arrow-back"} onClick={toggleMobileMenu}>
                        {t("BACK")}
                      </p>
                    ) : (
                      <p
                        className={ "arrow-back"}
                        onClick={() => setMobileShopType(999)}
                      >
                        {thisPage.megaMenu.mainList[mobileShopType].type}
                      </p>
                    )}
                    <div className="mobile-scroll-nav-div">
                      {mobileShopType === 999
                        ? thisPage.megaMenu.mainList.map((item: any, index: number) => {
                            return (
                              <a
                                key={index}
                                className={ "mobile-item"}
                                href="#"
                                onClick={() => setMobileShopType(index)}
                              >
                                {item.type}
                              </a>
                            )
                          })
                        : thisPage.megaMenu.mainList[mobileShopType].list.map(
                            (item: any, index: number) => {
                              return (
                                <a key={index} className={ "mobile-item"} href="#">
                                  {item}
                                </a>
                              )
                            }
                          )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {thisPage.mobileNavData.userNavItems.map((item: any, index: number) => {
                  return (
                    <FeatureToggles features={feats} key={index}>
                      <Feature
                        name={item.flag}
                        inactiveComponent={() => <></>}
                        activeComponent={() => (
                          <a className={ "mobile-item"} href={item.href}>
                            {t(item.text)}
                          </a>
                        )}
                      />
                    </FeatureToggles>
                  )
                })}
                <FeatureToggles features={feats}>
                  <Feature
                    name={"FRONTEND_USER_ACCOUNT"}
                    inactiveComponent={() => <></>}
                    activeComponent={() => (
                      <Feature
                        name={"FRONTEND_USER_SIGNUP"}
                        inactiveComponent={() => <></>}
                        activeComponent={() => (
                          <a href="#" style={{ color: data.general.colorPalle.textThemeCol }}>
                            {t("SIGN_OUT")}
                          </a>
                        )}
                      />
                    )}
                  />
                </FeatureToggles>
              </div>
            )}
          </div>
        )}
      </div> */}
    </header>
  )
}

export default Header
