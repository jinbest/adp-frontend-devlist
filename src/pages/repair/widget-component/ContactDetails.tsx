import React, { useState, useEffect, useCallback } from "react"
import { Grid, Typography } from "@material-ui/core"
import { Card } from "./"
import { InputComponent, Button, PhoneInput, CustomSelect } from "../../../components"
import RepairSummary from "./RepairSummary"
import { useT } from "../../../i18n/index"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import { repairWidgetStore, storesDetails } from "../../../store"
import { repairWidgetAPI } from "../../../services"
import { PostAppointParams } from "../model/post-appointment-params"
import {
  countriesData,
  // statesData
} from "../../../const"
import { findLocationAPI } from "../../../services"
import { makeLocations } from "../../../components/CustomizedMenus"
import { ToastMsgParams } from "../../../components/toast/toast-msg-params"
import Toast from "../../../components/toast/toast"
import moment from "moment"
import Loading from "../../../components/Loading"

type Props = {
  data: any
  subDomain?: string
  step: number
  handleStep: (step: number) => void
  handleChangeChooseData: (step: number, chooseData: any) => void
  repairWidgetData: any
  code: string
  features: any[]
}

const ContactDetails = ({
  data,
  subDomain,
  step,
  handleStep,
  handleChangeChooseData,
  features,
  code,
}: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database.js`)
  const mockData = require(`../../../assets/${subDomain}/mock-data/mockData.js`)
  const themeCol = mainData.colorPalle.themeColor
  const publicText = mockData.repairWidget.publicText

  const t = useT()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address1, setStreetAddress1] = useState("")
  const [address2, setStreetAddress2] = useState("")
  const [country, setCountry] = useState({ code: "CA", name: "" })
  const [city, setCity] = useState("")
  // const [province, setProvince] = useState({ code: "MB", name: "" })
  const [postalCode, setPostalCode] = useState("")
  const [disableStatus, setDisableStatus] = useState(true)
  const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
  const [isSubmiting, setIsSubmiting] = useState<boolean[]>([false, false])

  const handleSubmit = (param: string) => {
    setDisableStatus(true)
    if (param === "appointment") {
      setIsSubmiting([true, false])
    } else {
      setIsSubmiting([false, true])
    }
    if (param !== "appointment") {
      const repairs: any[] = []
      for (let i = 0; i < repairWidgetStore.deviceCounter; i++) {
        for (let j = 0; j < repairWidgetStore.chooseRepair[i].length; j++) {
          repairs.push({
            repair_id: repairWidgetStore.chooseRepair[i][j].id,
            product_id: repairWidgetStore.deviceModel[i].id,
            cost: repairWidgetStore.chooseRepair[i][j].cost,
            duration: repairWidgetStore.chooseRepair[i][j].estimate,
            product_name:
              repairWidgetStore.deviceBrand[i].name + " " + repairWidgetStore.deviceModel[i].name,
            repair_name: repairWidgetStore.chooseRepair[i][j].name,
          })
        }
      }
      const params = {} as PostAppointParams
      params.store_id = storesDetails.store_id
      params.location_id = storesDetails.location_id
      params.customer_id = 1
      params.type = "QUOTE"
      params.is_voided = storesDetails.is_voided
      params.delivery_method = repairWidgetStore.deliveryMethod.code
      params.customer_email = email
      params.customer_first_name = firstName
      params.customer_last_name = lastName
      params.customer_phone = phone
      params.customer_address_1 = address1
      params.customer_address_2 = address2
      params.customer_city = city
      // params.customer_state = province.code
      params.customer_postcode = postalCode
      params.customer_country = country.code
      params.customer_note = null
      params.customer_contact_method = repairWidgetStore.receiveQuote.code
      params.repairs = repairs
      params.selected_date = repairWidgetStore.repairWidgetInitialValue.selectDate
      params.selected_start_time = repairWidgetStore.repairWidgetInitialValue.selected_start_time
      params.selected_end_time = repairWidgetStore.repairWidgetInitialValue.selected_end_time
      params.booking_date = moment().format("YYYY-MM-DD")

      repairWidgetAPI
        .postAppointmentQuote(params)
        .then((res: any) => {
          handleChangeChooseData(6, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address1: { name: address1, code: "" },
            address2: { name: address2, code: "" },
            country: country,
            city: city,
            // province: province,
            postalCode: postalCode,
          })
          repairWidgetStore.changeAppointResponse(res.data)
          handleStep(11)
        })
        .catch((error) => {
          setToastParams({
            msg: "Something went wrong, please try again or contact us.",
            isError: true,
          })
          setDisableStatus(false)
          setIsSubmiting([false, false])
          console.log("Something went wrong, please try again or contact us.", error)
        })
    } else {
      handleChangeChooseData(6, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address1: { name: address1, code: "" },
        address2: { name: address2, code: "" },
        country: country,
        city: city,
        // province: province,
        postalCode: postalCode,
      })
      handleStep(step + 1)
    }
  }

  const handleButton = (param: string) => {
    setDisableStatus(true)
    if (param === "appointment") {
      setIsSubmiting([true, false])
    } else {
      setIsSubmiting([false, true])
    }
    if (storesDetails.location_id < 0) {
      findLocationAPI
        .findAddLocation(storesDetails.store_id, {
          city: city,
          state: "", // province.code,
          postcode: postalCode,
          country: country.code,
        })
        .then((res: any) => {
          if (res.data.length && res.data[0].location_hours.length) {
            storesDetails.changeFindAddLocation(res.data)
            storesDetails.changeLocationID(res.data[0].id)
            storesDetails.changeCntUserLocation(makeLocations(res.data))
            handleSubmit(param)
          } else {
            setToastParams({
              msg: "There is not available locations. Please input another Postal Code.",
              isWarning: true,
            })
            setDisableStatus(false)
            setIsSubmiting([false, false])
          }
        })
        .catch((error) => {
          console.log("Error to find location with Postal Code", error)
          setToastParams({
            msg: "Error to find location with Postal Code. Please input right Postal Code.",
            isError: true,
          })
          setDisableStatus(false)
          setIsSubmiting([false, false])
        })
      return
    } else {
      handleSubmit(param)
    }
  }

  const onKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter" && !disableStatus && step === 6) {
        if (features.includes("FRONTEND_REPAIR_APPOINTMENT") || code === "MAIL_IN") {
          handleButton("appointment")
        } else if (features.includes("FRONTEND_REPAIR_QUOTE")) {
          handleButton("quote")
        }
      }
    },
    [
      step,
      firstName,
      lastName,
      email,
      phone,
      address1,
      address2,
      country,
      city,
      // province,
      postalCode,
      disableStatus,
    ]
  )

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress, false)
    return () => {
      document.removeEventListener("keydown", onKeyPress, false)
    }
  }, [
    step,
    firstName,
    lastName,
    email,
    phone,
    address1,
    address2,
    country,
    city,
    // province,
    postalCode,
    disableStatus,
  ])

  useEffect(() => {
    setDisableStatus(true)
    if (
      firstName &&
      lastName &&
      email &&
      ((storesDetails.location_id < 0 && postalCode) || storesDetails.location_id > 0) &&
      ((code === "MAIL_IN" && address1) ||
        (code === "ONSITE" && address1) ||
        (code === "PICK_UP" && address1) ||
        (code !== "MAIL_IN" && code !== "ONSITE" && code !== "PICK_UP"))
    ) {
      setDisableStatus(false)
    }
  }, [firstName, lastName, email, address1, code, postalCode, storesDetails])

  const handleChangeFirstName = (val: string) => {
    setFirstName(val)
  }

  const handleChangeLastName = (val: string) => {
    setLastName(val)
  }

  const handleChangeEmail = (val: string) => {
    setEmail(val)
  }

  const handleChangeAddress1 = (val: string) => {
    setStreetAddress1(val)
  }

  const handleChangeAddress2 = (val: string) => {
    setStreetAddress2(val)
  }

  const handleChangeCity = (val: string) => {
    setCity(val)
  }

  const handleChangePostalCode = (val: string) => {
    setPostalCode(val)
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
      <Grid container className="" spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography className={subDomain + "-service-widget-title"}>{t(data.title)}</Typography>
        </Grid>
      </Grid>
      <Grid container className="" spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <div className={subDomain + "-service-choose-device-container"}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputComponent
                    value={firstName}
                    placeholder={t(data.placeholder.firstName)}
                    handleChange={(e) => {
                      handleChangeFirstName(e.target.value)
                    }}
                    subDomain={subDomain}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputComponent
                    value={lastName}
                    placeholder={t(data.placeholder.lastName)}
                    handleChange={(e) => {
                      handleChangeLastName(e.target.value)
                    }}
                    subDomain={subDomain}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputComponent
                    value={email}
                    placeholder={t(data.placeholder.emailAdd)}
                    handleChange={(e) => {
                      handleChangeEmail(e.target.value)
                    }}
                    subDomain={subDomain}
                  />
                </Grid>
                <Grid
                  item
                  xs={
                    storesDetails.location_id < 0 &&
                    code !== "MAIL_IN" &&
                    code !== "ONSITE" &&
                    code !== "PICK_UP"
                      ? 6
                      : 12
                  }
                >
                  <PhoneInput
                    handleSetPhone={setPhone}
                    val={phone}
                    placeholder={t(data.placeholder.phoneNum)}
                  />
                </Grid>
                {storesDetails.location_id < 0 &&
                  code !== "MAIL_IN" &&
                  code !== "ONSITE" &&
                  code !== "PICK_UP" && (
                    <Grid item xs={6}>
                      <InputComponent
                        value={postalCode}
                        placeholder={t(data.placeholder.postalCode)}
                        handleChange={(e) => {
                          handleChangePostalCode(e.target.value)
                        }}
                        subDomain={subDomain}
                      />
                    </Grid>
                  )}
              </Grid>
            </div>
            {(code === "MAIL_IN" || code === "ONSITE" || code === "PICK_UP") && (
              <div className={subDomain + "-service-choose-device-container"}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputComponent
                      value={address1}
                      placeholder={t(data.placeholder.address1)}
                      handleChange={(e) => {
                        handleChangeAddress1(e.target.value)
                      }}
                      subDomain={subDomain}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputComponent
                      value={address2}
                      placeholder={t(data.placeholder.address2)}
                      handleChange={(e) => {
                        handleChangeAddress2(e.target.value)
                      }}
                      subDomain={subDomain}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <CustomSelect
                      value={country}
                      handleSetValue={setCountry}
                      subDomain={subDomain}
                      options={countriesData}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputComponent
                      value={city}
                      placeholder={t(data.placeholder.city)}
                      handleChange={(e) => {
                        handleChangeCity(e.target.value)
                      }}
                      subDomain={subDomain}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputComponent
                      value={postalCode}
                      placeholder={t(data.placeholder.postalCode)}
                      handleChange={(e) => {
                        handleChangePostalCode(e.target.value)
                      }}
                      subDomain={subDomain}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={4}>
                    <CustomSelect
                      value={province}
                      handleSetValue={setProvince}
                      subDomain={subDomain}
                      options={country.code ? statesData[country.code] : []}
                    />
                  </Grid> */}
                </Grid>
              </div>
            )}
            {code !== "MAIL_IN" && code !== "ONSITE" && code !== "PICK_UP" && (
              <div className={subDomain + "-service-choose-device-container"}>
                <FeatureToggles features={features}>
                  <Feature
                    name="FRONTEND_REPAIR_APPOINTMENT"
                    inactiveComponent={() => <></>}
                    activeComponent={() => (
                      <Button
                        title={t("BOOK_APPOINTMENT")}
                        bgcolor={mainData.colorPalle.nextButtonCol}
                        borderR="20px"
                        maxWidth="300px"
                        height="30px"
                        fontSize="17px"
                        margin="0 auto 10px"
                        onClick={() => handleButton("appointment")}
                        disable={disableStatus}
                        subDomain={subDomain}
                      >
                        {isSubmiting[0] && <Loading />}
                      </Button>
                    )}
                  />
                </FeatureToggles>
                <FeatureToggles features={features}>
                  <Feature
                    name="FRONTEND_REPAIR_QUOTE"
                    inactiveComponent={() => <></>}
                    activeComponent={() => (
                      <Button
                        title={t("REQUEST_A_QUOTE")}
                        bgcolor={mainData.colorPalle.nextButtonCol}
                        borderR="20px"
                        maxWidth="300px"
                        height="30px"
                        fontSize="17px"
                        margin="0 auto"
                        onClick={() => handleButton("quote")}
                        disable={disableStatus}
                        subDomain={subDomain}
                      >
                        {isSubmiting[1] && <Loading />}
                      </Button>
                    )}
                  />
                </FeatureToggles>
              </div>
            )}
            {(code === "MAIL_IN" || code === "ONSITE" || code === "PICK_UP") && (
              <div className={subDomain + "-service-card-button"}>
                <Button
                  title={t(publicText.next)}
                  bgcolor={mainData.colorPalle.nextButtonCol}
                  borderR="20px"
                  width="120px"
                  height="30px"
                  fontSize="17px"
                  onClick={() => handleButton("appointment")}
                  disable={disableStatus}
                  subDomain={subDomain}
                />
                <p>{t(publicText.enterKey)}</p>
              </div>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card className={subDomain + "-service-summary-card"}>
            <RepairSummary step={step} subDomain={subDomain} themeCol={themeCol} />
          </Card>
        </Grid>
      </Grid>
      <Toast params={toastParams} resetStatuses={resetStatuses} />
    </div>
  )
}

export default ContactDetails
