import React, { useEffect, useState } from "react"
import { Shape, Section1, Section2, Section3, Section4, Section5, Section6, SectionMap } from "./"
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
const Home = ({ subDomain, features, handleStatus, storesDetailsStore }: Props) => {
    const mainData = require(`../../assets/${subDomain}/Database`)

    const SectionItemComponents = [Section4, Section5, Section6]
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
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
                {subDomain === "mobiletechlab" && <meta name="robots" content="noindex"></meta>}
            </Helmet>

            <Shape subDomain={subDomain} />
            {/* <SectionMap
                subDomain={subDomain}
                features={features}
                locations={storesDetailsStore.findAddLocation}
                handleStatus={handleStatus}
            /> */}
            <Section1
                locations={storesDetailsStore.findAddLocation}
                subDomain={subDomain}
                features={features}
                handleStatus={handleStatus}
            />
            <Section2 subDomain={subDomain} features={features} />
            <Section3 subDomain={subDomain} features={features} />
            {SectionItemComponents.map((SectionItem, index: number) => {
                return <SectionItem subDomain={subDomain} key={index} />
            })}
        </div>
    )
}
export default inject("storesDetailsStore")(observer(Home))
