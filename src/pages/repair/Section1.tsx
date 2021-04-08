import React from "react"
import { Grid, Box, Typography } from "@material-ui/core"
import { Button } from "../../components"
import { Link } from "react-router-dom"
import { inject, observer } from "mobx-react"
import { RepairWidgetStore } from "../../store/RepairWidgetStore"
import { useTranslation } from "react-i18next"
import { storesDetails } from "../../store"
import { isExternal } from "../../services/helper"

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
    const { handleStatus, repairWidgetStore, subDomain } = props
    const data = storesDetails.storeCnts
    const repair = data.repairPage.section1
    const [t] = useTranslation()

    const handleRepairWidget = () => {
      const cntAppointment: any = repairWidgetStore.appointResponse
      repairWidgetStore.init()
      repairWidgetStore.changeAppointResponse(cntAppointment)
      handleStatus(false)
    }

    return (
      <div
        className={subDomain + "-service-section1-special-bg"}
        style={{
          backgroundImage: repair.hasBackground ? "url(" + repair.bgImg + ")" : "",
        }}
      >
        <section className={subDomain + "-Container"}>
          <Grid container className={subDomain + "-service-section1"}>
            <Grid item xs={12} sm={7}>
              <Typography
                className={subDomain + "-service-section-title-1"}
                style={{
                  color: repair.themeCol,
                }}
              >
                {t(repair.title)}
              </Typography>
              <Typography
                className={subDomain + "-service-section-content"}
                style={{ color: repair.themeCol }}
              >
                {t(repair.subtitle)}
              </Typography>
              <div style={{ display: "flex" }}>
                {repair.buttons.map((item: any, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      {item.visible ? (
                        <Box className={subDomain + "-service-section-button"}>
                          {isExternal(item.link) ? (
                            <a
                              href={item.link}
                              style={{ textDecoration: "none" }}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Button
                                title={t(item.title)}
                                bgcolor={data.general.colorPalle.repairButtonCol}
                                borderR="20px"
                                subDomain={subDomain}
                                width="90%"
                              />
                            </a>
                          ) : (
                            <Link
                              to={item.link}
                              style={{ textDecoration: "none" }}
                              onClick={handleRepairWidget}
                            >
                              <Button
                                title={t(item.title)}
                                bgcolor={data.general.colorPalle.repairButtonCol}
                                borderR="20px"
                                subDomain={subDomain}
                                width="90%"
                              />
                            </Link>
                          )}
                        </Box>
                      ) : (
                        <></>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            </Grid>
            <Grid item xs={12} sm={5}>
              <img
                src={storesDetails.commonCnts.repairPhoneImg}
                alt="repair-phone"
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
