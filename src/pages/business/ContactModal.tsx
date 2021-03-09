import React, { useState, useEffect } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Grid, Typography, IconButton } from "@material-ui/core"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import { useTranslation } from "react-i18next"
import { ToastMsgParams } from "../../components/toast/toast-msg-params"
import Toast from "../../components/toast/toast"
import Loading from "../../components/Loading"
import { InputComponent, Button, PhoneInput, CustomSelect } from "../../components"
import { ContactSubmitParams } from "../../model/contact-submit-param"
import { contactAPI } from "../../services"
import { StoresDetails } from "../../store/StoresDetails"
import { inject } from "mobx-react"
import { observer } from "mobx-react-lite"
import { ValidateEmail } from "../../pages/repair/widget-component/ContactDetails"
import { Close } from "@material-ui/icons"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "none",
      outline: "none",
      borderRadius: "5px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4, 5, 3),
      maxWidth: "900px",
      maxHeight: "90%",
      overflow: "auto !important",
      margin: "5px",
      position: "relative",
      minHeight: "300px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
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
      height: "200px",
      overflow: "hidden",
    },
    textArea: {
      border: "none",
      margin: "20px",
      fontSize: "15px",
      fontFamily: "POPPINS",
      width: "87%",
      outline: "none",
      height: "150px",
      ["@media (max-width:600px)"]: {
        fontSize: "3vw",
      },
    },
  })
)

type OptionProps = {
  name: string
  code: number
}

type Props = {
  openModal: boolean
  handleModal: (val: boolean) => void
  subDomain?: string
  storesDetailsStore: StoresDetails
}

const ContactModal = ({ openModal, handleModal, subDomain, storesDetailsStore }: Props) => {
  const mainData = require(`../../assets/${subDomain}/Database`)
  const [t] = useTranslation()
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
  const [disableStatus, setDisableStatus] = useState(true)
  const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
  const [isSubmit, setIsSubmit] = useState(false)
  const [locations, setLocations] = useState<any[]>([])
  const [contacted, setContacted] = useState(false)

  useEffect(() => {
    setLocations(storesDetailsStore.allLocations)
  }, [])

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
    if (firstName && lastName && email && loc && message) {
      setDisableStatus(false)
    } else {
      setDisableStatus(true)
    }
  }, [firstName, lastName, email, loc, message])

  useEffect(() => {
    if (storesDetailsStore.cntUserLocationSelected && locations.length) {
      for (let i = 0; i < locations.length; i++) {
        if (storesDetailsStore.cntUserLocation[0].location_id === locations[i].id) {
          setLoc({ name: locations[i].address_1, code: i })
        }
      }
      return
    }
  }, [storesDetailsStore.cntUserLocation])

  const handleClose = () => {
    handleModal(false)
  }

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

  const SubmitAvailable = () => {
    if (firstName && lastName && email && ValidateEmail(email) && loc.name && message.length > 5) {
      return true
    }
    if (!firstName) {
      setFnErrTxt(t("Required."))
      setTimeout(() => {
        setFnErrTxt("")
      }, 3000)
    }
    if (!lastName) {
      setLnErrTxt(t("Required."))
      setTimeout(() => {
        setLnErrTxt("")
      }, 3000)
    }
    if (!email) {
      setEmlErrTxt(t("Required."))
      setTimeout(() => {
        setEmlErrTxt("")
      }, 3000)
    } else if (!ValidateEmail(email)) {
      setEmlErrTxt(t("Enter a valid email."))
      setTimeout(() => {
        setEmlErrTxt("")
      }, 3000)
    }
    if (!message) {
      setMsgErrTxt(t("Required."))
      setTimeout(() => {
        setMsgErrTxt("")
      }, 3000)
    } else if (message.length <= 5) {
      setMsgErrTxt(t("Text is too less."))
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
          msg: t("Something went wrong, please try again or contact us."),
          isError: true,
        })
        setDisableStatus(false)
        setIsSubmit(false)
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
    <div>
      <Modal
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          {!contacted ? (
            <div className={classes.paper}>
              <Typography className={classes.title}>{t("Contact Us")}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputComponent
                    value={firstName}
                    placeholder={t("First Name*")}
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
                    placeholder={t("Last Name*")}
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
                    placeholder={t("Company Name")}
                    handleChange={(e) => {
                      handleChangeCompanyName(e.target.value)
                    }}
                    subDomain={subDomain}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputComponent
                    value={email}
                    placeholder={t("E-mail Address*")}
                    handleChange={(e) => {
                      handleChangeEmail(e.target.value)
                    }}
                    subDomain={subDomain}
                    errorText={emlErrTxt}
                    border="rgba(0,0,0,0.1)"
                  />
                </Grid>
                <Grid item xs={12}>
                  <PhoneInput
                    handleSetPhone={setPhone}
                    val={phone}
                    placeholder={t("Phone Number")}
                  />
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
                      placeholder={`${t("Message")}*`}
                      className={classes.textArea}
                    />
                  </div>
                  {msgErrTxt && (
                    <span style={{ color: "red", fontSize: "13px", marginLeft: "30px" }}>
                      {msgErrTxt}
                    </span>
                  )}
                </Grid>
              </Grid>
              <div style={{ display: "flex" }}>
                <Button
                  title={t("Submit")}
                  bgcolor={mainData.colorPalle.repairButtonCol}
                  borderR="20px"
                  width="120px"
                  height="30px"
                  margin="20px 0 0 auto"
                  fontSize="17px"
                  onClick={handleSubmit}
                  disable={disableStatus}
                  subDomain={subDomain}
                >
                  {isSubmit && <Loading />}
                </Button>
                <Button
                  title={t("Close")}
                  bgcolor={mainData.colorPalle.repairButtonCol}
                  borderR="20px"
                  width="120px"
                  height="30px"
                  margin="20px 10px 0"
                  fontSize="17px"
                  onClick={handleClose}
                  subDomain={subDomain}
                />
              </div>
            </div>
          ) : (
            <div className={classes.paper}>
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
                {`${t("Thank you for choosing")} ${storesDetailsStore.storesDetails.name}`}
              </Typography>
              <Typography className={classes.content}>
                {t("A representative will contact you shortly in regards to your request.")}
              </Typography>
            </div>
          )}
        </Fade>
      </Modal>
      <Toast params={toastParams} resetStatuses={resetStatuses} />
    </div>
  )
}

export default inject("storesDetailsStore")(observer(ContactModal))
