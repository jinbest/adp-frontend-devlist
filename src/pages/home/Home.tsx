import React, { useEffect, useState } from "react"
import { Shape, Section1, Section2, Section3, Section4, Section5, Section6 } from "./"
import { storesDetails } from "../../store"
import { Helmet } from "react-helmet"

type Props = {
    subDomain: string
    features: any[]
}

const Home = ({ subDomain, features }: Props) => {
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
                {subDomain === "mobiletechlabs" && <meta name="robots" content="noindex"></meta>}
            </Helmet>

            <Shape subDomain={subDomain} />
            <Section1 subDomain={subDomain} features={features} />
            <Section2 subDomain={subDomain} features={features} />
            <Section3 subDomain={subDomain} features={features} />
            {SectionItemComponents.map((SectionItem, index: number) => {
                return <SectionItem subDomain={subDomain} key={index} />
            })}
        </div>
    )
}

export default Home
