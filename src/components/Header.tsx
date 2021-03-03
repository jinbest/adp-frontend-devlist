import React, { useState, useEffect } from "react"
import { Search, CustomizedMenus, Logo, SelectLang, MegamenuShop, HeaderDrawer } from "./"
import { Link } from "react-router-dom"
import { useT } from "../i18n/index"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import { storesDetails } from "../store"
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined"

type PropsNavItemLink = {
  item: any
  handleStatus: (status: boolean) => void
  subDomain?: string
  feats: any[]
}

export function phoneFormatString(phnumber: string) {
  let formatPhnumber: string = phnumber,
    countrycode = "",
    Areacode = "",
    number = ""
  if (phnumber.length <= 10 && phnumber.length > 6) {
    countrycode = phnumber.substring(0, 3)
    Areacode = phnumber.substring(3, 6)
    number = phnumber.substring(6, phnumber.length)
    formatPhnumber = "(" + countrycode + ") " + Areacode + "-" + number
  } else if (phnumber.length > 10) {
    countrycode = phnumber.substring(phnumber.length - 10, phnumber.length - 7)
    Areacode = phnumber.substring(phnumber.length - 7, phnumber.length - 4)
    number = phnumber.substring(phnumber.length - 4, phnumber.length)
    formatPhnumber =
      phnumber.substring(0, phnumber.length - 10) +
      " (" +
      countrycode +
      ") " +
      Areacode +
      "-" +
      number
  }
  return formatPhnumber
}

