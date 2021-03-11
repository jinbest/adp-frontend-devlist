import React, { useState, useEffect, useCallback } from "react"
import { Grid, Typography } from "@material-ui/core"
import { Card } from "./"
import { Button, CustomCalendar, CustomSelect } from "../../../components"
import CustomBookTime from "./CustomBookTime"
import RepairSummary from "./RepairSummary"
import { useTranslation } from "react-i18next"
import { repairWidgetStore, storesDetails } from "../../../store"
import { makeLocations } from "../../../services/helper"
import { inject } from "mobx-react"
import { observer } from "mobx-react-lite"
import { StoresDetails } from "../../../store/StoresDetails"
import { getHourType } from "../../../services/helper"

const DAYS_OF_THE_WEEK: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const MONTHS: string[] = [
  "January",
  "Febrary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octorber",
  "November",
  "December",
]

type FindLocProps = {
  code: string
  name: string
}

type SelectHoursProps = {
  day: string
  hour: string
}

type Props = {
  data: any
  subDomain?: string
  step: number
  handleStep: (step: number) => void
  code: string
  handleChangeChooseData: (step: number, chooseData: any) => void
  repairWidgetData: any
  storesDetailsStore: StoresDetails
}

const BookTime = ({ data, subDomain, step, code, handleStep, handleChangeChooseData }: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database`)
  const themeCol = mainData.colorPalle.themeColor
  const repairBooktimeCol = mainData.colorPalle.repairBooktimeCol
  const brandThemeCol = mainData.brandItemsData.brandThemeCol

  const today = new Date()
  const [date, setDate] = useState(today)
  const [day, setDay] = useState(date.getDate())
  const [month, setMonth] = useState(date.getMonth())
  const [year, setYear] = useState(date.getFullYear())
  const [week, setWeek] = useState(date.getDay())
  const [time, setTime] = useState("")
  const [selectVal, setSelectVal] = useState({
    code: storesDetails.cntUserLocation.length ? storesDetails.cntUserLocation[0].location_id : -1,
    name: storesDetails.cntUserLocation.length
      ? storesDetails.cntUserLocation[0].address_1 +
        (storesDetails.cntUserLocation[0].address_2
          ? ", " + storesDetails.cntUserLocation[0].address_2
          : "")
      : "",
  })
  const [sendToAddress, setSendToAddress] = useState<string | undefined>("")
  const [mailInChecked, setMailinChecked] = useState(0)
  const [disableStatus, setDisableStatus] = useState(true)
  const [hoursRange, setHoursRange] = useState<any[]>([])

  const [t] = useTranslation()

  const [findLocs, setFindLocs] = useState<FindLocProps[]>([])
  const [selHours, setSelHours] = useState<SelectHoursProps[]>([])

  useEffect(() => {
    const cntFindLoc: FindLocProps[] = []
    const storeLocs: any[] = storesDetails.findAddLocation
    for (let i = 0; i < storeLocs.length; i++) {
      cntFindLoc.push({
        code: storeLocs[i].id,
        name:
          storeLocs[i].address_1 + (storeLocs[i].address_2 ? ", " + storeLocs[i].address_2 : ""),
      })
    }
    setFindLocs(cntFindLoc)
  }, [storesDetails])

  useEffect(() => {
    const cntSelHours: SelectHoursProps[] = []
    const storeLocs: any[] = storesDetails.findAddLocation
    const i: number = mailInChecked
    if (storeLocs.length) {
      for (let j = 0; j < storeLocs[i].location_hours.length; j++) {
        if (storeLocs[i].location_hours[j].type === "REGULAR") {
          let hour = ""
          if (!storeLocs[i].location_hours[j].open || !storeLocs[i].location_hours[j].close) {
            hour = "Closed"
          } else {
            const open = getHourType(storeLocs[i].location_hours[j].open, storeLocs[i].timezone),
              close = getHourType(storeLocs[i].location_hours[j].close, storeLocs[i].timezone)
            hour = open + " - " + close
          }
          cntSelHours.push({
            day: DAYS_OF_THE_WEEK[storeLocs[i].location_hours[j].day],
            hour: hour,
          })
        }
      }
    }
    setSelHours(cntSelHours)
  }, [mailInChecked, storesDetails])

  useEffect(() => {
    setDay(date.getDate())
    setMonth(date.getMonth())
    setYear(date.getFullYear())
    setWeek(date.getDay())
    setTime("")
  }, [date])

  useEffect(() => {
    if (code === "MAIL_IN" && storesDetails.cntUserLocation.length) {
      setSendToAddress(
        storesDetails.cntUserLocation[0].address_1 +
          (storesDetails.cntUserLocation[0].address_2
            ? ", " + storesDetails.cntUserLocation[0].address_2
            : "")
      )
      for (let i = 0; i < findLocs.length; i++) {
        if (
          findLocs[i].name ===
          storesDetails.cntUserLocation[0].address_1 +
            (storesDetails.cntUserLocation[0].address_2
              ? ", " + storesDetails.cntUserLocation[0].address_2
              : "")
        ) {
          setMailinChecked(i)
        }
      }
    }
  }, [findLocs])

  const handleChangeMailinAddress = (val: string, i: number) => {
    setMailinChecked(i)
    setSendToAddress(val)
  }

  const ChooseNextStep = () => {
    if (code === "MAIL_IN") {
      handleChangeChooseData(7, { code: code, data: { sendTo: sendToAddress } })
    } else {
      handleChangeChooseData(7, {
        code: code,
        data: {
          address: selectVal.name,
          time: time,
          day: day,
          month: t(MONTHS[month]),
          year: year,
          week: t(DAYS_OF_THE_WEEK[week]),
          timezone: storesDetails.cntUserLocation[0].timezone,
        },
      })
      handleChangeSelectTime(time)
    }
    handleStep(step + 1)
  }

  const handleChangeSelectTime = (val: string) => {
    if (!val) return
    const ptrVal: any[] = val.split(" ")
    let hr = 9,
      min = ""
    if (ptrVal[1] === "AM" || (ptrVal[1] === "PM" && ptrVal[0].split(":")[0] === "12")) {
      hr = ptrVal[0].split(":")[0]
    } else {
      hr = parseInt(ptrVal[0].split(":")[0]) + 12
    }
    min = ptrVal[0].split(":")[1]
    const repairSelectedTime: any = {
      selectDate: year + "-" + (month + 1) + "-" + day,
      selected_start_time: hr + ":" + min,
      selected_end_time: null,
    }
    repairWidgetStore.changeRepairWidgetInitialValue(repairSelectedTime)
    repairWidgetStore.changeTimezone(storesDetails.cntUserLocation[0].timezone)
  }

  const onKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter" && !disableStatus && step === 7) {
        ChooseNextStep()
      }
    },
    [step, code, sendToAddress, time, day, month, year, week, disableStatus]
  )

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress, false)
    return () => {
      document.removeEventListener("keydown", onKeyPress, false)
    }
  }, [step, code, sendToAddress, time, day, month, year, week, disableStatus, selectVal])

  useEffect(() => {
    setDisableStatus(true)
    if (code === "MAIL_IN" && sendToAddress) {
      setDisableStatus(false)
    }
    if (
      code !== "MAIL_IN" &&
      selectVal.name &&
      time &&
      day &&
      MONTHS[month] &&
      year &&
      DAYS_OF_THE_WEEK[week]
    ) {
      setDisableStatus(false)
    }
  }, [code, sendToAddress, time, day, month, year, week, selectVal])

  useEffect(() => {
    if (storesDetails.findAddLocation.length && selectVal.name && code !== "MAIL_IN") {
      for (let i = 0; i < storesDetails.findAddLocation.length; i++) {
        if (
          selectVal.name ===
          storesDetails.findAddLocation[i].address_1 +
            (storesDetails.findAddLocation[i].address_2
              ? ", " + storesDetails.findAddLocation[i].address_2
              : "")
        ) {
          const cntLoc: any[] = makeLocations([storesDetails.findAddLocation[i]])
          storesDetails.changeCntUserLocation(cntLoc)
          storesDetails.changeLocationID(storesDetails.findAddLocation[i].id)
          setHoursRange(
            cntLoc[0].hours[0] && cntLoc[0].hours[0].hrs
              ? cntLoc[0].hours[0].hrs
              : ["Closed", "Closed", "Closed", "Closed", "Closed", "Closed", "Closed"]
          )
        }
      }
    }
    if (storesDetails.findAddLocation.length && sendToAddress && code === "MAIL_IN") {
      for (let i = 0; i < storesDetails.findAddLocation.length; i++) {
        if (
          sendToAddress ===
          storesDetails.findAddLocation[i].address_1 +
            (storesDetails.findAddLocation[i].address_2
              ? ", " + storesDetails.findAddLocation[i].address_2
              : "")
        ) {
          const cntLoc: any = makeLocations([storesDetails.findAddLocation[i]])
          storesDetails.changeCntUserLocation(cntLoc)
          storesDetails.changeLocationID(storesDetails.findAddLocation[i].id)
        }
      }
    }
  }, [sendToAddress, selectVal])

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography className="service-widget-title">{t(data.title[code])}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card className="booking-card">
            <div className="service-choose-device-container">
              {
                <Typography className="service-summary-title">
                  {t(data.select.location.title[code])}
                </Typography>
              }
              <div style={{ marginBottom: "20px" }}>
                {code !== "MAIL_IN" && (
                  <CustomSelect
                    value={selectVal}
                    handleSetValue={setSelectVal}
                    subDomain={subDomain}
                    options={findLocs}
                  />
                )}
                {code === "MAIL_IN" && (
                  <div>
                    {findLocs.map((item: any, index: number) => {
                      return (
                        <div key={index} className="select-mail-in-radio">
                          <input
                            type="radio"
                            id={"radio" + index}
                            name="region"
                            value={item.name}
                            onChange={() => {
                              handleChangeMailinAddress(item.name, index)
                            }}
                            checked={index === mailInChecked}
                          />
                          <label htmlFor={"radio" + index}>{item.name}</label>
                        </div>
                      )
                    })}
                    <div className="select-mail-in-container">
                      <div>
                        <u>
                          <p className="select-mail-in-text">{t("Hours")}</p>
                        </u>
                      </div>
                    </div>
                    {selHours.map((item: any, index: number) => {
                      return (
                        <div key={index} className="select-mail-in-container">
                          <div style={{ width: "50%" }}>
                            <p className="select-mail-in-text">{t(item.day)}</p>
                          </div>
                          <div style={{ width: "50%" }}>
                            <p className="select-mail-in-text">
                              {item.hour === "Closed" ? t(item.hour) : item.hour}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              {code !== "MAIL_IN" && (
                <Typography className="service-summary-title">
                  {t(data.select.time.title[code])}
                </Typography>
              )}
              {code !== "MAIL_IN" && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CustomCalendar subDomain={subDomain} handleParentDate={setDate} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {hoursRange.length ? (
                      <CustomBookTime
                        themeCol={themeCol}
                        brandThemeCol={brandThemeCol}
                        repairBooktimeCol={repairBooktimeCol}
                        title={t(DAYS_OF_THE_WEEK[week]) + ", " + t(MONTHS[month]) + " " + day}
                        subDomain={subDomain}
                        changeBooktime={setTime}
                        selectYear={year}
                        selectMonth={month}
                        selectDay={day}
                        hoursRange={hoursRange}
                      />
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <div
                      style={{
                        border: "1px solid rgba(0,0,0,0.1)",
                        borderRadius: "20px",
                        width: "100%",
                        height: "30px",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {time ? (
                        <p style={{ textAlign: "center", margin: "0 10px" }}>
                          {t("You've selected")} {time} {t("on")} {t(DAYS_OF_THE_WEEK[week])},{" "}
                          {t(MONTHS[month])} {day}, {year}
                        </p>
                      ) : (
                        <p style={{ textAlign: "center", margin: "0 10px" }}>
                          {t("You did not select time yet.")}
                        </p>
                      )}
                    </div>
                  </Grid>
                </Grid>
              )}
            </div>
            <div className="service-card-button">
              <Button
                title={t("Next")}
                bgcolor={mainData.colorPalle.nextButtonCol}
                borderR="20px"
                width="120px"
                height="30px"
                fontSize="17px"
                onClick={ChooseNextStep}
                disable={disableStatus}
                subDomain={subDomain}
              />
              <p>{t("or press ENTER")}</p>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card className="service-summary-card">
            <RepairSummary
              step={step}
              subDomain={subDomain}
              themeCol={themeCol}
              repairWidgetStore={repairWidgetStore}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default inject("storesDetailsStore")(observer(BookTime))
