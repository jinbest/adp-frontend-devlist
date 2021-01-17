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
const subDomain = devicelist[7];

function App(): JSX.Element {
    require(`./assets/${subDomain}/styles/index.css`);

    const [footerStatus, setFooterStatus] = useState(true);

    const handleFooterStatus = (status: boolean) => {
        setFooterStatus(status)
    }

    const BaseRouter = () => {
        return (
            <>
                <Route path="/" exact component={() => <Home subDomain={subDomain} />} />
                <Route path="/home" render={() => <Redirect to="/" />} />
                <Route
                    path="/repair"
                    component={() => (
                        <Provider repairWidgetStore={store}>
                            <Repair subDomain={subDomain} handleStatus={handleFooterStatus} />
                        </Provider>
                    )}
                />
                <Route
                    path="/repair-widget"
                    component={() => (
                        <Provider repairWidgetStore={store}>
                            <RepairWidget subDomain={subDomain} handleStatus={handleFooterStatus} />
                        </Provider>
                    )}
                />
            </>
        )
    }

    return (
        <LangProvider>
            <Router>
                <Header subDomain={subDomain} handleStatus={handleFooterStatus} />
                <BaseRouter />
                <Chat subDomain={subDomain} />
                {footerStatus && <Footer subDomain={subDomain} />}
            </Router>
        </LangProvider>
    )
}

export default App
