import React, { useEffect, useState } from "react"
import {
  SectionMap,
  // ContactForm
} from "."
import { Helmet } from "react-helmet"
import { inject } from "mobx-react"
import { observer } from "mobx-react-lite"
import { StoresDetails } from "../../store/StoresDetails"
import findLocationAPI from "../../services/api/findLocationAPI"
import { useLocation } from "react-router-dom"

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

  useEffect(() => {
    handleStatus(true)
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
        <link rel="icon" id="favicon" href={mainData.fav.img} />
        <link rel="apple-touch-icon" href={mainData.fav.img} />
        {/* <meta name="description" content={""} /> */}
      </Helmet>
      <SectionMap
        headerStore={storesDetailsStore}
        subDomain={subDomain}
        locations={locations}
        handleStatus={handleStatus}
        location_id={query.get("location_id")}
      />
      {/* <ContactForm subDomain={subDomain} locations={locations} /> */}
    </div>
  )
}
export default inject("storesDetailsStore")(observer(Contact))
