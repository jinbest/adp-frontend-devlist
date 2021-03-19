import React from "react"
import { storesDetails } from "../../store"

type Props = {
  subDomain?: string
}

const Shape = ({ subDomain }: Props) => {
  const data = storesDetails.storeCnts
  return (
    <div>
      <div
        className={subDomain + "-corner-shape"}
        style={{ width: data.shapeData.cornerShape.width }}
      >
        <img src={data.shapeData.cornerShape.img} />
      </div>
      <div className={subDomain + "-mockup-shape"}>
        {data.shapeData.mockupShape && <img src={data.shapeData.mockupShape.img} />}
      </div>
    </div>
  )
}

export default Shape
