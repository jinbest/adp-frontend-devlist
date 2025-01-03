import React, { useState, useEffect } from "react"
import { Section1, Section2, Section4 } from "./"
import { Error } from "../error"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import { repairWidgetStore, storesDetails } from "../../store"
import { Helmet } from "react-helmet"
import { MetaParams } from "../../model/meta-params"

type Props = {
  handleStatus: (status: boolean) => void
  features: any[]
}

const Repair = ({ handleStatus, features }: Props) => {
  const data = storesDetails.storeCnts
  const thisPage = data.repairPage

  const [feats, setFeatures] = useState<any[]>([])
  const [pageTitle, setPageTitle] = useState("Quotes | ")
  const [metaList, setMetaList] = useState<MetaParams[]>([])

  useEffect(() => {
    const cntFeatures: any[] = []
    for (let i = 0; i < features.length; i++) {
      if (features[i].isActive) {
        cntFeatures.push(features[i].flag)
      }
    }
    setFeatures(cntFeatures)
  }, [features])

  useEffect(() => {
    setPageTitle(thisPage.headData.title)
    setMetaList(thisPage.headData.metaList)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        {metaList.map((item: MetaParams, index: number) => {
          return <meta name={item.name} content={item.content} key={index} />
        })}
      </Helmet>
      <FeatureToggles features={feats}>
        <Feature
          name="FRONTEND_REPAIR"
          inactiveComponent={() => <Error />}
          activeComponent={() => (
            <div>
              <Section1
                handleStatus={handleStatus}
                repairWidgetStore={repairWidgetStore}
                features={feats}
              />
              <Section2 />
              {/* <Section3 /> */}
              <Section4 handleStatus={handleStatus} />
            </div>
          )}
        />
      </FeatureToggles>
    </>
  )
}

export default Repair
