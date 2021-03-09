import React from "react"
import { Button } from "../../components"
import { Typography, Box } from "@material-ui/core"
// import { useT } from "../../i18n/index"
// import { LangProps } from "../../i18n/en"
import { useTranslation } from "react-i18next"

type Props = {
  subDomain?: string
}

const Section5 = ({ subDomain }: Props) => {
  const data = require(`../../assets/${subDomain}/Database`)
  const bounceData = data.homeTextData.section5
  const [t] = useTranslation()

  return (
    <section className={subDomain + "-sec5-Back"} style={{ display: "none" }}>
      <Box className={subDomain + "-Container " + subDomain + "-sec5-container"}>
        <Typography className="f40 bold mg-t-1">{t(bounceData.title)}</Typography>
        <Typography className="f18">{t(bounceData.content)}</Typography>
        <img
          className={"mg-t-1 " + subDomain + "-section5-img"}
          src={require("../../assets/_common/img/bounce.png").default}
        />
        <Typography className="f24 bold">{t(bounceData.subtitle)}</Typography>
        <Box className="col_center">
          <ul>
            <Typography className={subDomain + "-protect-content"}>
              {t(bounceData.subcontent)}
            </Typography>
            {bounceData.subcontentData.map((item: string, index: number) => {
              return (
                <li key={index} className={subDomain + "-protect-content"}>
                  <span className="dot">&nbsp;&bull;&nbsp;</span>
                  {t(item)}
                </li>
              )
            })}
          </ul>
        </Box>
        <Box className={subDomain + "-sec5-button"}>
          <Button
            title={t(bounceData.btnTitle)}
            bgcolor={data.colorPalle.themeColor}
            borderR="20px"
            subDomain={subDomain}
          />
        </Box>
      </Box>
    </section>
  )
}

export default Section5
