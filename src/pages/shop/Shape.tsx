import React from "react"
import { storesDetails } from "../../store"

type Props = {
  subDomain?: string
}

const Shape = ({ subDomain }: Props) => {
  const data = storesDetails.storeCnts
  const cornerData = data.shopPageData.cornerShape
  return (
    <div className={subDomain + "-shop-corner-shape"}>
      <img src={cornerData.img} alt="shop-page-corner-shape" />
    </div>
  )
}

export default Shape
