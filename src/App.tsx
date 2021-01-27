import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { Footer, Header, Chat } from "./components"
import { Home } from "./pages/home/"
import { Repair, RepairWidget } from "./pages/repair/"
import { Provider } from "mobx-react"
import { storesDetails, repairWidgetStore } from "./store/"
import { LangProvider } from "./i18n/index"
import { appLoadAPI } from "./services/"

const domainMatch = window.location.hostname.match(/[a-zA-Z0-9-]*\.[a-zA-Z0-9-]*$/g)
const apexDomain = domainMatch ? domainMatch[0] : "localhost"
const subDomain = apexDomain.split(".")[0]

// const devicelist = [
//     "geebo",
//     "mobiletech",
//     "nanotech",
//     "northtech",
//     "phonephix",
//     "pradoWireless",
//     "wirelessRev",
//     "dccmtx",
//     "mtlcmtx",
// ]
// const subDomain = devicelist[8]

const publicFeatures = [
    { flag: "FEATURE_TRADE", isActive: true },
    { flag: "FEATURE_REPAIR", isActive: true },
    { flag: "FEATURE_REPAIR_QUOTE", isActive: true },
    { flag: "FEATURE_REPAIR_APPOINTMENT", isActive: true },
    { flag: "FEATURE_SHOP", isActive: true },
    { flag: "FEATURE_ONLINE_PURCHASE", isActive: true },
    { flag: "FEATURE_FIND_A_STORE", isActive: true },
    { flag: "FEATURE_USER_ACCOUNT", isActive: true },
    { flag: "FEATURE_USER_SIGNUP", isActive: true },
    { flag: "FEATURE_USER_LOGIN", isActive: true },
    { flag: "FEATURE_CHAT", isActive: true },
    { flag: "FEATURE_SEARCH", isActive: true },
    { flag: "FEATURE_GLOBAL_SEARCH", isActive: true },
    { flag: "FRONTEND_MEGA_MENU", isActive: true },
    { flag: "ALWAYS_TRUE", isActive: true },
]

function App(): JSX.Element {
    require(`./assets/${subDomain}/styles/index.scss`)

    const [footerStatus, setFooterStatus] = useState(true)

    const handleFooterStatus = (status: boolean) => {
        setFooterStatus(status)
    }

    useEffect(() => {
        appLoadAPI
            .getStoresDetail(apexDomain, false)
            .then((res: any) => {
                console.log("api-appLoadAPI => store details:", res.data)
                storesDetails.changestoresDetails(res.data)
            })
            .catch((error) => {
                console.log("Error in get Store Details", error)
            })
    }, [subDomain])

    const BaseRouter = () => {
        return (
            <>
                <Route
                    path="/"
                    exact
                    component={() => <Home subDomain={subDomain} features={publicFeatures} />}
                />
                <Route path="/home" render={() => <Redirect to="/" />} />
                <Route
                    path="/repair"
                    component={() => (
                        <Provider repairWidgetStore={repairWidgetStore}>
                            <Repair
                                subDomain={subDomain}
                                handleStatus={handleFooterStatus}
                                features={publicFeatures}
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
                                features={publicFeatures}
                            />
                        </Provider>
                    )}
                />
            </>
        )
    }

    return (
        <LangProvider>
            <Router>
                <Header
                    subDomain={subDomain}
                    handleStatus={handleFooterStatus}
                    features={publicFeatures}
                />
                <BaseRouter />
                <Chat subDomain={subDomain} features={publicFeatures} />
                {footerStatus && <Footer subDomain={subDomain} features={publicFeatures} />}
            </Router>
        </LangProvider>
    )
}

export default App
