import React, { useState } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { Footer, Header, Chat } from "./components"
import { Home } from "./pages/home/"
import { Repair, RepairWidget } from "./pages/repair/"
import { Provider } from "mobx-react"
import store from "./store/RepairWidgetStore"
import { LangProvider } from "./i18n/index"

// const domainMatch = window.location.hostname.match(/[a-zA-Z0-9-]*\.[a-zA-Z0-9-]*$/)
// const subDomain = domainMatch ? domainMatch[0].split(".")[0] : "localhost"
const devicelist = [
    'devicelist', 
    'geebo', 
    'mobiletech', 
    'nanotech', 
    'northtech', 
    'phonephix', 
    'pradoWireless', 
    'wirelessRev'
]
const subDomain = devicelist[1];

const publicFeatures = [
    { flag: 'trade', isActive: true },
    { flag: 'repair', isActive: false },
    { flag: 'buy', isActive: true },
    { flag: 'protect', isActive: true },
    { flag: 'business', isActive: true },
    { flag: 'financing', isActive: true },
    { flag: 'wholesale', isActive: true },
    { flag: 'insurance', isActive: true },
    { flag: 'find-store', isActive: true },
    { flag: 'contact-us', isActive: true },
]

function App(): JSX.Element {
    require(`./assets/${subDomain}/styles/index.css`);

    const [footerStatus, setFooterStatus] = useState(true);

    const handleFooterStatus = (status: boolean) => {
        setFooterStatus(status)
    }

    const BaseRouter = () => {
        return (
            <>
                <Route path="/" exact component={() => <Home subDomain={subDomain} features={publicFeatures} />} />
                <Route path="/home" render={() => <Redirect to="/" />} />
                <Route
                    path="/repair"
                    component={() => (
                        <Provider repairWidgetStore={store}>
                            <Repair subDomain={subDomain} handleStatus={handleFooterStatus} features={publicFeatures} />
                        </Provider>
                    )}
                />
                <Route
                    path="/repair-widget"
                    component={() => (
                        <Provider repairWidgetStore={store}>
                            <RepairWidget subDomain={subDomain} handleStatus={handleFooterStatus} features={publicFeatures} />
                        </Provider>
                    )}
                />
            </>
        )
    }

    return (
        <LangProvider>
            <Router>
                <Header subDomain={subDomain} handleStatus={handleFooterStatus} features={publicFeatures} />
                <BaseRouter />
                <Chat subDomain={subDomain} />
                {footerStatus && <Footer subDomain={subDomain} />}
            </Router>
        </LangProvider>
    )
}

export default App
