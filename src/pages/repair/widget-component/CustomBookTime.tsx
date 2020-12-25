import React, {useEffect, useState} from 'react'
import {CustomSelect} from '../../../components'

type Props = {
  themeCol?: string;
  week: number;
  title: string;
  subDomain?: string;
  timezone: string;
  timeZoneList: any[];
  changeTimezone: (tz:string) => void;
}

const CustomBookTime = ({week, title, timezone, timeZoneList, changeTimezone}: Props) => {

  const [val, setVal] = useState(0);
  const [time, setTime] = useState(
    new Date().toLocaleString("en-US", {
      timeZone: `${timezone}`,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'long'
    })
  );

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let cntVal = e.target.value;
    setVal(parseInt(cntVal));
    changeTimezone(timeZoneList[parseInt(cntVal)].timezone)
  }

  useEffect(() => {
    let date = new Date;
    let strTime = date.toLocaleString("en-US", {
      timeZone: `${timeZoneList[val].timezone}`,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'long'
    });
    setTime(strTime);
  }, [val])

  return (
    <div className='custom-book-time'>
      <p>{week} {title}</p>
      <p>{timeZoneList[val].title}</p>
      <p>{time}</p>
      <div>
        <select style={{outline: 'none', border: 'none'}} value={val} onChange={handleChangeOption}>
          {timeZoneList.map((item:any, index:number) => {
            return (
              <option value={index} key={index}>{item.title}</option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default CustomBookTime