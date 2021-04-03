import React, { useEffect, useState } from "react"
import { Shape, Section1, Section2, Section3, Section4, Section5, Section6 } from "./"
import { storesDetails } from "../../store"
import { Helmet } from "react-helmet"

type Props = {
  subDomain: string
  features: any[]
  handleStatus: (status: boolean) => void
}

const Home = ({ subDomain, features, handleStatus }: Props) => {
  const mainData = storesDetails.storeCnts

  const SectionItemComponents = [Section4, Section5, Section6]
  const [pageTitle, setPageTitle] = useState("Store")
  const [metaDescription, setMetaDescription] = useState("")

  useEffect(() => {
    const storeTabData = mainData.getTabData
    setPageTitle(storeTabData.title)
    setMetaDescription(storeTabData.metaDescription)
    handleStatus(true)
  }, [])

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <link rel="icon" id="favicon" href={mainData.fav.img} />
        <link rel="apple-touch-icon" href={mainData.fav.img} />
        <meta name="description" content={metaDescription} />
      </Helmet>

      <Shape subDomain={subDomain} />
      <Section1 subDomain={subDomain} features={features} handleStatus={handleStatus} />
      <Section2 subDomain={subDomain} features={features} />
      <Section3 subDomain={subDomain} features={features} />
      {SectionItemComponents.map((SectionItem, index: number) => {
        return <SectionItem subDomain={subDomain} key={index} />
      })}
    </div>
  )
}

export default Home
