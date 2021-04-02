import React, { useEffect, useState } from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
import { storesDetails } from "../../store"
// import jsPdf from "jspdf"
// import html2canvas from "html2canvas"

type Props = {
  subDomain?: string
  handleStatus: (status: boolean) => void
}

const PrivacyPolicy = ({ handleStatus }: Props) => {
  const classes = useStyles()
  const [t] = useTranslation()
  const data = storesDetails.storeCnts
  const htmlLink = "https://storage.googleapis.com/adp_assets/assets/4/mobiletech-policy.html"

  const [pageTitle, setPageTitle] = useState("Privacy Policy")
  const [metaDescription, setMetaDescription] = useState("")

  useEffect(() => {
    handleStatus(true)
    setPageTitle("Privacy Policy")
    setMetaDescription("")
  }, [])

  // const handlePDFDownload = () => {
  //   html2canvas(document.getElementById("content") as HTMLElement).then((canvas) => {
  //     document.body.appendChild(canvas)
  //     const imgData = canvas.toDataURL("image/png")
  //     const pdf = new jsPdf()
  //     pdf.addImage(imgData, "PNG", 0, 0)
  //     pdf.save("download.pdf")
  //   })
  // }

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <div className={classes.root}>
        <h1 className={classes.mainTitle}>{t("Coinsquare Privacy Statement")}</h1>
        <div style={{ textAlign: "right" }}>
          <a
            className={classes.download}
            style={{ color: data.colorPalle.textThemeCol }}
            // onClick={handlePDFDownload}
            href={htmlLink}
            target="_blank"
            rel="noreferrer"
          >
            {t("Download PDF")}
          </a>
        </div>
        <div className={classes.scrollViewer}>
          <iframe src={htmlLink} id="content"></iframe>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: "1440px",
      margin: "250px auto 0px !important",
      padding: "0 2rem",
      display: "block",
      textAlign: "left",
      ["@media (max-width:1200px)"]: {
        marginTop: "210px !important",
      },
      ["@media (max-width:500px)"]: {
        margin: "180px auto 0 !important",
      },
      ["@media (max-width:425px)"]: {
        margin: "200px auto 0 !important",
      },
    },
    download: {
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
      width: "fit-content",
      marginLeft: "auto",
      textDecoration: "none",
      "&:hover": {
        opacity: 0.7,
      },
    },
    scrollViewer: {
      width: "100%",
      boxShadow: "0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)",
      height: "100vh",
      marginTop: "20px",
      overflowY: "hidden",
      overflowX: "hidden",
      "& iframe": {
        width: "100%",
        height: "100%",
        outline: "none",
        border: "none",
      },
    },
    mainTitle: {
      color: "black",
      fontSize: "55px !important",
      lineHeight: "70px !important",
      fontWeight: "bold",
      justifyContent: "center",
      width: "1000px",
      maxWidth: "100%",
      ["@media (max-width:1400px)"]: {
        fontSize: "4vw !important",
        marginBottom: "3vw !important",
        width: "75vw",
        lineHeight: "5vw !important",
      },
      ["@media (max-width:768px)"]: {
        fontSize: "5vw !important",
        width: "85vw",
        lineHeight: "6vw !important",
      },
      ["@media (max-width:500px)"]: {
        fontSize: "4.5vw !important",
        width: "100%",
        textAlign: "center",
      },
    },
  })
)