export function checkDomain(url: string) {
  if (url.indexOf("//") === 0) {
    url = location.protocol + url
  }
  return url
    .toLowerCase()
    .replace(/([a-z])?:\/\//, "$1")
    .split("/")[0]
}

export function isExternal(url: string) {
  return (
    (url.indexOf(":") > -1 || url.indexOf("//") > -1) &&
    checkDomain(location.href) !== checkDomain(url)
  )
}

const NavItemLink = ({
  item: { href, text },
  handleStatus,
  subDomain,
  feats,
}: PropsNavItemLink) => {
  const t = useT()

  const handle = () => {
    if (href === "/get-quote") {
      handleStatus(false)
    } else {
      handleStatus(true)
    }
    return
  }

  return (
    <li className={subDomain + "-nav-item"} style={{ whiteSpace: "nowrap" }}>
      {isExternal(href) ? (
        <a className={subDomain + "-nav-link"} href={href} target="_blank" rel="noreferrer">
          {text === "SHOP" ? (
            <MegamenuShop
              subDomain={subDomain}
              text={text}
              disableMenu={feats.includes("FRONTEND_MEGA_MENU")}
            />
          ) : (
            t(text)
          )}
        </a>
      ) : (
        <Link className={subDomain + "-nav-link"} to={href} onClick={handle}>
          {text === "SHOP" ? (
            <MegamenuShop
              subDomain={subDomain}
              text={text}
              disableMenu={feats.includes("FRONTEND_MEGA_MENU")}
            />
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
  subDomain?: string
  handleStatus: (status: boolean) => void
  features: any[]
}

const Header = ({ subDomain, handleStatus, features }: PropsHeader) => {
  const data = require(`../assets/${subDomain}/Database`)

  const navItemsLink = data.navItemsData,
    brandItemLink = data.brandItemsData,
    searchPlaceholder = data.homeTextData.section1.searchPlaceholder

  const t = useT()

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
    <header className={subDomain + "-header"}>
      <div
        className={subDomain + "-header-brand"}
        style={{ backgroundColor: data.brandItemsData.brandThemeCol }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "30px",
            marginTop: "5px",
          }}
        >
          {!mobile && (
            <ul style={{ display: "flex", margin: 0, padding: 0 }}>
              {brandItemLink.left.map((item: any, index: number) => {
                return (
                  <BrandItemLink
                    item={t(item.text)}
                    href={item.link}
                    key={index}
                    color={brandItemLink.brandCol}
                  />
                )
              })}
            </ul>
          )}
          {mobile && (
            <Link
              to="/contact"
              style={{
                color: brandItemLink.brandCol,
                height: "25px",
                padding: "5px 0",
                marginTop: "-5px",
                display: "flex",
                textDecoration: "none",
                alignItems: "center",
              }}
            >
              <RoomOutlinedIcon />
              Directions
            </Link>
          )}
          <ul
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: 0,
              padding: 0,
              marginRight: mobile && getQuteStatus ? 0 : "40px",
            }}
          >
            <BrandItemLink
              item={storesDetails.storesDetails.phone}
              color={brandItemLink.brandCol}
              phoneNumber={true}
              href="#"
            />
            {!mobile && (
              <SelectLang
                subDomain={subDomain}
                color={brandItemLink.brandCol}
                options={brandItemLink.selectOption}
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
                      <BrandItemLink item={t("LOG_IN")} color={brandItemLink.brandCol} href="#" />
                    )}
                  />
                )}
              />
            </FeatureToggles>
          </ul>
          {mobile && getQuteStatus && (
            <Link
              to="/get-quote"
              className={subDomain + "-mobile-brand-button"}
              style={{ background: data.colorPalle.repairButtonCol, color: "white" }}
            >
              {t("GET_QUOTE")}
            </Link>
          )}
        </div>
        <div
          style={{
            width: "100%",
            height: "30px",
            background: data.colorPalle.repairButtonCol,
            textAlign: "center",
            padding: "2px 0",
            marginLeft: "-20px",
            opacity: 1,
          }}
        >
          <Link
            to="/get-quote"
            style={{
              color: "white",
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {t("GET_QUOTE")}
          </Link>
        </div>
      </div>
      <div
        className={subDomain + "-container-header"}
        style={{ marginTop: mobile && !getQuteStatus ? "65px" : "35px" }}
      >
        <Logo subDomain={subDomain} type="header" handleStatus={handleStatus} />

        <FeatureToggles features={feats}>
          <Feature
            name={"SEARCH"}
            inactiveComponent={() => <></>}
            activeComponent={() => (
              <Feature
                name={"FRONTEND_GLOBAL_SEARCH"}
                inactiveComponent={() => <></>}
                activeComponent={() => (
                  <div className={subDomain + "-search-div"} id="header-search">
                    <Search
                      placeholder={searchPlaceholder}
                      color="rgba(0,0,0,0.8)"
                      bgcolor="white"
                      border="rgba(0,0,0,0.2)"
                      subDomain={subDomain}
                      handleChange={() => {}}
                      handleIconClick={() => {}}
                    />
                  </div>
                )}
              />
            )}
          />
        </FeatureToggles>

        <div className={subDomain + "-nav-div"}>
          <ul className={subDomain + "-navlink-parent"}>
            {navItemsLink.map((item: any, index: number) => {
              return (
                <FeatureToggles features={feats} key={index}>
                  <Feature
                    name={item.flag}
                    inactiveComponent={() => <></>}
                    activeComponent={() => (
                      <NavItemLink
                        item={item}
                        handleStatus={handleStatus}
                        subDomain={subDomain}
                        feats={feats}
                      />
                    )}
                  />
                </FeatureToggles>
              )
            })}
          </ul>
          <FeatureToggles features={feats}>
            <Feature
              name="FRONTEND_FIND_A_STORE"
              inactiveComponent={() => <></>}
              activeComponent={() => (
                <CustomizedMenus
                  headerStore={storesDetails}
                  subDomain={subDomain}
                  btnTitle={data.homeTextData.header.buttonTitle}
                  width={data.homeTextData.header.width}
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
                <a href={data.avatarData.store.link} className={subDomain + '-navlink-avatar-store'} target='_blank' rel='noreferrer'>
                  <img src={data.avatarData.store.img} alt='shop-img' />
                </a>
              }
            />
          </FeatureToggles> */}
        </div>
        <div className={subDomain + "-avatar-div"}>
          <HeaderDrawer
            subDomain={subDomain}
            toggleMenuStatus={toggleMenuStatus}
            handleStatus={handleStatus}
            features={feats}
            themeCol={data.colorPalle.repairButtonCol}
            headerStore={storesDetails}
          >
            {!menuStatus ? (
              <img src={data.avatarData.menu} onClick={toggleMenuStatus} />
            ) : (
              <img src={data.avatarData.cancel} onClick={toggleMenuStatus} />
            )}
          </HeaderDrawer>
          {/* <FeatureToggles features={feats}>
            <Feature
              name="FRONTEND_BUY"
              inactiveComponent={() => <></>}
              activeComponent={() => (
                <a
                  href={data.avatarData.store.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ height: "35px" }}
                >
                  <img src={data.avatarData.storeBlue} style={{ height: "35px" }} />
                </a>
              )}
            />
          </FeatureToggles> */}
        </div>
      </div>

      {/* <div className={subDomain + "-container-mobile"}>
        {userStatus && menuStatus ? (
          <FeatureToggles features={feats}>
            <Feature
              name="FRONTEND_GLOBAL_SEARCH"
              inactiveComponent={() => <></>}
              activeComponent={() => (
                <div className={subDomain + "-mobile-search-div"}>
                  <div className={subDomain + "-mobile-child-search"}>
                    <Search
                      placeholder={searchPlaceholder}
                      color="rgba(0,0,0,0.8)"
                      bgcolor="white"
                      border="rgba(0,0,0,0.2)"
                      subDomain={subDomain}
                      handleChange={() => {}}
                      handleIconClick={() => {}}
                    />
                  </div>
                </div>
              )}
            />
          </FeatureToggles>
        ) : (
          <div className={subDomain + "-mobile-menu-navbar"}>
            {userStatus && (
              <div className={subDomain + "-arrow"}>
                {mobileMenu === "right" && (
                  <img
                    className={subDomain + "-arrow-right"}
                    src={data.arrowData.arrowLeft}
                    onClick={toggleMobileMenu}
                  />
                )}
              </div>
            )}
            {userStatus ? (
              <div>
                {mobileMenu === "left" ? (
                  <div>
                    {data.mobileNavItemData.left.map((item: any, index: number) => {
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
                                    className={subDomain + "-mobile-item"}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {t(item.text)}
                                  </a>
                                ) : item.href === "#" || !item.href ? (
                                  <></>
                                ) : (
                                  <Link className={subDomain + "-mobile-item"} to={item.href}>
                                    {t(item.text)}
                                  </Link>
                                )}

                                {item.text === 'SHOP' && 
                                  <img style={{height: '18px'}} src={data.arrowData.arrowRight} />
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
                      <p className={subDomain + "-arrow-back"} onClick={toggleMobileMenu}>
                        {t("BACK")}
                      </p>
                    ) : (
                      <p
                        className={subDomain + "-arrow-back"}
                        onClick={() => setMobileShopType(999)}
                      >
                        {data.navShop.mainList[mobileShopType].type}
                      </p>
                    )}
                    <div className="mobile-scroll-nav-div">
                      {mobileShopType === 999
                        ? data.navShop.mainList.map((item: any, index: number) => {
                            return (
                              <a
                                key={index}
                                className={subDomain + "-mobile-item"}
                                href="#"
                                onClick={() => setMobileShopType(index)}
                              >
                                {item.type}
                              </a>
                            )
                          })
                        : data.navShop.mainList[mobileShopType].list.map(
                            (item: any, index: number) => {
                              return (
                                <a key={index} className={subDomain + "-mobile-item"} href="#">
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
                {data.userNavItemData.map((item: any, index: number) => {
                  return (
                    <FeatureToggles features={feats} key={index}>
                      <Feature
                        name={item.flag}
                        inactiveComponent={() => <></>}
                        activeComponent={() => (
                          <a className={subDomain + "-mobile-item"} href={item.href}>
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
                          <a href="#" style={{ color: data.colorPalle.textThemeCol }}>
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
