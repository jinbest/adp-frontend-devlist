import React, {useState, useEffect} from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Card } from './'
import { Button, CustomSelect, CustomCalendar, InputComponent } from '../../../components'
import CustomBookTime from './CustomBookTime'

type Props = {
  data: any;
  subDomain?: string;
  step: number;
  handleStep: (step:number) => void;
  caseKey: number;
}

const BookTime = ({data, subDomain, step, caseKey, handleStep}: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database.js`)
  const timezoneData = require(`../../../assets/${subDomain}/mock-data/timezoneList.js`)
  const timeZoneList = timezoneData.timezoneOptions;
  const themeCol = mainData.colorPalle.themeColor;
  const DAYS_OF_THE_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MONTHS = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December'];

  const [tzIndex, setTZIndex] = useState(0);
  const [timezone, setTimezone] = useState(timeZoneList[tzIndex].timezone)
  const [today, setToday] = useState(changeTimezone(new Date(), timezone));
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [week, setWeek] = useState(date.getDay());
  const [time, setTime] = useState(date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setWeek(date.getDay());
    setWeek(date.getDay());
  }, [date]);

  useEffect(() => {
    setToday(changeTimezone(new Date(), timezone))
    setDate(changeTimezone(new Date(), timezone))
  }, [timezone])

  useEffect(() => {
    setTimezone(timeZoneList[tzIndex].timezone);
  }, [tzIndex])

  function changeTimezone(date:Date, ianatz:string) {
    const invdate = new Date(date.toLocaleString('en-US', {
      timeZone: ianatz
    }));
    const diff = date.getTime() - invdate.getTime();
    return new Date(date.getTime() - diff);
  }

  const ChooseNextStep = () => {
    handleStep(step+1)
  }

  return (
    <div>
      <Grid container className='' spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography className="repair-widget-title">
            {data.title[caseKey]}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className='' spacing={3}>
        <Grid item xs={12} md={7}>
          <Card className='booking-card'>
            <div className='repair-choose-device-container'>
              <Typography className='repair-summary-title'>{data.select.location.title[caseKey]}</Typography>
              <div style={{marginBottom: '20px'}}>
                {caseKey === 0 && <CustomSelect subDomain={subDomain} options={data.select.location.option} />}
                {caseKey === 1 && <InputComponent />}
                {caseKey === 2 && <div>
                  {data.select.location.mailInOption.map((item:any, index:number) => {
                    return (
                      <div key={index}>
                        <input type='radio' id={'radio'+index} name='region' value={item}></input>
                        <label htmlFor={'radio'+index}>{item}</label>
                      </div>
                    )
                  })}
                  <u><p>Hours</p></u>
                  <p>Monday - Friday   9:00 a.m.-5:00 p.m.</p>
                  <p>Saturday   11:00 a.m.-4:00 p.m.</p>
                  <p>Sunday    Closed</p>
                </div>}
              </div>
              <Typography className='repair-summary-title'>{data.select.time.title[caseKey]}</Typography>
              {caseKey === 2 && <InputComponent placeholder='Enter your delivery address (optional)' />}
              {caseKey < 2 && <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomCalendar subDomain={subDomain} handleParentDate={setDate} timezone={timezone} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomBookTime 
                    themeCol={themeCol} 
                    title={DAYS_OF_THE_WEEK[week] + ', ' + MONTHS[month] + ' ' + day}
                    subDomain={subDomain}
                    timezoneIndex={tzIndex}
                    timeZoneList={timeZoneList}
                    defaultTimezone={timezoneData.defaultTimezone}
                    changeTimezone={setTZIndex}
                    changeBooktime={setTime}
                    selectYear={year}
                    selectMonth={month}
                    selectDay={day}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div style={{border: '1px solid rgba(0,0,0,0.1)', borderRadius: '20px', width: '100%', height: '30px', fontSize: '14px', display: 'flex', alignItems: 'center'}}>
                    <p style={{textAlign: 'center', margin: '0 10px'}}>You've selected {time} on {DAYS_OF_THE_WEEK[week]}, {MONTHS[month]} {day}, {year}</p>
                  </div>
                </Grid>
              </Grid>}
            </div>
            <div className='repair-card-button'>
              <Button 
                title='Next' 
                bgcolor={themeCol} 
                borderR='20px' 
                width='120px' 
                height='30px' 
                fontSize='17px' 
                onClick={ChooseNextStep}
              />
              <p>or press ENTER</p>
            </div>
          </Card>          
        </Grid>
        <Grid item xs={12} md={5}>
          <Card className='repair-summary-card'>
            <div className='repair-choose-device-container'>
              <Typography className='topic-title'>{data.mainTopic.title}</Typography>
              <div className='repair-summary-content-div'>
                {data.mainTopic.content && data.mainTopic.content.map((item:any, index:number) => {
                  return (
                    <div key={index} className='repair-summary-div'>
                      <div className='repair-summary-img'><img src={item.img} /></div>
                      <div>
                        <Typography className='repair-summary-title'>{item.subtitle}</Typography>
                        <Typography className='repair-summary-service'>{item.service}</Typography>
                        {item.details.map((i:any, k:number) => {
                          return (
                            <p key={k} className='repair-summary-service-child'>{i}</p>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default BookTime
