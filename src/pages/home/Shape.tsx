import React from "react"
import { storesDetails } from "../../store"

const Shape = () => {
  const data = storesDetails.storeCnts
  return (
    <div>
      <div className={"corner-shape"}>
        <img src={data.homepage.section1.bannerImg} />
      </div>
    </div>
  )
}

export default Shape
