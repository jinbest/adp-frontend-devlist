import React, { useEffect, useState } from "react"
import FormControl from "@material-ui/core/FormControl"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import NativeSelect from "@material-ui/core/NativeSelect"
import i18n from "../i18-next/i18n"
import { useTranslation } from "react-i18next"

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      margin: "0 5px",
      marginTop: "-3px",
    },
    selectOption: {
      color: "black",
      padding: "10px",
      marginLeft: "10px",
      fontSize: "14px",
    },
  })
)

type Props = {
  subDomain?: string
  color: string
}

const LangDropdown = ({ subDomain, color }: Props) => {
  const data = require(`../assets/${subDomain}/Database`)
  const themeCol = data.colorPalle.themeColor
  const classes = useStyles()
  const [t] = useTranslation()

  const options = ["English", "French"]

  const [state, setState] = useState("English")

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const la = event.target.value
    let cntLang = "en"
    setState(la)
    cntLang = la === "English" ? "en" : "fr"
    i18n.changeLanguage(la === "English" ? "en" : "fr")
    window.localStorage.setItem("cntLang", cntLang)
  }

  useEffect(() => {
    const cntLang = window.localStorage.getItem("cntLang") || "en"
    cntLang === "en" ? setState(options[0]) : setState(options[1])
    i18n.changeLanguage(cntLang)
  }, [])

  return (
    <div>
      <FormControl className={classes.formControl}>
        <NativeSelect value={state} onChange={handleChange} style={{ color: color }}>
          {options.map((item: any, index: number) => {
            return (
              <option
                value={item}
                className={classes.selectOption}
                style={{ color: themeCol }}
                key={index}
              >
                {t(item)}
              </option>
            )
          })}
        </NativeSelect>
      </FormControl>
    </div>
  )
}

export default LangDropdown