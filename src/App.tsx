import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { Footer, Header, Chat, Preloader, Badge } from "./components"
import { Home } from "./pages/home/"
import { Location } from "./pages/Location"
import { Repair, RepairWidget } from "./pages/repair/"
import { Shop } from "./pages/shop/"
import { Provider } from "mobx-react"
import { storesDetails, repairWidgetStore } from "./store/"
import { LangProvider } from "./i18n/index"
import { appLoadAPI } from "./services/"
import findLocationAPI from "./services/api/findLocationAPI"
import { Helmet } from "react-helmet"

const domainMatch = window.location.hostname.match(/[a-zA-Z0-9-]*\.[a-zA-Z0-9-]*$/g)
const apexDomain = domainMatch ? domainMatch[0] : "dccmtx.com"
const subDomain = apexDomain.split(".")[0]

// const devicelist = [
//   { name: "bananaservice", domain: "bananaservice.ca" },
//   { name: "geebodevicerepair", domain: "" },
//   { name: "mobiletechlab", domain: "mobiletechlab.ca" },
//   { name: "nanotechmobile", domain: "nanotechmobile.ca" },
//   { name: "northtechsolutions", domain: "northtechsolutions.ca" },
//   { name: "okotoksphonephix", domain: "okotoksphonephix.ca" },
//   { name: "pradowireless", domain: "pradowireless.com" },
//   { name: "reparationcellularbsl", domain: "reparationcellularbsl.ca" },
//   { name: "wirelessrevottawa", domain: "wirelessrevottawa.ca" },
//   { name: "dccmtx", domain: "dccmtx.com" },
//   { name: "mtlcmtx", domain: "mtlcmtx.com" },
// ]
// const siteNum = 8,
//   subDomain = devicelist[siteNum].name,
//   apexDomain = "dccmtx.com"

type FeatureProps = {
  flag: string
  isActive: boolean
}

function App(): JSX.Element {
  require(`./assets/${subDomain}/styles/index.scss`)
  const mainData = require(`./assets/${subDomain}/Database`)

  const [footerStatus, setFooterStatus] = useState(true)
  const [features, setFeatures] = useState<FeatureProps[]>([])
  const [storeId, setStoreID] = useState(0)
  const [loadStatus, setLoadStatus] = useState(false)
  const [pageTitle, setPageTitle] = useState("Store")
  const [metaDescription, setMetaDescription] = useState("")
  const [tagScript, setTagScript] = useState(undefined)
  const parser = new DOMParser()

  const handleFooterStatus = (status: boolean) => {
    setFooterStatus(status)
  }

  useEffect(() => {
    const storeTabData = mainData.getTabData(storesDetails.storesDetails.name)

    setPageTitle(storeTabData.title)
    setMetaDescription(storeTabData.metaDescription)
    setTagScript(storeTabData.headTag)

    loadScript(storeTabData.bodyTag)
    if (subDomain === "mobiletechlab" || subDomain === "nanotechmobile") {
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.prepend(storeTabData.scriptTag)
      document.body.prepend(script)
    }
    appLoadAPI
      .getStoresDetail(apexDomain, false)
      .then((res: any) => {
        setStoreID(res.data.settings.store_id)
        storesDetails.changeStoreID(res.data.settings.store_id)
        storesDetails.changeIsVoided(res.data.is_voided)
        storesDetails.changestoresDetails(res.data)
      })
      .catch((error) => {
        console.log("Error in get Store Details", error)
      })
  }, [])

  useEffect(() => {
    if (storeId) {
      appLoadAPI
        .getFeatures(storeId)
        .then((res: any) => {
          const feats: FeatureProps[] = [
            { flag: "ALWAYS_TRUE", isActive: true },
            { flag: "FRONTEND_INSURE", isActive: false },
          ]
          if (
            subDomain === "mobiletechlab" ||
            subDomain === "wirelessrevottawa" ||
            subDomain === "northtechsolutions" ||
            subDomain === "okotoksphonephix"
          ) {
            feats.push({ flag: "FRONTEND_BUY", isActive: true })
          }
          for (let i = 0; i < res.data.length; i++) {
            feats.push({
              flag: res.data[i].feature_id,
              isActive: res.data[i].is_enabled,
            })
          }
          setFeatures(feats)
          setLoadStatus(true)
        })
        .catch((error) => {
          console.log("Error in get Features", error)
        })
      findLocationAPI
        .findAllLocation(storeId)
        .then((res: any) => {
          const locationData = res.data as any[]
          storesDetails.changeAddLocations(locationData)
        })
        .catch((error) => {
          console.log("Error in get Features", error)
        })
    }
  }, [storeId])

  const loadScript = (tag: string) => {
    if (tag != null) {
      const noScript = document.createElement("noscript")
      const htmlDoc = parser.parseFromString(tag, "text/html")
      const iframeNode = htmlDoc.getElementsByTagName("iframe")[0]

      if (iframeNode != null) {
        noScript.prepend(iframeNode)
        document.body.prepend(noScript)
      }
    }
  }

  const BaseRouter = () => {
    return (
      <>
        <Route
          path="/"
          exact
          component={() => (
            <Home subDomain={subDomain} features={features} handleStatus={handleFooterStatus} />
          )}
        />
        <Route path="/home" render={() => <Redirect to="/" />} />
        <Route
          path="/quote"
          component={() => (
            <Provider repairWidgetStore={repairWidgetStore}>
              <Repair subDomain={subDomain} handleStatus={handleFooterStatus} features={features} />
            </Provider>
          )}
        />
        <Route
          path="/contact"
          exact
          component={() => (
            <Provider storesDetailsStore={storesDetails}>
              <Location
                storesDetailsStore={storesDetails}
                subDomain={subDomain}
                handleStatus={handleFooterStatus}
              />
            </Provider>
          )}
        />
        <Route
          path="/get-quote"
          component={() => (
            <Provider repairWidgetStore={repairWidgetStore}>
              <RepairWidget
                subDomain={subDomain}
                handleStatus={handleFooterStatus}
                features={features}
              />
            </Provider>
          )}
        />
        <Route
          path="/shop"
          component={() => (
            <Shop subDomain={subDomain} handleStatus={handleFooterStatus} features={features} />
          )}
        />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <link rel="icon" id="favicon" href={mainData.fav.img} />
        <link rel="apple-touch-icon" href={mainData.fav.img} />
        <meta name="description" content={metaDescription} />
        {subDomain === "mobiletechlab" && (
          <meta
            name="google-site-verification"
            content="-7lYFKjpeZOXhFE35pTA-GfcaY9PRNOlrNm-SdgQMlI"
          />
        )}
        <script>{tagScript}</script>
      </Helmet>

      <LangProvider>
        {loadStatus ? (
          <Router>
            <Provider headerStore={storesDetails}>
              <Header subDomain={subDomain} handleStatus={handleFooterStatus} features={features} />
            </Provider>
            <BaseRouter />
            <Chat subDomain={subDomain} features={features} />
            <Badge subDomain={subDomain} />
            {footerStatus && (
              <Provider headerStore={storesDetails}>
                <Footer subDomain={subDomain} features={features} headerStore={storesDetails} />
              </Provider>
            )}
          </Router>
        ) : (
          <Preloader />
        )}
      </LangProvider>
    </>
  )
}

export default App
