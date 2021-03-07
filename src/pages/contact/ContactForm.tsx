import React, { useState, useEffect } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Grid, Typography, IconButton } from "@material-ui/core"
import { useT, T } from "../../i18n/index"
import { ToastMsgParams } from "../../components/toast/toast-msg-params"
import Toast from "../../components/toast/toast"
import Loading from "../../components/Loading"
import { InputComponent, Button, PhoneInput, CustomSelect } from "../../components"
import { ContactSubmitParams } from "../../model/contact-submit-param"
import { Card } from "../repair/widget-component"
import { contactAPI } from "../../services"
import { StoresDetails } from "../../store/StoresDetails"
import { makeLocations } from "../../components/CustomizedMenus"
import { ValidateEmail } from "../../pages/repair/widget-component/ContactDetails"
import { Close } from "@material-ui/icons"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      ["@media (max-width:425px)"]: {
        marginBottom: "100px",
      },
    },
    card: {
      padding: "50px 30px",
      height: "auto",
      minHeight: "300px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      ["@media (max-width:600px)"]: {
        padding: "40px 20px",
      },
    },
    closeButtonDiv: {
      position: "absolute",
      right: "15px",
      top: "15px",
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
    content: {
      fontSize: "18px",
      textAlign: "center",
      marginTop: "20px",
      ["@media (max-width:400px)"]: {
        fontSize: "15px",
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

type OptionProps = {
  name: string
  code: number
}

type Props = {
  subDomain?: string
  locations: any[]
  locationID: string | null
  handleLocationID: (id: string | null) => void
  storesDetailsStore: StoresDetails
}

const ContactForm = ({
  subDomain,
  locations,
  locationID,
  handleLocationID,
  storesDetailsStore,
}: Props) => {
  const mainData = require(`../../assets/${subDomain}/Database`)
  const t = useT()
  const classes = useStyles()

  const [firstName, setFirstName] = useState("")
  const [fnErrTxt, setFnErrTxt] = useState("")
  const [lastName, setLastName] = useState("")
  const [lnErrTxt, setLnErrTxt] = useState("")
  const [email, setEmail] = useState("")
  const [emlErrTxt, setEmlErrTxt] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [phone, setPhone] = useState("")
  const [option, setOption] = useState<OptionProps[]>([])
  const [loc, setLoc] = useState<OptionProps>({ name: "", code: 0 })
  const [message, setMessage] = useState("")
  const [msgErrTxt, setMsgErrTxt] = useState("")
  const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
  const [isSubmit, setIsSubmit] = useState(false)
  const [disableStatus, setDisableStatus] = useState(true)
  const [contacted, setContacted] = useState(false)

  const handleChangeFirstName = (val: string) => {
    setFirstName(val)
  }

  const handleChangeLastName = (val: string) => {
    setLastName(val)
  }

  const handleChangeEmail = (val: string) => {
    setEmail(val)
  }

  const handleChangeCompanyName = (val: string) => {
    setCompanyName(val)
  }

  const handleStoreCntLoc = (index: number) => {
    if (!locations.length) return
    storesDetailsStore.changeCntUserLocation(makeLocations([locations[index]]))
    storesDetailsStore.changeLocationID(locations[index].id)
  }

  useEffect(() => {
    if (locations.length) {
      handleLocationID(locations[loc.code].id)
      if (storesDetailsStore.cntUserLocationSelected) {
        handleStoreCntLoc(loc.code)
      }
    }
  }, [loc, storesDetailsStore])

  useEffect(() => {
    if (locations.length) {
      for (let i = 0; i < locations.length; i++) {
        if (locationID && parseInt(locationID) === locations[i].id) {
          setLoc({ name: locations[i].address_1, code: i })
          break
        }
        if (!locationID && locations[i].is_main) {
          setLoc({ name: locations[i].address_1, code: i })
          break
        }
      }
    }
  }, [locationID, locations, storesDetailsStore])

  useEffect(() => {
    const cntOptions: OptionProps[] = []
    if (locations.length) {
      for (let i = 0; i < locations.length; i++) {
        cntOptions.push({ name: locations[i].address_1, code: i })
      }
      setOption(cntOptions)
    }
  }, [locations])

  useEffect(() => {
    if (firstName && lastName && email && loc.name && message) {
      setDisableStatus(false)
    } else {
      setDisableStatus(true)
    }
  }, [firstName, lastName, email, loc, message])

  const SubmitAvailable = () => {
    if (firstName && lastName && email && ValidateEmail(email) && loc.name && message.length > 5) {
      return true
    }
    if (!firstName) {
      setFnErrTxt("Required.")
      setTimeout(() => {
        setFnErrTxt("")
      }, 3000)
    }
    if (!lastName) {
      setLnErrTxt("Required.")
      setTimeout(() => {
        setLnErrTxt("")
      }, 3000)
    }
    if (!email) {
      setEmlErrTxt("Required.")
      setTimeout(() => {
        setEmlErrTxt("")
      }, 3000)
    } else if (!ValidateEmail(email)) {
      setEmlErrTxt("Enter a valid email.")
      setTimeout(() => {
        setEmlErrTxt("")
      }, 3000)
    }
    if (!message) {
      setMsgErrTxt("Required.")
      setTimeout(() => {
        setMsgErrTxt("")
      }, 3000)
    } else if (message.length <= 5) {
      setMsgErrTxt("Text is too less.")
      setTimeout(() => {
        setMsgErrTxt("")
      }, 3000)
    }
    return false
  }

  const handleSubmit = () => {
    if (!SubmitAvailable()) {
      return
    }
    setDisableStatus(true)
    setIsSubmit(true)

    const params = {} as ContactSubmitParams
    params.store_id = locations[loc.code].store_id
    params.location_id = locations[loc.code].id
    params.customer_first_name = firstName
    params.customer_last_name = lastName
    params.customer_email = email
    params.customer_phone = phone
    params.customer_note = message
    params.is_read = false
    params.company_name = companyName

    contactAPI
      .postContactForm(params)
      .then(() => {
        // setToastParams({
        //   msg: "Request Sent Successfully",
        //   isSuccess: true,
        // })
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhone("")
        setLoc({ name: "", code: 0 })
        setMessage("")
        setIsSubmit(false)
        setCompanyName("")
        setContacted(true)
      })
      .catch(() => {
        setToastParams({
          msg: "Something went wrong, please try again or contact us.",
          isError: true,
        })
        setIsSubmit(false)
        setDisableStatus(false)
      })
  }

  const resetStatuses = () => {
    setToastParams({
      msg: "",
      isError: false,
      isWarning: false,
      isInfo: false,
      isSuccess: false,
    })
  }

  return (
    <section className={subDomain + "-Container"}>
      <div className={classes.root}>
        {!contacted ? (
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
                  errorText={fnErrTxt}
                  border="rgba(0,0,0,0.1)"
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
                  errorText={lnErrTxt}
                  border="rgba(0,0,0,0.1)"
                />
              </Grid>
              <Grid item xs={12}>
                <InputComponent
                  value={companyName}
                  placeholder={t("COMPANY_NAME")}
                  handleChange={(e) => {
                    handleChangeCompanyName(e.target.value)
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
                  errorText={emlErrTxt}
                  border="rgba(0,0,0,0.1)"
                />
              </Grid>
              <Grid item xs={12}>
                <PhoneInput handleSetPhone={setPhone} val={phone} placeholder={t("PHONE_NUM")} />
              </Grid>
              <Grid item xs={12}>
                <CustomSelect
                  value={loc}
                  handleSetValue={setLoc}
                  subDomain={subDomain}
                  options={option}
                />
              </Grid>
              <Grid item xs={12}>
                <div
                  className={classes.messageDiv}
                  style={{ border: msgErrTxt ? "1px solid red" : "1px solid rgba(0,0,0,0.1)" }}
                >
                  <textarea
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value)
                    }}
                    minLength={5}
                    maxLength={1000}
                    placeholder={`${t("MESSAGE")}*`}
                    className={classes.textArea}
                  />
                </div>
                {msgErrTxt && (
                  <span style={{ color: "red", fontSize: "13px", marginLeft: "20px" }}>
                    {msgErrTxt}
                  </span>
                )}
              </Grid>
            </Grid>
            <Button
              title={t("SUBMIT")}
              bgcolor={mainData.colorPalle.nextButtonCol}
              borderR="20px"
              width="120px"
              height="30px"
              margin="20px 0 0"
              fontSize="17px"
              onClick={handleSubmit}
              subDomain={subDomain}
              disable={disableStatus}
            >
              {isSubmit && <Loading />}
            </Button>
          </Card>
        ) : (
          <Card className={classes.card}>
            <IconButton
              aria-label="close"
              className={classes.closeButtonDiv}
              onClick={() => {
                setContacted(false)
              }}
            >
              <Close />
            </IconButton>
            <Typography className={classes.title}>
              <T
                id="THANK_YOU_FOR_CHOOSING_DEVICELIST_FOR_YOUR_REPAIR"
                data={{ storeName: storesDetailsStore.storesDetails.name }}
              />
            </Typography>
            <Typography className={classes.content}>
              {t("A_REPRESENTATIVE_WILL_CONTACT_YOU")}
            </Typography>
          </Card>
        )}
        <Toast params={toastParams} resetStatuses={resetStatuses} />
      </div>
    </section>
  )
}

export default ContactForm
