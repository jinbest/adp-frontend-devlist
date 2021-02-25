import React, { useState } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Grid, Typography } from "@material-ui/core"
import { useT } from "../../i18n/index"
// import { ToastMsgParams } from "../../components/toast/toast-msg-params"
// import Toast from "../../components/toast/toast"
// import Loading from "../../components/Loading"
import { InputComponent, Button, PhoneInput, CustomSelect } from "../../components"
// import { ContactSubmitParams } from "./model/submit-param"
import { Card } from "../repair/widget-component"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      padding: "50px 30px",
      height: "auto",
      ["@media (max-width:600px)"]: {
        padding: "40px 20px",
      },
    },
    title: {
      fontSize: "25px",
      fontWeight: "bold",
      textAlign: "center",
      paddingBottom: "20px",
      ["@media (max-width:400px)"]: {
        fontSize: "20px",
      },
    },
    messageDiv: {
      border: "1px solid rgba(0, 0, 0, 0.1)",
      borderRadius: "20px",
      width: "100%",
      height: "300px",
      overflow: "hidden",
    },
    textArea: {
      border: "none",
      margin: "20px",
      fontSize: "15px",
      fontFamily: "POPPINS",
      width: "87%",
      outline: "none",
      height: "250px",
      ["@media (max-width:600px)"]: {
        fontSize: "3vw",
      },
    },
    getQuote: {
      width: "170px",
      fontSize: "13px!important" as any,
      [theme.breakpoints.down("sm")]: {
        width: "120px",
        fontSize: "12px!important" as any,
      },
      [theme.breakpoints.down("xs")]: {
        width: "80px",
        fontSize: "10px!important" as any,
      },
    },
  })
)

type Props = {
  subDomain?: string
  locations: any[]
}

const ContactForm = ({ subDomain, locations }: Props) => {
  const mainData = require(`../../assets/${subDomain}/Database`)
  const t = useT()
  const classes = useStyles()

  console.log(locations)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState({ code: "1", name: "" })
  const [message, setMessage] = useState("")
  const [disableStatus, setDisableStatus] = useState(true)

  const handleChangeFirstName = (val: string) => {
    setFirstName(val)
  }

  const handleChangeLastName = (val: string) => {
    setLastName(val)
  }

  const handleChangeEmail = (val: string) => {
    setEmail(val)
  }

  return (
    <section className={subDomain + "-Container"}>
      <div className={classes.root}>
        <Card className={classes.card}>
          <Typography className={classes.title}>{t("CONTACT_US")}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputComponent
                value={firstName}
                placeholder={t("FIRST_NAME")}
                handleChange={(e) => {
                  handleChangeFirstName(e.target.value)
                }}
                subDomain={subDomain}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputComponent
                value={lastName}
                placeholder={t("LAST_NAME")}
                handleChange={(e) => {
                  handleChangeLastName(e.target.value)
                }}
                subDomain={subDomain}
              />
            </Grid>
            <Grid item xs={12}>
              <InputComponent
                value={email}
                placeholder={t("EMAIL_ADDRESS")}
                handleChange={(e) => {
                  handleChangeEmail(e.target.value)
                }}
                subDomain={subDomain}
              />
            </Grid>
            <Grid item xs={12}>
              <PhoneInput handleSetPhone={setPhone} val={phone} placeholder={t("PHONE_NUM")} />
            </Grid>
            <Grid item xs={12}>
              <CustomSelect
                value={location}
                handleSetValue={setLocation}
                subDomain={subDomain}
                options={[
                  { name: "location 1", code: "1" },
                  { name: "location 2", code: "2" },
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.messageDiv}>
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value)
                  }}
                  minLength={5}
                  maxLength={1000}
                  placeholder={"Customer Note*"}
                  className={classes.textArea}
                />
              </div>
            </Grid>
          </Grid>
          <Button
            title={"Submit"}
            bgcolor={mainData.colorPalle.nextButtonCol}
            borderR="20px"
            width="120px"
            height="30px"
            margin="20px 0 0"
            fontSize="17px"
            onClick={() => {
              console.log("submit")
            }}
            disable={disableStatus}
            subDomain={subDomain}
          />
        </Card>
      </div>
    </section>
  )
}

export default ContactForm
