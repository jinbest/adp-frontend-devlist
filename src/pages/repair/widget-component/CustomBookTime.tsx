import React, {useEffect, useState} from 'react'

function availableTimeRange(min:number, max:number, intv:number, mut:number) {
  let timeRange:any[] = [], cntMin = min;
  while (1) {
    timeRange.push(cntMin * mut);
    cntMin = cntMin + intv;
    if(cntMin > max) {
      break;
    }
  }
  return timeRange;
}

function isWeek(selyear:number, selmonth:number, selday:number, seloff:number, defaultoff:number) {
  let timeoffset = -new Date().getTimezoneOffset() / 60;
  let selectedTimeStamp = new Date(selyear, selmonth, selday, (timeoffset-seloff + defaultoff)).getTime();
  return new Date(selectedTimeStamp).getDay();
}

function isPast(selyear:number, selmonth:number, selday:number, seloff:number, hrs:number, mins: number) {
  let timeoffset = -new Date().getTimezoneOffset() / 60;
  let selectedTiemStamp = new Date(selyear, selmonth, selday, hrs + (timeoffset-seloff), mins).getTime();
  let standTimeStamp = new Date().getTime();
  return selectedTiemStamp < standTimeStamp;
}

type Props = {
  themeCol?: string;
  title: string;
  subDomain?: string;
  timezoneIndex: number;
  timeZoneList: any[];
  defaultTimezone: any;
  changeTimezone: (tzIndex:number) => void;
  changeBooktime: (mark:string) => void;
  selectYear: number;
  selectMonth: number;
  selectDay: number;
}

type ArrayProps = {
  array: any[];
}

const CustomBookTime = ({
  title, timezoneIndex, timeZoneList, changeTimezone, selectYear, selectMonth, selectDay, defaultTimezone, themeCol, changeBooktime
}: Props) => {

  const timeRange = { workday: [540, 1050], saturday: [660, 960]}
  const interval = 30, multi = 60 * 1000;

  const [val, setVal] = useState(timezoneIndex);
  const [bookArray, setBookArray] = useState<ArrayProps[]>([]);

  useEffect(() => {
    let availRange:any[] = [],
        cntTimeStamp = new Date(selectYear, selectMonth, selectDay).getTime(), 
        booklist:any[] = [],
        cntTimeStampOffset = timeZoneList[val].offset,
        defaultOffset = defaultTimezone.offset;

    let week = isWeek(selectYear, selectMonth, selectDay, timeZoneList[val].offset, defaultOffset)

    if (week > 0 && week < 6) {
      availRange = availableTimeRange(timeRange.workday[0], timeRange.workday[1], interval, multi);
    } else {
      availRange = availableTimeRange(timeRange.saturday[0], timeRange.saturday[1], interval, multi);
    }
    
    for (let i = 0; i < availRange.length; i++) {
      let cntbookStamp = cntTimeStamp + availRange[i] + (cntTimeStampOffset-defaultOffset) * 3600 * 1000;
      let cntbook = new Date(cntbookStamp);
      let mark = cntbook.getHours() >= 12 ? 'PM' : 'AM', 
          markMin = cntbook.getMinutes() === 0 ? '00' : cntbook.getMinutes(),
          markHour = cntbook.getHours() % 12 === 0 ? 12 : cntbook.getHours() % 12;

      let past = false;
      if (i > 0 && cntbook.getHours() === 0 && booklist[0].book !== '12:00 AM') {
        past = isPast(selectYear, selectMonth, selectDay+1, timeZoneList[val].offset, cntbook.getHours(), cntbook.getMinutes());
      } else {
        past = isPast(selectYear, selectMonth, selectDay, timeZoneList[val].offset, cntbook.getHours(), cntbook.getMinutes());
      }

      booklist.push({
        book: markHour + ':' + markMin + ' ' + mark, 
        isPast: past ? true : false, 
        color: past ? 'rgba(0,0,0,0.2)' : themeCol,
        bgColor: 'white',
        borderCol: past ? 'rgba(0,0,0,0.2)' : themeCol
      });
    }
    setBookArray([...booklist])
  }, [selectYear, selectMonth, selectDay, val])

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let cntVal = e.target.value;
    setVal(parseInt(cntVal));
    changeTimezone(parseInt(cntVal));
  }

  const handleBook = (n:number) => {
    let cntBookArray:any[] = bookArray;
    if (cntBookArray[n].isPast) return;
    for (let i = 0; i < cntBookArray.length; i++) {
      if (i === n) {
        cntBookArray[i].color = 'white';
        cntBookArray[i].bgColor = themeCol;
      } else {
        cntBookArray[i].color = cntBookArray[i].isPast ? 'rgba(0,0,0,0.2)' : themeCol;
        cntBookArray[i].bgColor = cntBookArray[i].isPast ? 'rgba(0,0,0,0.2)' : 'white';
      }
    }
    changeBooktime(cntBookArray[n].book);
    setBookArray([...cntBookArray]);
  }

  return (
    <div className='custom-book-time'>
      <p>{title}</p>
      <div className='booking-list'>
        {bookArray.map((item:any, index:number) => {
          return (
            <div 
              key={index} 
              style={{ border: `1px solid ${item.borderCol}`, color: item.color, backgroundColor: item.bgColor }} 
              className='booking-item'
              onClick={()=>{handleBook(index)}}
            >
              {item.book}
            </div>
          )
        })}
      </div>
      <div>
        <select className='booking-select-timezone' value={val} onChange={handleChangeOption}>
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