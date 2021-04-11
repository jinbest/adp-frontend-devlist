import React, { useEffect, useState } from "react"
import { storesDetails } from "../../store"
import { Shape, Section1, Section2 } from "."
import { MetaParams } from "../../model/meta-params"
import { Helmet } from "react-helmet"

type Props = {
  subDomain?: string
  handleStatus: (status: boolean) => void
}

const Covid = ({ handleStatus, subDomain }: Props) => {
  const mainData = storesDetails.storeCnts.covidPage

  const [pageTitle, setPageTitle] = useState("Store")
  const [metaList, setMetaList] = useState<MetaParams[]>([])

  useEffect(() => {
    const storeTabData = mainData.headData
    setPageTitle(storeTabData.title)
    setMetaList(storeTabData.metaList)
    handleStatus(true)
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
      <Section1 subDomain={subDomain} handleStatus={handleStatus} />
      <Section2 />
    </div>
  )
}

export default Covid
