import React from "react"
import { storesDetails } from "../../store"

type Props = {
  subDomain?: string
}

const Shape = ({ subDomain }: Props) => {
  const data = storesDetails.storeCnts
  return (
    <div>
      <div className={subDomain + "-corner-shape"}>
        <img src={data.homepage.section1.bannerImg} />
      </div>
    </div>
  )
}

export default Shape
