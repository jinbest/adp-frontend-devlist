import React from "react"
import { Typography } from "@material-ui/core"
import { Card } from "."
import { useT, T } from "../../../i18n/index"
import { storesDetails } from "../../../store"

type Props = {
  data: any
  subDomain?: string
  quoteKey: number
  repairWidgetData: any
}

const QuoteComponent = ({ data, quoteKey, repairWidgetData }: Props) => {
  const storeName = storesDetails.storesDetails.name

  const t = useT()

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card className="repair-service-summary-card">
        <div className="quote-container">
          <div className="quote-image">
            <img src={data[quoteKey].img} alt="quote-img" />
          </div>
          <Typography className="repair-service-summary-title">
            <T id={data[quoteKey].title} data={{ storeName: storeName }} />
          </Typography>
          <Typography className="quote-component-content">
            {t("YOU_WILL_RECEIVE_AN")} <b>{t("EMAIL").toLocaleLowerCase()}</b> {t("AT")}{" "}
            <b>{repairWidgetData.contactDetails.email}</b> {t("SHORTLY")}, {t(data[quoteKey].text)}
          </Typography>
        </div>
      </Card>
    </div>
  )
}

export default QuoteComponent
