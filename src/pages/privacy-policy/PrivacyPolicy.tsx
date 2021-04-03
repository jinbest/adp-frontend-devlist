import React, { useEffect, useState } from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
import { storesDetails } from "../../store"
// import { jsPDF } from "jspdf"
// import jsPDF from "jspdf"
// import html2canvas from "html2canvas"

type Props = {
  subDomain?: string
  handleStatus: (status: boolean) => void
}

const PrivacyPolicy = ({ handleStatus }: Props) => {
  const classes = useStyles()
  const [t] = useTranslation()
  const data = storesDetails.storeCnts
  const htmlLink = data.homeTextData.footer.bottomLinks.privacyPolicy.externalLink

  const [pageTitle, setPageTitle] = useState("Privacy Statement")

  useEffect(() => {
    handleStatus(false)
    setPageTitle(`${storesDetails.storesDetails.name} Privacy Statement`)
  }, [])

  const handlePDFDownload = async () => {
    // const doc = new jsPDF()
    // await doc.html(document.getElementById("content") as HTMLDivElement, {
    //   margin: 1,
    //   x: 0.1,
    //   y: 0.1,
    // })
    // doc.save("download.pdf")
    console.log("download pdf")
  }

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className={classes.root}>
        <h1 className={classes.mainTitle}>{t(pageTitle)}</h1>
        <div className={classes.download}>
          <a style={{ color: data.colorPalle.textThemeCol }} onClick={handlePDFDownload}>
            {t("Download PDF")}
          </a>
        </div>
        <div className={`${classes.scrollViewer} custom-scroll-bar`}>
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
      margin: "200px auto 0px !important",
      padding: "0 2rem",
      display: "block",
      textAlign: "left",
      ["@media (max-width:768px)"]: {
        margin: "180px auto 0 !important",
      },
      ["@media (max-width:600px)"]: {
        margin: "160px auto 0 !important",
      },
      ["@media (max-width:425px)"]: {
        margin: "185px auto 0 !important",
      },
    },
    download: {
      textAlign: "right",
      "& a": {
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
      ["@media (max-width:600px)"]: {
        marginTop: "-10px",
        "& a": {
          fontSize: "2.8vw",
        },
      },
    },
    scrollViewer: {
      width: "100%",
      boxShadow: "0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)",
      height: "calc(100vh - 300px)",
      marginTop: "10px",
      "& iframe": {
        width: "100%",
        height: "100%",
        outline: "none",
        border: "none",
      },
      ["@media (max-width:768px)"]: {
        height: "calc(100vh - 270px)",
      },
      ["@media (max-width:600px)"]: {
        height: "calc(100vh - 300px)",
      },
    },
    mainTitle: {
      color: "black",
      fontSize: "55px !important",
      lineHeight: "0px !important",
      fontWeight: "bold",
      justifyContent: "center",
      textAlign: "center",
      maxWidth: "100%",
      whiteSpace: "nowrap",
      ["@media (max-width:1400px)"]: {
        fontSize: "3.5vw !important",
      },
      ["@media (max-width:600px)"]: {
        fontSize: "5vw !important",
        whiteSpace: "inherit",
        lineHeight: "6.5vw !important",
      },
    },
  })
)
