import React, { useState } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { Footer, Header, Chat } from "./components"
import { Home } from "./pages/home/"
import { Repair, RepairWidget } from "./pages/repair/"
import { Provider } from "mobx-react"
import store from "./store/RepairWidgetStore"
import { LangProvider } from "./i18n/index"

const domainMatch = window.location.hostname.match(/[a-zA-Z0-9-]*\.[a-zA-Z0-9-]*$/g)
const subDomain = domainMatch ? domainMatch[0].split(".")[0] : "localhost"

// const devicelist = [
//     'devicelist',
//     'geebo',
//     'mobiletech',
//     'nanotech',
//     'northtech',
//     'phonephix',
//     'pradoWireless',
//     'wirelessRev'
// ]
// const subDomain = devicelist[2];

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
    { flag: "ALWAYS_TRUE", isActive: true },
]

function App(): JSX.Element {
    require(`./assets/${subDomain}/styles/index.css`)
    // require(`./assets/${subDomain}/scss/index.scss`);

    const [footerStatus, setFooterStatus] = useState(true)

    const handleFooterStatus = (status: boolean) => {
        setFooterStatus(status)
    }

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
                        <Provider repairWidgetStore={store}>
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
                        <Provider repairWidgetStore={store}>
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
                {footerStatus && <Footer subDomain={subDomain} />}
            </Router>
        </LangProvider>
    )
}

export default App
