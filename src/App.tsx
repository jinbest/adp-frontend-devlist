import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { Footer, Header, Chat, Preloader } from "./components"
import { Home } from "./pages/home/"
import { Repair, RepairWidget } from "./pages/repair/"
import { Provider } from "mobx-react"
import { storesDetails, repairWidgetStore } from "./store/"
import { LangProvider } from "./i18n/index"
import { appLoadAPI } from "./services/"

const domainMatch = window.location.hostname.match(/[a-zA-Z0-9-]*\.[a-zA-Z0-9-]*$/g)
const apexDomain = domainMatch ? domainMatch[0] : "localhost"
const subDomain = apexDomain.split(".")[0]

function App(): JSX.Element {
    require(`./assets/${subDomain}/styles/index.scss`)

    const [footerStatus, setFooterStatus] = useState(true)
    const [features, setFeatures] = useState<any[]>([])
    const [storeId, setStoreID] = useState(0)
    const [loadStatus, setLoadStatus] = useState(false)

    const handleFooterStatus = (status: boolean) => {
        setFooterStatus(status)
    }

    useEffect(() => {
        appLoadAPI
            .getStoresDetail(apexDomain, false)
            .then((res: any) => {
                console.log("api-appLoadAPI => store details:", res.data)
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
                    console.log("api-appLoadAPI => get features:", res.data)
                    const feats: any[] = [{ flag: "ALWAYS_TRUE", isActive: true }]
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
                    path="/repair-widget"
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
            </>
        )
    }

    return (
        <LangProvider>
            {loadStatus ? (
                <Router>
                    <Header
                        subDomain={subDomain}
                        handleStatus={handleFooterStatus}
                        features={features}
                    />
                    <BaseRouter />
                    <Chat subDomain={subDomain} features={features} />
                    {footerStatus && <Footer subDomain={subDomain} features={features} />}
                </Router>
            ) : (
                <Preloader />
            )}
        </LangProvider>
    )
}

export default App
