import React, { useState, useEffect, useCallback } from "react"
import { Grid, Typography } from "@material-ui/core"
import { Card } from "./"
import { Button, CustomCalendar, CustomSelect } from "../../../components"
import CustomBookTime from "./CustomBookTime"
import RepairSummary from "./RepairSummary"
import { useT } from "../../../i18n/index"
import { repairWidgetStore, storesDetails } from "../../../store"
import { makeLocations } from "../../../components/CustomizedMenus"

type Props = {
    data: any
    subDomain?: string
    step: number
    handleStep: (step: number) => void
    code: string
    handleChangeChooseData: (step: number, chooseData: any) => void
    repairWidgetData: any
}

const BookTime = ({ data, subDomain, step, code, handleStep, handleChangeChooseData }: Props) => {
    const mainData = require(`../../../assets/${subDomain}/Database.js`)
    const timezoneData = require(`../../../assets/${subDomain}/mock-data/timezoneList.js`)
    const mockData = require(`../../../assets/${subDomain}/mock-data/mockData.js`)
    const timeZoneList = timezoneData.timezoneOptions
    const themeCol = mainData.colorPalle.themeColor
    const repairBooktimeCol = mainData.colorPalle.repairBooktimeCol
    const brandThemeCol = mainData.brandItemsData.brandThemeCol
    const DAYS_OF_THE_WEEK = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]
    const MONTHS = [
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
    const publicText = mockData.repairWidget.publicText

    const [tzIndex, setTZIndex] = useState(0)
    const [timezone, setTimezone] = useState(timeZoneList[tzIndex].timezone)
    const [today, setToday] = useState(changeTimezone(new Date(), timezone))
    const [date, setDate] = useState(today)
    const [day, setDay] = useState(date.getDate())
    const [month, setMonth] = useState(date.getMonth())
    const [year, setYear] = useState(date.getFullYear())
    const [week, setWeek] = useState(date.getDay())
    const [time, setTime] = useState(
        date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })
    )
    const [selectVal, setSelectVal] = useState({
        code: storesDetails.cntUserLocation.length
            ? storesDetails.cntUserLocation[0].location_id
            : -1,
        name: storesDetails.cntUserLocation.length
            ? storesDetails.cntUserLocation[0].location_name
            : "",
    })
    const [sendToAddress, setSendToAddress] = useState("")
    const [mailInChecked, setMailinChecked] = useState(0)
    const [disableStatus, setDisableStatus] = useState(true)
    const [hoursRange, setHoursRange] = useState<any[]>([])

    const t = useT()

    type FindLocProps = {
        code: string
        name: string
    }

    type SelectHoursProps = {
        day: string
        hour: string
    }

    const [findLocs, setFindLocs] = useState<FindLocProps[]>([])
    const [selHours, setSelHours] = useState<SelectHoursProps[]>([])

    useEffect(() => {
        const cntFindLoc: FindLocProps[] = []
        const storeLocs: any[] = storesDetails.findAddLocation
        for (let i = 0; i < storeLocs.length; i++) {
            cntFindLoc.push({ code: storeLocs[i].id, name: storeLocs[i].location_name })
        }
        setFindLocs(cntFindLoc)
    }, [storesDetails])

    useEffect(() => {
        const cntSelHours: SelectHoursProps[] = []
        const days: string[] = [
            "SUNDAY",
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
        ]
        const storeLocs: any[] = storesDetails.findAddLocation
        const i: number = mailInChecked
        if (storeLocs.length) {
            for (let j = 0; j < storeLocs[i].location_hours.length; j++) {
                if (storeLocs[i].location_hours[j].type === "REGULAR") {
                    let hour = ""
                    if (
                        !storeLocs[i].location_hours[j].open ||
                        !storeLocs[i].location_hours[j].close
                    ) {
                        hour = "Closed"
                    } else {
                        const open: string =
                            (parseInt(storeLocs[i].location_hours[j].open.split(":")[0]) % 12) +
                            ":" +
                            storeLocs[i].location_hours[j].open.split(":")[1] +
                            " a.m."
                        const close: string =
                            (parseInt(storeLocs[i].location_hours[j].close.split(":")[0]) % 12) +
                            ":" +
                            storeLocs[i].location_hours[j].close.split(":")[1] +
                            " p.m."
                        hour = open + " - " + close
                    }
                    cntSelHours.push({
                        day: days[storeLocs[i].location_hours[j].day],
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
        setTime(date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" }))
    }, [date])

    useEffect(() => {
        setToday(changeTimezone(new Date(), timezone))
        setDate(changeTimezone(new Date(), timezone))
    }, [timezone])

    useEffect(() => {
        setTimezone(timeZoneList[tzIndex].timezone)
    }, [tzIndex])

    useEffect(() => {
        if (code === "MAIL_IN" && storesDetails.cntUserLocation.length) {
            setSendToAddress(storesDetails.cntUserLocation[0].location_name)
            for (let i = 0; i < findLocs.length; i++) {
                if (findLocs[i].name === storesDetails.cntUserLocation[0].location_name) {
                    setMailinChecked(i)
                }
            }
        }
    }, [findLocs])

    const handleChangeMailinAddress = (val: string, i: number) => {
        setMailinChecked(i)
        setSendToAddress(val)
    }

    function changeTimezone(date: Date, ianatz: string) {
        const invdate = new Date(
            date.toLocaleString("en-US", {
                timeZone: ianatz,
            })
        )
        const diff = date.getTime() - invdate.getTime()
        return new Date(date.getTime() - diff)
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
                    month: MONTHS[month],
                    year: year,
                    week: DAYS_OF_THE_WEEK[week],
                    timezone: timeZoneList[tzIndex].offset,
                },
            })
            const cntSelectDate = year + "-" + (month + 1) + "-" + day
            repairWidgetStore.changeRepairWidgetInitialValue({
                selectDate: cntSelectDate,
                selected_start_time: new Date(cntSelectDate).getDay() === 0 ? "10:00" : "09:00",
                selected_end_time: new Date(cntSelectDate).getDay() === 0 ? "16:00" : "17:30",
            })
        }
        handleStep(step + 1)
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
                if (selectVal.name === storesDetails.findAddLocation[i].location_name) {
                    const cntLoc: any[] = makeLocations([storesDetails.findAddLocation[i]])
                    storesDetails.changeCntUserLocation(cntLoc)
                    storesDetails.changeLocationID(storesDetails.findAddLocation[i].id)
                    setHoursRange(cntLoc[0].hours[0].hrs)
                }
            }
        }
        if (storesDetails.findAddLocation.length && sendToAddress && code === "MAIL_IN") {
            for (let i = 0; i < storesDetails.findAddLocation.length; i++) {
                if (sendToAddress === storesDetails.findAddLocation[i].location_name) {
                    const cntLoc: any = makeLocations([storesDetails.findAddLocation[i]])
                    storesDetails.changeCntUserLocation(cntLoc)
                    storesDetails.changeLocationID(storesDetails.findAddLocation[i].id)
                }
            }
        }
    }, [sendToAddress, selectVal])

    return (
        <div>
            <Grid container className="" spacing={3}>
                <Grid item xs={12} md={12}>
                    <Typography className={subDomain + "-repair-widget-title"}>
                        {t(data.title[code])}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container className="" spacing={3}>
                <Grid item xs={12} md={7}>
                    <Card className={subDomain + "-booking-card"}>
                        <div className={subDomain + "-repair-choose-device-container"}>
                            {<Typography className={subDomain + "-repair-summary-title"}>
                                {t(data.select.location.title[code])}
                            </Typography>}
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
                                                <div
                                                    key={index}
                                                    className={subDomain + "-select-mail-in-radio"}
                                                >
                                                    <input
                                                        type="radio"
                                                        id={"radio" + index}
                                                        name="region"
                                                        value={item.name}
                                                        onChange={() => {
                                                            handleChangeMailinAddress(
                                                                item.name,
                                                                index
                                                            )
                                                        }}
                                                        checked={index === mailInChecked}
                                                    />
                                                    <label htmlFor={"radio" + index}>
                                                        {item.name}
                                                    </label>
                                                </div>
                                            )
                                        })}
                                        <div className={subDomain + "-select-mail-in-container"}>
                                            <div>
                                                <u>
                                                    <p
                                                        className={
                                                            subDomain + "-select-mail-in-text"
                                                        }
                                                    >
                                                        {t("HOURS")}
                                                    </p>
                                                </u>
                                            </div>
                                        </div>
                                        {selHours.map((item: any, index: number) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={
                                                        subDomain + "-select-mail-in-container"
                                                    }
                                                >
                                                    <div style={{ width: "50%" }}>
                                                        <p
                                                            className={
                                                                subDomain + "-select-mail-in-text"
                                                            }
                                                        >
                                                            {item.day}
                                                        </p>
                                                    </div>
                                                    <div style={{ width: "50%" }}>
                                                        <p
                                                            className={
                                                                subDomain + "-select-mail-in-text"
                                                            }
                                                        >
                                                            {item.hour}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                            {code !== "MAIL_IN" && (
                                <Typography className={subDomain + "-repair-summary-title"}>
                                    {t(data.select.time.title[code])}
                                </Typography>
                            )}
                            {code !== "MAIL_IN" && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <CustomCalendar
                                            subDomain={subDomain}
                                            handleParentDate={setDate}
                                            timezone={timezone}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {hoursRange.length && <CustomBookTime
                                            themeCol={themeCol}
                                            brandThemeCol={brandThemeCol}
                                            repairBooktimeCol={repairBooktimeCol}
                                            title={
                                                DAYS_OF_THE_WEEK[week] +
                                                ", " +
                                                MONTHS[month] +
                                                " " +
                                                day
                                            }
                                            subDomain={subDomain}
                                            timezoneIndex={tzIndex}
                                            timeZoneList={timeZoneList}
                                            defaultTimezone={timezoneData.defaultTimezone}
                                            changeTimezone={setTZIndex}
                                            changeBooktime={setTime}
                                            selectYear={year}
                                            selectMonth={month}
                                            selectDay={day}
                                            hoursRange={hoursRange}
                                        />}
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
                                            <p style={{ textAlign: "center", margin: "0 10px" }}>
                                                {t("YOUR_HAVE_SELECTED")} {time} {t("ON")}{" "}
                                                {DAYS_OF_THE_WEEK[week]}, {MONTHS[month]} {day},{" "}
                                                {year}
                                            </p>
                                        </div>
                                    </Grid>
                                </Grid>
                            )}
                        </div>
                        <div className={subDomain + "-repair-card-button"}>
                            <Button
                                title={t(publicText.next)}
                                bgcolor={mainData.colorPalle.nextButtonCol}
                                borderR="20px"
                                width="120px"
                                height="30px"
                                fontSize="17px"
                                onClick={ChooseNextStep}
                                disable={disableStatus}
                                subDomain={subDomain}
                            />
                            <p>{t(publicText.enterKey)}</p>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Card className={subDomain + "-repair-summary-card"}>
                        <RepairSummary step={step} subDomain={subDomain} themeCol={themeCol} />
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default BookTime
