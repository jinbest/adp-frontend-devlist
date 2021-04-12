import React from "react"
import { Route } from "react-router-dom"
import { repairWidgetStore, storesDetails } from "./store/"
import { Home } from "./pages/home/"
import { Business } from "./pages/business/"
import { Locations } from "./pages/locations/"
import { Contact } from "./pages/contact"
import { Covid } from "./pages/covid"
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
  const routes = data.general.routes

  return (
    <>
      <Route
        path="/"
        exact
        component={() => (
          <Home subDomain={subDomain} features={features} handleStatus={handleStatus} />
        )}
      />
      <Route
        path={routes.repairPage}
        component={() => (
          <Repair subDomain={subDomain} handleStatus={handleStatus} features={features} />
        )}
      />
      <Route
        path={routes.contactPage}
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
        path={routes.repairWidgetPage}
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
        path={routes.businessPage}
        component={() => <Business subDomain={subDomain} handleStatus={handleStatus} />}
      />
      <Route
        path={routes.locationsPage}
        component={() => <Locations subDomain={subDomain} handleStatus={handleStatus} />}
      />
      <Route
        path={routes.covidPage}
        component={() => <Covid subDomain={subDomain} handleStatus={handleStatus} />}
      />
      {data.homepage.footer.bottomLinks.privacyPolicy.externalLink && (
        <Route
          path={routes.privacyPolicy}
          component={() => <PrivacyPolicy subDomain={subDomain} handleStatus={handleStatus} />}
        />
      )}
    </>
  )
}

export default BaseRouter
