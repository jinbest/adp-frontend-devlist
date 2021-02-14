import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { Footer, Header, Chat, Preloader } from "./components"
import { Home } from "./pages/home/"
import { Repair, RepairWidget } from "./pages/repair/"
import { Shop } from "./pages/shop/"
import { Provider } from "mobx-react"
import { storesDetails, repairWidgetStore } from "./store/"
import { LangProvider } from "./i18n/index"
import { appLoadAPI } from "./services/"
import { Helmet } from "react-helmet"

const domainMatch = window.location.hostname.match(/[a-zA-Z0-9-]*\.[a-zA-Z0-9-]*$/g)
const apexDomain = domainMatch ? domainMatch[0] : "dccmtx.com"
const subDomain = apexDomain.split(".")[0]

// const devicelist = [
//     "bananaservice",
//     "geebodevicerepair",
//     "mobiletechlabs",
//     "nanotechmobile",
//     "northtechsolutions",
//     "okotoksphonephix",
//     "pradowireless",
//     "wirelessrevottawa",
//     "dccmtx",
//     "mtlcmtx"
// ]
// const subDomain = devicelist[7]

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
        const favIcon = document.getElementById("favicon") as HTMLLinkElement
        favIcon.href = mainData.fav.img

        setPageTitle(storeTabData.title)
        setMetaDescription(storeTabData.metaDescription)
        setTagScript(storeTabData.headTag)

        loadScript(storeTabData.bodyTag)

        appLoadAPI
            .getStoresDetail(apexDomain, false)
            // .getStoresDetail('dccmtx.com', false)
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
                    const feats: FeatureProps[] = [{ flag: "ALWAYS_TRUE", isActive: true }, { flag: "FRONTEND_INSURE", isActive: false }]
                    if (
                        subDomain === "mobiletechlabs" ||
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
                    component={() => <Home subDomain={subDomain} features={features} />}
                />
                <Route path="/home" render={() => <Redirect to="/" />} />
                <Route
                    path="/repair"
                    component={() => (
                        <Provider repairWidgetStore={repairWidgetStore}>
                            <Repair
                                subDomain={subDomain}
                                handleStatus={handleFooterStatus}
                                features={features}
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
                        <Shop
                            subDomain={subDomain}
                            handleStatus={handleFooterStatus}
                            features={features}
                        />
                    )}
                />
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
                {subDomain === "mobiletechlabs" && <meta name="robots" content="noindex"></meta>}
                <script>{tagScript}</script>
            </Helmet>

            <LangProvider>
                {loadStatus ? (
                    <Router>
                        <Provider headerStore={storesDetails}>
                            <Header
                                subDomain={subDomain}
                                handleStatus={handleFooterStatus}
                                features={features}
                            />
                        </Provider>
                        <BaseRouter />
                        <Chat subDomain={subDomain} features={features} />
                        {footerStatus && <Footer subDomain={subDomain} features={features} />}
                    </Router>
                ) : (
                    <Preloader />
                )}
            </LangProvider>
        </>
    )
}

export default App
