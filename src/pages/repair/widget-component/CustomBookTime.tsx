import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

function availableTimeRange(min: number, max: number, intv: number, mut: number) {
  if (min === max) return ["Closed"]
  const timeRange: any[] = []
  let cntMin = min
  while (1) {
    timeRange.push(cntMin * mut)
    cntMin = cntMin + intv
    if (cntMin > max) {
      break
    }
  }
  return timeRange
}

function isWeek(selyear: number, selmonth: number, selday: number) {
  return new Date(selyear, selmonth, selday).getDay()
}

function isPast(
  selyear: number,
  selmonth: number,
  selday: number,
  seloff: number,
  hrs: number,
  mins: number
) {
  const timeoffset = -new Date().getTimezoneOffset() / 60
  const selectedTiemStamp = new Date(
    selyear,
    selmonth,
    selday,
    hrs + (timeoffset - seloff),
    mins
  ).getTime()
  const standTimeStamp = new Date().getTime()
  return selectedTiemStamp < standTimeStamp
}

function convertTimeRange(hoursRange: any[]) {
  const timesRange = []
  for (let i = 0; i < hoursRange.length; i++) {
    if (parseInt(hoursRange[i].split("-")[0])) {
      const startTime =
        parseInt(hoursRange[i].split("-")[0]) + (hoursRange[i].split("-")[0].includes("a") ? 0 : 12)
      const endTime =
        parseInt(hoursRange[i].split("-")[1]) + (hoursRange[i].split("-")[1].includes("a") ? 0 : 12)
      timesRange.push([startTime * 60, endTime * 60])
    } else {
      timesRange.push([0, 0])
    }
  }
  return timesRange
}

type Props = {
  themeCol?: string
  brandThemeCol?: string
  repairBooktimeCol?: string
  title: string
  subDomain?: string
  changeBooktime: (mark: string) => void
  selectYear: number
  selectMonth: number
  selectDay: number
  hoursRange: any[]
}

type ArrayProps = {
  array: any[]
}

const CustomBookTime = ({
  title,
  selectYear,
  selectMonth,
  selectDay,
  repairBooktimeCol,
  changeBooktime,
  hoursRange,
}: Props) => {
  const interval = 30,
    multi = 60 * 1000

  const [bookArray, setBookArray] = useState<ArrayProps[]>([])
  const [t] = useTranslation()

  useEffect(() => {
    const timesRng = convertTimeRange(hoursRange)
    const cntTimeStamp = new Date(selectYear, selectMonth, selectDay).getTime(),
      booklist: any[] = [],
      cntTimeStampOffset = -(new Date().getTimezoneOffset() / 60),
      // cntTimeStampOffset = -6,
      defaultOffset = -6,
      week = isWeek(selectYear, selectMonth, selectDay),
      availRange: any[] = availableTimeRange(timesRng[week][0], timesRng[week][1], interval, multi)

    if (!availRange.includes("Closed")) {
      for (let i = 0; i < availRange.length - 1; i++) {
        const cntbookStamp =
          cntTimeStamp + availRange[i] + (cntTimeStampOffset - defaultOffset) * 3600 * 1000
        const cntbook = new Date(cntbookStamp)
        const mark = cntbook.getHours() >= 12 ? "PM" : "AM",
          markMin = cntbook.getMinutes() === 0 ? "00" : cntbook.getMinutes(),
          markHour = cntbook.getHours() % 12 === 0 ? 12 : cntbook.getHours() % 12
        let past = false
        if (i > 0 && cntbook.getHours() === 0 && booklist[0].book !== "12:00 AM") {
          past = isPast(
            selectYear,
            selectMonth,
            selectDay + 1,
            cntTimeStampOffset,
            cntbook.getHours(),
            cntbook.getMinutes()
          )
        } else {
          past = isPast(
            selectYear,
            selectMonth,
            selectDay,
            cntTimeStampOffset,
            cntbook.getHours(),
            cntbook.getMinutes()
          )
        }
        booklist.push({
          book: markHour + ":" + markMin + " " + mark,
          isPast: past ? true : false,
          color: past ? "rgba(0,0,0,0.2)" : repairBooktimeCol,
          bgColor: "white",
          borderCol: past ? "rgba(0,0,0,0.2)" : repairBooktimeCol,
        })
      }
    } else {
      booklist.push({
        book: "Closed",
        isPast: true,
        color: "rgba(0,0,0,0.2)",
        bgColor: "white",
        borderCol: "rgba(0,0,0,0.2)",
      })
    }
    setBookArray([...booklist])
  }, [selectYear, selectMonth, selectDay, hoursRange])

  const handleBook = (n: number) => {
    const cntBookArray: any[] = bookArray
    if (cntBookArray[n].isPast) return
    for (let i = 0; i < cntBookArray.length; i++) {
      if (i === n) {
        cntBookArray[i].color = "white"
        cntBookArray[i].bgColor = repairBooktimeCol
        cntBookArray[i].borderCol = repairBooktimeCol
      } else {
        cntBookArray[i].color = cntBookArray[i].isPast ? "rgba(0,0,0,0.2)" : repairBooktimeCol
        cntBookArray[i].borderCol = cntBookArray[i].isPast ? "rgba(0,0,0,0.2)" : repairBooktimeCol
        cntBookArray[i].bgColor = "white"
      }
    }
    changeBooktime(cntBookArray[n].book)
    setBookArray([...cntBookArray])
  }

  return (
    <div className="custom-book-time">
      <p>{title}</p>
      <div className="booking-list">
        {bookArray.map((item: any, index: number) => {
          return (
            <div
              key={index}
              style={{
                border: `1px solid ${item.borderCol}`,
                color: item.color,
                backgroundColor: item.bgColor,
              }}
              className="booking-item"
              onClick={() => {
                handleBook(index)
              }}
            >
              {item.book === "Closed" ? t(item.book) : item.book}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CustomBookTime
