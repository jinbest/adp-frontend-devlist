import React, { useEffect, useState } from "react"
import { Shape, Section1, Section2, SectionWave, Section6 } from "./"
import { storesDetails } from "../../store"
import { Helmet } from "react-helmet"
import { MetaParams } from "../../model/meta-params"

type Props = {
  subDomain: string
  features: any[]
  handleStatus: (status: boolean) => void
}

const Home = ({ subDomain, features, handleStatus }: Props) => {
  const mainData = storesDetails.storeCnts.homepage

  const [pageTitle, setPageTitle] = useState("Store")
  const [metaList, setMetaList] = useState<MetaParams[]>([])

  useEffect(() => {
    const storeTabData = mainData.headData
    setPageTitle(storeTabData.title)
    setMetaList(storeTabData.metaList)
    handleStatus(true)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <link rel="icon" id="favicon" href={mainData.headData.fav.img} />
        <link rel="apple-touch-icon" href={mainData.headData.fav.img} />
        {metaList.map((item: MetaParams, index: number) => {
          return <meta name={item.name} content={item.content} key={index} />
        })}
      </Helmet>

      <Shape subDomain={subDomain} />
      <Section1 subDomain={subDomain} features={features} handleStatus={handleStatus} />
      <Section2 subDomain={subDomain} features={features} />
      <SectionWave subDomain={subDomain} handleStatus={handleStatus} />
      <Section6 subDomain={subDomain} />
    </div>
  )
}

export default Home
