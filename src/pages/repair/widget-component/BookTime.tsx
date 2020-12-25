import React, {useState, useEffect} from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Card } from './'
import { Button, CustomSelect, CustomCalendar } from '../../../components'
import CustomBookTime from './CustomBookTime'

type Props = {
  data: any;
  subDomain?: string;
  step: number;
  handleStep: (step:number) => void;
}

const BookTime = ({data, subDomain, step, handleStep}: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database.js`)
  const mockData = require(`../../../assets/${subDomain}/mock-data/timezoneList.js`)
  const timeZoneList = mockData.timezoneOptions;
  const themeCol = mainData.colorPalle.themeColor;
  const DAYS_OF_THE_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MONTHS = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December'];

  const [timezone, setTimezone] = useState(timeZoneList[0].timezone)
  const [today, setToday] = useState(changeTimezone(new Date(), timezone));
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [week, setWeek] = useState(date.getDay());
  const [time, setTime] = useState(date.toLocaleTimeString())

  console.log(today)

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setWeek(date.getDay());
    setWeek(date.getDay());
    setTime(date.toLocaleTimeString());
  }, [date]);

  useEffect(() => {
    setToday(changeTimezone(new Date(), timezone))
    setDate(changeTimezone(new Date(), timezone))
  }, [timezone])

  function changeTimezone(date:Date, ianatz:string) {
    let invdate = new Date(date.toLocaleString('en-US', {
      timeZone: ianatz
    }));
    let diff = date.getTime() - invdate.getTime();
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
            {data.title}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className='' spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <div className='repair-choose-device-container'>
              <Typography className='repair-summary-title'>{data.select.location.title}</Typography>
              <CustomSelect subDomain={subDomain} options={data.select.location.option} />
              <Typography className='repair-summary-title'>{data.select.time.title}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomCalendar subDomain={subDomain} handleParentDate={setDate} timezone={timezone} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomBookTime 
                    themeCol={themeCol} 
                    week={week} 
                    title={DAYS_OF_THE_WEEK[week] + ', ' + MONTHS[month] + ' ' + day}
                    subDomain={subDomain}
                    timezone={timezone}
                    timeZoneList={timeZoneList}
                    changeTimezone={setTimezone}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div style={{border: '1px solid rgba(0,0,0,0.1)', borderRadius: '20px', width: '100%', height: '30px', fontSize: '14px', display: 'flex', alignItems: 'center'}}>
                    <p style={{marginLeft: '20px'}}>You've selected {time} on {DAYS_OF_THE_WEEK[week]}, {MONTHS[month]} {day}, {year}</p>
                  </div>
                </Grid>
              </Grid>
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
          <Card>
            <div className='repair-choose-device-container'>
              <Typography className='topic-title'>{data.mainTopic.title}</Typography>
              {data.mainTopic.content && data.mainTopic.content.map((item:any, index:number) => {
                return (
                  <div key={index} style={{border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', padding: '10px', marginBottom: '10px', display: 'flex'}}>
                    <div style={{marginRight: '10px'}}><img src={item.img} /></div>
                    <div>
                      <Typography className='repair-summary-title'>{item.subtitle}</Typography>
                      <Typography className='repair-summary-service'>{item.service}</Typography>
                      {item.details.map((i:any, k:number) => {
                        return (
                          <p key={k}>{i}</p>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default BookTime
