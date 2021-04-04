import React, { useEffect, useState } from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
import { storesDetails } from "../../store"
import axios from "axios"
import ReactToPrint from "react-to-print"

type Props = {
  subDomain?: string
  handleStatus: (status: boolean) => void
}

const PrivacyPolicy = ({ handleStatus, subDomain }: Props) => {
  const classes = useStyles()
  const [t] = useTranslation()
  const data = storesDetails.storeCnts
  const htmlLink = data.homeTextData.footer.bottomLinks.privacyPolicy.externalLink

  const [pageTitle, setPageTitle] = useState("Privacy Statement")
  const [loading, setLoading] = useState(false)
  const [template, setTemplate] = useState("")

  useEffect(() => {
    handleStatus(true)
    setPageTitle(`${storesDetails.storesDetails.name} Privacy Statement`)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  useEffect(() => {
    axios
      .get(htmlLink)
      .then((res) => {
        setTemplate(res.data.template)
        setLoading(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (loading) {
      const contents = document.getElementsByClassName("content")
      for (let i = 0; i < contents.length; i++) {
        const content = contents[i] as HTMLElement
        content.style.margin = "20px 0"
      }
    }
  }, [loading])

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className={`${classes.root} ${subDomain}-privacy-policy`}>
        <h1 className={classes.mainTitle}>{t(pageTitle)}</h1>
        <div className={classes.download}>
          <ReactToPrint
            trigger={() => <a href="#">{t("Download ad PDF")}</a>}
            content={() => document.getElementsByClassName("container")[0] as HTMLDivElement}
          />
        </div>
        {loading && (
          <React.Fragment>
            <div
              className={`${classes.scrollViewer} scroll-viewer`}
              style={{ scrollBehavior: "smooth" }}
              dangerouslySetInnerHTML={{ __html: template }}
            ></div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default PrivacyPolicy

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: "1440px",
      padding: "0 2rem",
      display: "block",
      textAlign: "left",
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
      height: "calc(100vh - 290px)",
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
      fontSize: "50px !important",
      lineHeight: "0px !important",
      fontWeight: "bold",
      justifyContent: "center",
      textAlign: "center",
      maxWidth: "100%",
      // marginBottom: "40px",
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
