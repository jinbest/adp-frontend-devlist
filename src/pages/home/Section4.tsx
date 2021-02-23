import React from "react"
import { DeviceListComponent } from "../../components"
// import {Button} from '../../components'
import { Typography, Grid, Box } from "@material-ui/core"
import { useT, T } from "../../i18n/index"
import { storesDetails } from "../../store"

type Props = {
  subDomain?: string
}

const Section4 = ({ subDomain }: Props) => {
  const data = require(`../../assets/${subDomain}/Database`)
  const t = useT()

  return (
    <div className={subDomain + "-sec4-background"}>
      <section className={subDomain + "-Container"}>
        <Box className={subDomain + "-sec4-container-box"}>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                className={"f40 bold " + subDomain + "-section4-title"}
                style={{ color: "black", textShadow: "1px 0 black" }}
              >
                <T id={data.homeTextData.section4.title} data={storesDetails.storesDetails.name} />
              </Typography>
              {/* <Box className={subDomain + '-section4-button mobile'}>
                <Button 
                  title={t(data.homeTextData.section4.btnTitle)} 
                  bgcolor={data.colorPalle.themeColor} 
                  borderR='20px'
                  subDomain={subDomain}
                />
              </Box> */}
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Grid item container xs={12}>
                {data.devicelistData.slice(0, 2).map((item: any, index: number) => {
                  return (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box className={subDomain + "-cart-device-list"}>
                        <DeviceListComponent
                          img={item.img}
                          title={t(item.title)}
                          content={t(item.content)}
                          key={index}
                          subDomain={subDomain}
                        />
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
            {/* <Grid item xs={12}>
              <Box className={subDomain + '-section4-button desktop'}>
                <Button title={t(data.homeTextData.section4.btnTitle)} bgcolor={data.colorPalle.themeColor} borderR='20px' subDomain={subDomain} />
              </Box>
            </Grid> */}
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={12} md={3}></Grid>
            <Grid item xs={12} sm={12} md={9}>
              <Grid item container xs={12}>
                {data.devicelistData.slice(2, 5).map((item: any, index: number) => {
                  return (
                    <Grid item xs={12} sm={4} key={index}>
                      <Box className={subDomain + "-cart-device-list"}>
                        <DeviceListComponent
                          img={item.img}
                          title={t(item.title)}
                          content={t(item.content)}
                          key={index}
                          subDomain={subDomain}
                        />
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box className={subDomain + "-sec4-container-special-box"}>
          <Grid container item xs={12}>
            <Typography className={"f40 bold " + subDomain + "-section-title"}>
              <T id={data.homeTextData.section4.title} data={storesDetails.storesDetails.name} />
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <div style={{ display: "flex", margin: "auto" }}>
              {data.devicelistData.map((item: any, index: number) => {
                return (
                  <Box className={subDomain + "-cart-device-list"} key={index}>
                    <DeviceListComponent
                      img={item.img}
                      title={t(item.title)}
                      content={t(item.content)}
                      key={index}
                      subDomain={subDomain}
                    />
                  </Box>
                )
              })}
            </div>
          </Grid>
        </Box>
      </section>
    </div>
  )
}

export default Section4
