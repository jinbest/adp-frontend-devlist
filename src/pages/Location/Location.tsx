import React, { useState } from "react"
import { SectionMap } from "./"
import { Helmet } from "react-helmet"
import { storesDetails } from "../../store"
import { inject } from "mobx-react"
import { observer } from "mobx-react-lite"
import { StoresDetails } from "../../store/StoresDetails"

type Props = {
  subDomain: string
  storesDetailsStore: StoresDetails
  handleStatus: (status: boolean) => void
}
const Location = ({ subDomain, handleStatus, storesDetailsStore }: Props) => {
  const [pageTitle] = useState("Contact")

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <SectionMap
        headerStore={storesDetails}
        subDomain={subDomain}
        locations={storesDetailsStore.findAddLocation}
        handleStatus={handleStatus}
      />
    </div>
  )
}
export default inject("storesDetailsStore")(observer(Location))
