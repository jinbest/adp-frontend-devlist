import React from "react"
import { Grid, Box, Typography } from "@material-ui/core"
import { Button } from "../../components"
import { Link } from "react-router-dom"
import { inject, observer } from "mobx-react"
import { RepairWidgetStore } from "../../store/RepairWidgetStore"
import { useTranslation } from "react-i18next"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"

type StoreProps = {
  repairWidgetStore: RepairWidgetStore
}
interface Props extends StoreProps {
  subDomain: string
  handleStatus: (status: boolean) => void
  features: any[]
}

const Section1 = inject("repairWidgetStore")(
  observer((props: Props) => {
    const { handleStatus, repairWidgetStore, subDomain, features } = props
    const data = require(`../../assets/${subDomain}/Database`)
    const repair = data.repairData.section1
    const [t] = useTranslation()

    const handleRepairWidget = () => {
      const cntAppointment: any = repairWidgetStore.appointResponse
      repairWidgetStore.init()
      repairWidgetStore.changeAppointResponse(cntAppointment)
      handleStatus(false)
    }

    return (
      <div className={subDomain + "-service-section1-special-bg"}>
        <section className={subDomain + "-Container"}>
          <Grid container className={subDomain + "-service-section1"}>
            <Grid item xs={12} sm={7}>
              <Typography
                className={subDomain + "-service-section-title-1"}
                style={{
                  color: repair.themeCol,
                  textShadow: `1px 0 ${repair.themeCol}`,
                }}
              >
                {t(repair.title)}
              </Typography>
              <Typography
                className={subDomain + "-service-section-content"}
                style={{ color: repair.themeCol }}
              >
                {t(repair.content)}
              </Typography>
              <div style={{ display: "flex" }}>
                <Box className={subDomain + "-service-section-button"}>
                  <Link
                    to="/get-quote"
                    style={{ textDecoration: "none" }}
                    onClick={handleRepairWidget}
                  >
                    <Button
                      title={t("Get Quote")}
                      bgcolor={data.colorPalle.repairButtonCol}
                      borderR="20px"
                      subDomain={subDomain}
                      width="90%"
                    />
                  </Link>
                </Box>
                <FeatureToggles features={features}>
                  <Feature
                    name={"FRONTEND_REPAIR_APPOINTMENT"}
                    inactiveComponent={() => <></>}
                    activeComponent={() => (
                      <Box className={subDomain + "-service-section-button"}>
                        <Link
                          to="/get-quote"
                          style={{ textDecoration: "none" }}
                          onClick={handleRepairWidget}
                        >
                          <Button
                            title={t("Book Appointment")}
                            bgcolor={data.colorPalle.repairButtonCol}
                            borderR="20px"
                            subDomain={subDomain}
                            width="90%"
                          />
                        </Link>
                      </Box>
                    )}
                  />
                </FeatureToggles>
              </div>
            </Grid>
            <Grid item xs={12} sm={5}>
              <img
                src={require("../../assets/_common/img/repair/repair-phone.png").default}
                style={{ width: "100%", marginTop: "-80px" }}
              />
            </Grid>
          </Grid>
        </section>
      </div>
    )
  })
)

export default Section1
