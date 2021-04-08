import React from "react"
import { storesDetails } from "../../store"

type Props = {
  subDomain?: string
}

const Shape = ({ subDomain }: Props) => {
  const data = storesDetails.storeCnts
  const shapeData = data.homepage.section1.shapeData
  return (
    <div>
      <div className={subDomain + "-corner-shape"} style={{ width: shapeData.cornerShape.width }}>
        <img src={shapeData.cornerShape.img} />
      </div>
      <div className={subDomain + "-mockup-shape"}>
        {shapeData.mockupShape && <img src={shapeData.mockupShape.img} />}
      </div>
    </div>
  )
}

export default Shape
