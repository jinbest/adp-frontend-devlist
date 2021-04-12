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
  features: FeaturesParam[]
  handleStatus: (status: boolean) => void
}

const BaseRouter = ({ features, handleStatus }: Props) => {
  const data = storesDetails.storeCnts
  const routes = data.general.routes

  return (
    <>
      <Route
        path="/"
        exact
        component={() => <Home features={features} handleStatus={handleStatus} />}
      />
      <Route
        path={routes.repairPage}
        component={() => <Repair handleStatus={handleStatus} features={features} />}
      />
      <Route
        path={routes.contactPage}
        component={() => (
          <Contact
            storesDetailsStore={storesDetails}
            handleStatus={handleStatus}
            features={features}
          />
        )}
      />
      <Route
        path={routes.repairWidgetPage}
        component={() => (
          <RepairWidget
            handleStatus={handleStatus}
            features={features}
            repairWidgetStore={repairWidgetStore}
          />
        )}
      />
      <Route
        path={routes.businessPage}
        component={() => <Business handleStatus={handleStatus} />}
      />
      <Route
        path={routes.locationsPage}
        component={() => <Locations handleStatus={handleStatus} />}
      />
      <Route path={routes.covidPage} component={() => <Covid handleStatus={handleStatus} />} />
      {data.homepage.footer.bottomLinks.privacyPolicy.externalLink && (
        <Route
          path={routes.privacyPolicy}
          component={() => <PrivacyPolicy handleStatus={handleStatus} />}
        />
      )}
    </>
  )
}

export default BaseRouter
