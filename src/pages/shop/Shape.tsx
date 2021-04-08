import React from "react"
// import { storesDetails } from "../../store"

type Props = {
  subDomain?: string
}

const Shape = ({ subDomain }: Props) => {
  const cornerData = {
    img: "https://storage.googleapis.com/adp_assets/images/2/nano-shop-corner-shape.png",
  }
  return (
    <div className={subDomain + "-shop-corner-shape"}>
      <img src={cornerData.img} alt="shop-page-corner-shape" />
    </div>
  )
}

export default Shape
