import React, { useEffect, useState } from "react"
import { SectionMap, ContactForm } from "."
import { Helmet } from "react-helmet"
import { inject } from "mobx-react"
import { observer } from "mobx-react-lite"
import { StoresDetails } from "../../store/StoresDetails"
import { useQuery } from "../../services/helper"
import { Provider } from "mobx-react"
import { storesDetails } from "../../store"

type Props = {
  subDomain: string
  storesDetailsStore: StoresDetails
  handleStatus: (status: boolean) => void
  features: any[]
}

const Contact = ({ subDomain, handleStatus, storesDetailsStore, features }: Props) => {
  const mainData = storesDetailsStore.storeCnts
  const query = useQuery()

  const [locations, setLocations] = useState<any[]>([])
  const [locationID, setLocationID] = useState(0)

  const [pageTitle, setPageTitle] = useState("Contact Us | ")
  const [metaDescription, setMetaDescription] = useState("")

  useEffect(() => {
    const storeTabData = mainData.getTabData
    setPageTitle(storeTabData.contactTitle)
    setMetaDescription(storeTabData.contactMetaDes)
    handleStatus(true)
  }, [])

  useEffect(() => {
    setLocations([...storesDetailsStore.allLocations])
  }, [storesDetailsStore.allLocations])

  useEffect(() => {
    if (Number(query.get("location_id"))) {
      setLocationID(Number(query.get("location_id")))
    } else if (storesDetailsStore.allLocations.length) {
      for (let i = 0; i < storesDetailsStore.allLocations.length; i++) {
        if (storesDetailsStore.allLocations[i].is_main) {
          setLocationID(storesDetailsStore.allLocations[i].id)
        }
      }
    }
  }, [])

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" id="favicon" href={mainData.fav.img} />
        <link rel="apple-touch-icon" href={mainData.fav.img} />
      </Helmet>
      {locations.length && locationID && (
        <SectionMap
          storesDetailsStore={storesDetailsStore}
          subDomain={subDomain}
          locations={locations}
          handleStatus={handleStatus}
          location_id={locationID}
          handleLocationID={setLocationID}
          features={features}
        />
      )}
      {locations.length && locationID && (
        <Provider storesDetailsStore={storesDetails}>
          <ContactForm
            subDomain={subDomain}
            locations={locations}
            locationID={locationID}
            handleLocationID={setLocationID}
            storesDetailsStore={storesDetailsStore}
          />
        </Provider>
      )}
    </div>
  )
}
export default inject("storesDetailsStore")(observer(Contact))
