import React, { useEffect, useState } from "react"
import { SectionMap } from "./"
import Map from "../../components/Map"
import { storesDetails } from "../../store"
import { Helmet } from "react-helmet"
import { inject } from "mobx-react"
import { observer } from "mobx-react-lite"
import { StoresDetails } from "../../store/StoresDetails"
type Props = {
    subDomain: string
    features: any[]
    storesDetailsStore: StoresDetails
    handleStatus: (status: boolean) => void
}
const Location = ({ subDomain, features, handleStatus, storesDetailsStore }: Props) => {
    const mainData = require(`../../assets/${subDomain}/Database`)

    const [pageTitle, setPageTitle] = useState("Store")
    const [metaDescription, setMetaDescription] = useState("")

    useEffect(() => {
        const storeTabData = mainData.getTabData(storesDetails.storesDetails.name)
        const favIcon = document.getElementById("favicon") as HTMLLinkElement
        favIcon.href = mainData.fav.img

        setPageTitle(storeTabData.title)
        setMetaDescription(storeTabData.metaDescription)
    }, [])

    return (
        <div>
            <SectionMap
                headerStore={storesDetails}
                subDomain={subDomain}
                features={features}
                locations={storesDetailsStore.findAddLocation}
                handleStatus={handleStatus}
            />
        </div>
    )
}
export default inject("storesDetailsStore")(observer(Location))
