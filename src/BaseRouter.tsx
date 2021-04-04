import React from "react"
import { Route, Redirect } from "react-router-dom"
import { repairWidgetStore, storesDetails } from "./store/"
import { Home } from "./pages/home/"
import { Business } from "./pages/business/"
import { Locations } from "./pages/locations/"
import { Contact } from "./pages/contact"
import { Repair, RepairWidget } from "./pages/repair/"
import { FeaturesParam } from "./model/feature-toggle"
import { PrivacyPolicy } from "./pages/privacy-policy"

type Props = {
  subDomain: string
  features: FeaturesParam[]
  handleStatus: (status: boolean) => void
}

const BaseRouter = ({ subDomain, features, handleStatus }: Props) => {
  const data = storesDetails.storeCnts

  return (
    <>
      <Route
        path="/"
        exact
        component={() => (
          <Home subDomain={subDomain} features={features} handleStatus={handleStatus} />
        )}
      />
      <Route path="/home" render={() => <Redirect to="/" />} />
      <Route
        path="/quote"
        component={() => (
          <Repair subDomain={subDomain} handleStatus={handleStatus} features={features} />
        )}
      />
      <Route
        path="/contact"
        component={() => (
          <Contact
            storesDetailsStore={storesDetails}
            subDomain={subDomain}
            handleStatus={handleStatus}
            features={features}
          />
        )}
      />
      <Route
        path="/get-quote"
        component={() => (
          <RepairWidget
            subDomain={subDomain}
            handleStatus={handleStatus}
            features={features}
            repairWidgetStore={repairWidgetStore}
          />
        )}
      />
      <Route
        path="/business"
        component={() => <Business subDomain={subDomain} handleStatus={handleStatus} />}
      />
      <Route
        path="/locations"
        component={() => <Locations subDomain={subDomain} handleStatus={handleStatus} />}
      />
      <Route
        path={data.homeTextData.footer.bottomLinks.privacyPolicy.link}
        component={() =>
          data.homeTextData.footer.bottomLinks.privacyPolicy.externalLink ? (
            <PrivacyPolicy subDomain={subDomain} handleStatus={handleStatus} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      {/* <Redirect to="/" /> */}
    </>
  )
}

export default BaseRouter
