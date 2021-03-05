import React from "react"
import { Route, Redirect } from "react-router-dom"
import { storesDetails } from "./store/"
import { Home } from "./pages/home/"
import { Business } from "./pages/business/"
import { Contact } from "./pages/contact"
import { Repair, RepairWidget } from "./pages/repair/"
import { FeaturesParam } from "./model/feature-toggle"

type Props = {
  subDomain: string
  features: FeaturesParam[]
  handleStatus: (status: boolean) => void
}

const BaseRouter = ({ subDomain, features, handleStatus }: Props) => {
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
          />
        )}
      />
      <Route
        path="/get-quote"
        component={() => (
          <RepairWidget subDomain={subDomain} handleStatus={handleStatus} features={features} />
        )}
      />
      <Route
        path="/business"
        component={() => <Business subDomain={subDomain} handleStatus={handleStatus} />}
      />
    </>
  )
}

export default BaseRouter
