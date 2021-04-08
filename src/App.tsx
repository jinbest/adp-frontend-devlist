import React, { useState, useEffect } from "react"
import { Provider } from "mobx-react"
import { Helmet } from "react-helmet"
import { BrowserRouter as Router } from "react-router-dom"
import { Footer, Header, Preloader, Badge } from "./components"
import { storesDetails, repairWidgetStore, repairWidData } from "./store/"
import { appLoadAPI, findLocationAPI } from "./services/"
import BaseRouter from "./BaseRouter"
import { FeaturesParam } from "./model/feature-toggle"
import { MetaParams } from "./model/meta-params"
import { ScriptParams } from "./model/script-params"
import { TagParams } from "./model/tag-params"
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
// const siteNum = 9,
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
  const [favIcon, setFavIcon] = useState("")
  const [metaList, setMetaList] = useState<MetaParams[]>([])
  const [scriptList, setScriptList] = useState<ScriptParams[]>([])
  const [condition, setCondition] = useState<any>({})
  const parser = new DOMParser()

  const handleFooterStatus = (status: boolean) => {
    setFooterStatus(status)
  }

  const loadBodyTag = (tag: string) => {
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

  const handleTabData = (mainData: any) => {
    const homepage = mainData.homepage,
      scripts: ScriptParams[] = []

    setPageTitle(homepage.headData.title)
    setMetaList(homepage.headData.metaList)
    setFavIcon(homepage.headData.fav.img)

    homepage.bodyData.tags.forEach((item: TagParams) => {
      loadBodyTag(item.content)
    })
    homepage.headData.scripts.forEach((item: ScriptParams) => {
      if (item.type === "reamaze" && item.content) {
        const script = document.createElement("script")
        script.type = "text/javascript"
        script.append(item.content)
        document.body.appendChild(script)
        const scriptReamaze = document.createElement("script")
        scriptReamaze.type = "text/javascript"
        scriptReamaze.src = "https://cdn.reamaze.com/assets/reamaze.js"
        scriptReamaze.async = true
        document.body.appendChild(scriptReamaze)
      } else if (item.type !== "reamaze") {
        scripts.push(item)
      }
    })
    setScriptList(scripts)
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

  useEffect(() => {
    if (loadStatus && loadStoreConfig) {
      setCondition({ ...storesDetails.storeCnts.general.condition })
      if (storesDetails.storeCnts.general.condition.hasShopLink) {
        setFeatures([...features, { flag: "FRONTEND_BUY", isActive: true }])
      }
    }
  }, [loadStatus, loadStoreConfig])

  return (
    <Provider
      storesDetailsStore={storesDetails}
      repairWidgetStore={repairWidgetStore}
      repairWidDataStore={repairWidData}
    >
      {loadStatus && loadLocationStatus && loadStoreConfig ? (
        <>
          <Helmet>
            <title>{pageTitle}</title>
            <link rel="icon" id="favicon" href={favIcon} />
            <link rel="apple-touch-icon" href={favIcon} />
            {metaList.map((item: MetaParams, index: number) => {
              return <meta name={item.name} content={item.content} key={index} />
            })}
            {condition.googleVerification.status && (
              <meta
                name={condition.googleVerification.metaData.name}
                content={condition.googleVerification.metaData.content}
              />
            )}
            {scriptList.map((item: ScriptParams, index: number) => {
              return <script key={index}>{item.content}</script>
            })}
          </Helmet>
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
        </>
      ) : (
        <Preloader />
      )}
    </Provider>
  )
}

export default App
