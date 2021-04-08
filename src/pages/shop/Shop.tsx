import React, { useState, useEffect } from "react"
import { Error } from "../error"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import { Shape, ProductList, SortbyDropdown, FilterComponent, RightDrawer } from "./"
import { storesDetails } from "../../store"

type Props = {
  subDomain: string
  handleStatus: (status: boolean) => void
  features: any[]
}

const Shop = ({ subDomain, handleStatus, features }: Props) => {
  const mainData = storesDetails.storeCnts
  const mainCol = mainData.general.colorPalle.themeCol

  const [feats, setFeatures] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    handleStatus(true)
  }, [])

  useEffect(() => {
    const cntFeatures: any[] = []
    for (let i = 0; i < features.length; i++) {
      if (features[i].isActive) {
        cntFeatures.push(features[i].flag)
      }
    }
    setFeatures(cntFeatures)
  }, [features])

  return (
    <FeatureToggles features={feats}>
      <Feature
        name="FRONTEND_BUY"
        inactiveComponent={() => <Error />}
        activeComponent={() => (
          <div className={subDomain + "-shop-main-page"} id="shop-main-page">
            <Shape subDomain={subDomain} />
            <section className={subDomain + "-Container"}>
              <div className="shop-mobile-filter-by">
                <p onClick={toggle} style={{ border: `1px solid ${mainCol}`, color: mainCol }}>
                  Filter By
                </p>
                {isOpen && <div className="drawer-cover" onClick={toggle}></div>}
                <RightDrawer open={isOpen} subDomain={subDomain} />
              </div>
              <div style={{ display: "flex" }}>
                <div className="shop-filter-component">
                  <SortbyDropdown
                    subDomain={subDomain}
                    options={["First", "Second", "Third"]}
                    title="Filter By"
                  />
                  <FilterComponent subDomain={subDomain} />
                </div>
                <div>
                  <ProductList />
                </div>
              </div>
            </section>
          </div>
        )}
      />
    </FeatureToggles>
  )
}

export default Shop
