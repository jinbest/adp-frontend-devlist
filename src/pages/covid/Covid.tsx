import React, { useEffect, useState } from "react"
import { storesDetails } from "../../store"
import { Shape, Section1, Section2 } from "."
import { MetaParams } from "../../model/meta-params"
import { Helmet } from "react-helmet"

type Props = {
  handleStatus: (status: boolean) => void
}

const Covid = ({ handleStatus }: Props) => {
  const mainData = storesDetails.storeCnts.covidPage

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
        {metaList.map((item: MetaParams, index: number) => {
          return <meta name={item.name} content={item.content} key={index} />
        })}
      </Helmet>
      <Shape />
      <Section1 handleStatus={handleStatus} />
      <Section2 />
    </div>
  )
}

export default Covid
