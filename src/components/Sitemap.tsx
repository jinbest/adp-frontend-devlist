import React, { useEffect } from "react"
import XMLViewer from "react-xml-viewer"
import { Error } from "../pages/error/"
// import axios from "axios"

const xml_data = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->
    <url>
      <loc>https://mobiletechlab.ca/</loc>
      <lastmod>2021-02-26T20:08:58+00:00</lastmod>
    </url>
  </urlset>`

type Props = {
  subDomain?: string
  handleStatus: (status: boolean) => void
}

const Sitemap = ({ subDomain, handleStatus }: Props) => {
  useEffect(() => {
    handleStatus(false)
    // if (subDomain === "mobiletechlab") {
    //   const XMLData = require(`../assets/${subDomain}/sitemap.xml`).default
    //   axios
    //     .get(XMLData)
    //     .then((response) => {
    //       console.log("Your xml file as string", response.data)
    //     })
    //     .catch((error) => {
    //       console.log("Error to read XML file", error)
    //     })
    // }
  }, [])

  return (
    <section className={subDomain + "-Container"}>
      {subDomain === "mobiletechlab" ? (
        <XMLViewer xml={xml_data} style={{ marginTop: "150px" }} />
      ) : (
        <Error />
      )}
    </section>
  )
}

export default Sitemap
