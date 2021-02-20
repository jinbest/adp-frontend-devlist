import React, { useEffect, useState } from "react"
import { SectionMap } from "./"
import { Helmet } from "react-helmet"
import { inject } from "mobx-react"
import { observer } from "mobx-react-lite"
import { StoresDetails } from "../../store/StoresDetails"
import findLocationAPI from "../../services/api/findLocationAPI"
type Props = {
  subDomain: string
  storesDetailsStore: StoresDetails
  handleStatus: (status: boolean) => void
}
const Location = ({ subDomain, handleStatus, storesDetailsStore }: Props) => {
  const [pageTitle] = useState("Contact")
  const [locations, setLocations] = useState<any[]>([])

  useEffect(() => {
    findLocationAPI
      .findAllLocation(storesDetailsStore.store_id)
      .then((res: any) => {
        const locationData = res.data as any[]
        setLocations([...locationData])
      })
      .catch(() => {
        setLocations([])
      })
  }, [])
  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={""} />
      </Helmet>
      <SectionMap
        headerStore={storesDetailsStore}
        subDomain={subDomain}
        locations={locations}
        // locations={storesDetailsStore.findAddLocation}
        handleStatus={handleStatus}
      />
    </div>
  )
}
export default inject("storesDetailsStore")(observer(Location))
