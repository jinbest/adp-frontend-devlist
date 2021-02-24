import React from "react"
import { T } from "../i18n/index"
import { LangProps } from "../i18n/en"

type Props = {
  title: LangProps
  content: LangProps
  data: string
  themeCol?: string
  subDomain?: string
}

const ContentFix = ({ title, content, data, themeCol, subDomain }: Props) => {
  return (
    <div className={subDomain + "-content-fix"}>
      <p className={subDomain + "-title"}>
        <T id={title} data={data} />
      </p>
      <hr className={subDomain + "-horzon-line"} style={{ borderColor: themeCol }} />
      <p className={subDomain + "-content"}>
        <T id={content} data={data} />
      </p>
    </div>
  )
}

ContentFix.defaultProps = {
  title: "FREE DIAGNOSTICS",
  content:
    "We believe in a transparent repqir process. If you're not sure what's wrong with your device, we'll diagnose it for free.",
}

export default ContentFix
