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
//   { name: "bananaservices", domain: "bananaservices.ca", storeID: 1 },
//   { name: "geebodevicerepair", domain: "geebodevicerepair.ca", storeID: 3 },
//   { name: "mobiletechlab", domain: "mobiletechlab.ca", storeID: 4 },
//   { name: "nanotechmobile", domain: "nanotechmobile.ca", storeID: 2 },
//   { name: "northtechcellsolutions", domain: "northtechcellsolutions.ca", storeID: 5 },
//   { name: "phonephix", domain: "phonephix.ca", storeID: 9 },
//   { name: "pradowireless", domain: "pradowireless.com", storeID: 10 },
//   { name: "reparationcellulairebsl", domain: "reparationcellulairebsl.ca", storeID: 7 },
//   { name: "wirelessrevottawa", domain: "wirelessrevottawa.ca", storeID: 8 },
//   { name: "dccmtx", domain: "https://dev.mtlcmtx.com/", storeID: 1 },
//   { name: "mtlcmtx", domain: "https://dev.mtlcmtx.com/", storeID: 2 },
// ]
// const siteNum = 0,
//   subDomain = devicelist[siteNum].name,
//   apexDomain = "dccmtx.com"

function App(): JSX.Element {
  require(`./assets/${subDomain}/styles/index.scss`)

  const [footerStatus, setFooterStatus] = useState(true)
  const [features, setFeatures] = useState<FeaturesParam[]>([])
  const [storeId, setStoreID] = useState(0)
  const [loadStatus, setLoadStatus] = useState(false)
  const [loadLocationStatus, setLoadLocationStatus] = useState(false)
  const [loadStoreConfig, setLoadStoreConfig] = useState(false)
  const [pageTitle, setPageTitle] = useState("Store")
  const [metaDescription, setMetaDescription] = useState("")
  const [favIcon, setFavIcon] = useState("")
  const [tagScript, setTagScript] = useState(undefined)
  const parser = new DOMParser()

  const handleFooterStatus = (status: boolean) => {
    setFooterStatus(status)
  }

  const handleTabData = (mainData: any) => {
    const storeTabData = mainData.getTabData

    setPageTitle(storeTabData.title)
    setMetaDescription(storeTabData.metaDescription)
    setTagScript(storeTabData.headTag)
    loadScript(storeTabData.bodyTag)
    setFavIcon(mainData.fav.img)

    if (storeTabData.scriptTag) {
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.prepend(storeTabData.scriptTag)
      document.body.prepend(script)
    }
  }

  useEffect(() => {
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
            subDomain === "northtechcellsolutions" ||
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

      appLoadAPI
        .getStoreConfig(storeId)
        .then((res: any) => {
          storesDetails.changeStoreCnts(res[0].data)
          storesDetails.changeCommonCnts(res[1].data)
          handleTabData(res[0].data)
          setLoadStoreConfig(true)
        })
        .catch((err) => {
          console.log("Error in get Store Config", err)
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
        <link rel="icon" id="favicon" href={favIcon} />
        <link rel="apple-touch-icon" href={favIcon} />
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
        {loadStatus && loadLocationStatus && loadStoreConfig ? (
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
