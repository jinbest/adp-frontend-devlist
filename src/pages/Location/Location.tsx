import React, { useEffect, useState } from "react"
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
            {" "}
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
                {subDomain === "mobiletechlab" && <meta name="robots" content="noindex"></meta>}
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
