import React, { useState, useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Footer, Header, Preloader, Badge } from "./components"
import { Provider } from "mobx-react"
import { storesDetails, repairWidgetStore, repairWidData } from "./store/"
import { appLoadAPI } from "./services/"
import findLocationAPI from "./services/api/findLocationAPI"
import { Helmet } from "react-helmet"
import BaseRouter from "./BaseRouter"
import { FeaturesParam } from "./model/feature-toggle"
import "./assets/_common/style/index.scss"

const domainMatch = window.location.hostname.match(/[a-zA-Z0-9-]*\.[a-zA-Z0-9-]*$/g)
const apexDomain = domainMatch ? domainMatch[0] : "dccmtx.com"
const subDomain = apexDomain.split(".")[0]

// const devicelist = [
//   { name: "bananaservices", domain: "https://bananaservices.ca/", storeID: 1 },
//   { name: "geebodevicerepair", domain: "https://geebodevicerepair.ca/", storeID: 3 },
//   { name: "mobiletechlab", domain: "https://mobiletechlab.ca/", storeID: 4 },
//   { name: "nanotechmobile", domain: "https://nanotechmobile.ca/", storeID: 2 },
//   { name: "northtechcellsolutions", domain: "https://northtechcellsolutions.ca/", storeID: 5 },
//   { name: "phonephix", domain: "https://phonephix.ca/", storeID: 9 },
//   { name: "pradowireless", domain: "https://pradowireless.com/", storeID: 10 },
//   { name: "reparationcellulairebsl", domain: "https://reparationcellulairebsl.ca/", storeID: 7 },
//   { name: "wirelessrevottawa", domain: "https://wirelessrevottawa.ca/", storeID: 8 },
//   { name: "dccmtx", domain: "https://dev.mtlcmtx.com/", storeID: 1 },
//   { name: "mtlcmtx", domain: "https://dev.mtlcmtx.com/", storeID: 2 },
// ]
// const siteNum = 0,
//   subDomain = devicelist[siteNum].name,
//   apexDomain = "dccmtx.com"

function App(): JSX.Element {
  require(`./assets/${subDomain}/styles/index.scss`)
  const mainData = require(`./assets/${subDomain}/Database`)

  const [footerStatus, setFooterStatus] = useState(true)
  const [features, setFeatures] = useState<FeaturesParam[]>([])
  const [storeId, setStoreID] = useState(0)
  const [loadStatus, setLoadStatus] = useState(false)
  const [loadLocationStatus, setLoadLocationStatus] = useState(false)
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

    if (storeTabData.scriptTag) {
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
          const feats: FeaturesParam[] = [
            { flag: "ALWAYS_TRUE", isActive: true },
            { flag: "FRONTEND_INSURE", isActive: false },
          ]
          if (
            subDomain === "mobiletechlab" ||
            subDomain === "wirelessrevottawa" ||
            subDomain === "northtechsolutions" ||
            subDomain === "phonephix" ||
            subDomain === "pradowireless" ||
            subDomain === "dccmtx"
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
          setLoadLocationStatus(true)
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

      <Provider
        storesDetailsStore={storesDetails}
        repairWidgetStore={repairWidgetStore}
        repairWidDataStore={repairWidData}
      >
        {loadStatus && loadLocationStatus ? (
          <Router>
            <Header subDomain={subDomain} handleStatus={handleFooterStatus} features={features} />
            <BaseRouter
              subDomain={subDomain}
              handleStatus={handleFooterStatus}
              features={features}
            />
            <Badge />
            {footerStatus && (
              <Footer
                subDomain={subDomain}
                features={features}
                storesDetailsStore={storesDetails}
              />
            )}
          </Router>
        ) : (
          <Preloader />
        )}
      </Provider>
    </>
  )
}

export default App
