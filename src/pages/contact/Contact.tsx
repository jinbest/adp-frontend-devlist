import React, { useEffect, useState } from "react"
import { SectionMap, ContactForm } from "."
import { Helmet } from "react-helmet"
import { inject } from "mobx-react"
import { observer } from "mobx-react-lite"
import { StoresDetails } from "../../store/StoresDetails"
import { useLocation } from "react-router-dom"
import { Provider } from "mobx-react"
import { storesDetails } from "../../store"

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

type Props = {
  subDomain: string
  storesDetailsStore: StoresDetails
  handleStatus: (status: boolean) => void
}

const Contact = ({ subDomain, handleStatus, storesDetailsStore }: Props) => {
  const mainData = require(`../../assets/${subDomain}/Database`)
  const query = useQuery()

  const [pageTitle] = useState("Contact")
  const [locations, setLocations] = useState<any[]>([])
  const [locationID, setLocationID] = useState(query.get("location_id"))

  useEffect(() => {
    handleStatus(true)
    setLocations([...storesDetailsStore.allLocations])
  }, [storesDetailsStore.allLocations])

  useEffect(() => {
    setLocationID(locationID)
  }, [locationID])

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <link rel="icon" id="favicon" href={mainData.fav.img} />
        <link rel="apple-touch-icon" href={mainData.fav.img} />
        <meta name="description" content={""} />
      </Helmet>
      <SectionMap
        storesDetailsStore={storesDetailsStore}
        subDomain={subDomain}
        locations={locations}
        handleStatus={handleStatus}
        location_id={locationID}
        handleLocationID={setLocationID}
      />
      <Provider storesDetailsStore={storesDetails}>
        <ContactForm
          subDomain={subDomain}
          locations={locations}
          locationID={locationID}
          handleLocationID={setLocationID}
          storesDetailsStore={storesDetailsStore}
        />
      </Provider>
    </div>
  )
}
export default inject("storesDetailsStore")(observer(Contact))
