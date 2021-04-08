import React, { useState, useEffect } from "react"
import { ProductCard } from "./"
import { ProductModel } from "./product-model"
import { Grid } from "@material-ui/core"
// import { storesDetails } from "../../store"

const getWidth = () =>
  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

type GridMDInterface =
  | boolean
  | 2
  | 3
  | 1
  | 4
  | "auto"
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | undefined

const ProductList = () => {
  const [initGridMD, setInitGridMD] = useState<GridMDInterface>(3)

  const handleResize = () => {
    if (getWidth() < 960) {
      setInitGridMD(4)
    } else {
      setInitGridMD(3)
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const shopEachItem = {
    title: "iPhone 11 Pro",
    capacity: "128 GB",
    color: "#00B0F0",
    midCol: "Midnight Green",
    availableStore: "Available in Store",
    availableOnline: "Not available Online",
    price: "$897",
    asLow: "As low as $50 / mo",
    warranty: "12 months",
    img: "https://storage.googleapis.com/adp_assets/images/2/shop-iPhone.png",
    type: "New",
  }
  const propsData: ProductModel = shopEachItem
  const products: any[] = []
  for (let i = 0; i < 20; i++) {
    const cntData: ProductModel = {
      title: propsData.title,
      capacity: propsData.capacity,
      color: propsData.color,
      midCol: propsData.midCol,
      availableStore: propsData.availableStore,
      availableOnline: propsData.availableOnline,
      price: propsData.price,
      asLow: propsData.asLow,
      warranty: propsData.warranty,
      img: propsData.img,
      type: i % 4 === 0 ? "New" : i % 4 == 1 ? "Fair" : i % 4 === 2 ? "Good" : "Mint",
    }
    products.push(cntData)
  }

  return (
    <Grid container spacing={2}>
      {products.map((item: any, index: number) => {
        return (
          <Grid item xs={12} sm={initGridMD} key={index}>
            <ProductCard data={item} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ProductList
