import React, {useState, useEffect, useCallback} from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Card } from './'
import { Button, CustomSelect, CustomCalendar, InputComponent } from '../../../components'
import CustomBookTime from './CustomBookTime'
import RepairSummary from './RepairSummary'
import { useT } from '../../../i18n/index'

type Props = {
  data: any;
  subDomain?: string;
  step: number;
  handleStep: (step:number) => void;
  code: string;
  handleChangeChooseData: (step:number, chooseData:any) => void;
  repairWidgetData: any;
}

const BookTime = ({data, subDomain, step, code, handleStep, handleChangeChooseData, repairWidgetData}: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database.js`);
  const timezoneData = require(`../../../assets/${subDomain}/mock-data/timezoneList.js`);
  const mockData = require(`../../../assets/${subDomain}/mock-data/mockData.js`);
  const timeZoneList = timezoneData.timezoneOptions;
  const themeCol = mainData.colorPalle.themeColor;
  const repairBooktimeCol = mainData.colorPalle.repairBooktimeCol;
  const brandThemeCol = mainData.brandItemsData.brandThemeCol;
  const DAYS_OF_THE_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MONTHS = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December'];
  const publicText = mockData.repairWidget.publicText;

  const [tzIndex, setTZIndex] = useState(0);
  const [timezone, setTimezone] = useState(timeZoneList[tzIndex].timezone)
  const [today, setToday] = useState(changeTimezone(new Date(), timezone));
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [week, setWeek] = useState(date.getDay());
  const [time, setTime] = useState(date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }));
  const [selectVal, setSelectVal] = useState('');
  const [address, setAddress] = useState('');
  const [sendToAddress, setSendToAddress] = useState('');
  const [mailInChecked, setMailinChecked] = useState(0);
  const [disableStatus, setDisableStatus] = useState(true);

  const t = useT();

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setWeek(date.getDay());
    setTime(date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }))
  }, [date]);
  
  useEffect(() => {
    setToday(changeTimezone(new Date(), timezone))
    setDate(changeTimezone(new Date(), timezone))
  }, [timezone])

  useEffect(() => {
    setTimezone(timeZoneList[tzIndex].timezone);
  }, [tzIndex]);

  useEffect(() => {
    if (code === 'MAIL_IN') {
      const cntMailinOption:any[] = data.select.location.mailInOption;
      setSendToAddress(cntMailinOption[mailInChecked].name);
      for (let i = 0; i < cntMailinOption.length; i++) {
        if (cntMailinOption[i].name === repairWidgetData.bookData[code].sendTo) {
          setMailinChecked(i);
          setSendToAddress(repairWidgetData.bookData[code].sendTo);
        }
      }
    } 
    else if (code === 'PICK_UP' || code === 'ONSITE') {
      setAddress(repairWidgetData.bookData[code].address);
    } 
    else {
      if (repairWidgetData.bookData[code].address) {
        setSelectVal(repairWidgetData.bookData[code].address);
      } else {
        setSelectVal(data.select.location.option[0]);
      }      
    }
  }, [repairWidgetData, step, code, data]);

  const handleChangeAddress = (val:string) => {
    setAddress(val);
  }

  const handleChangeMailinAddress = (val:string, i:number) => {
    setMailinChecked(i);
    setSendToAddress(val);
  }

  function changeTimezone(date:Date, ianatz:string) {
    const invdate = new Date(date.toLocaleString('en-US', {
      timeZone: ianatz
    }));
    const diff = date.getTime() - invdate.getTime();
    return new Date(date.getTime() - diff);
  }

  const ChooseNextStep = () => {
    if (code === 'MAIL_IN') {
      handleChangeChooseData(7, { code: code, data: { sendTo: sendToAddress } });
    } else {
      handleChangeChooseData(7, {
        code: code, 
        data: { 
          address: (code === 'CURBSIDE' || code === 'WALK_IN') ? selectVal : address, 
          time: time, 
          day: day, 
          month: MONTHS[month], 
          year: year, 
          week: DAYS_OF_THE_WEEK[week] 
        }
      });
    }    
    handleStep(step+1)
  }

  const onKeyPress = useCallback((event) => {
    if(event.key === 'Enter' && !disableStatus && step === 7) {
      ChooseNextStep();
    }
  }, [step, code, sendToAddress, address, selectVal, time, day, month, year, week, disableStatus]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, [step, code, sendToAddress, address, selectVal, time, day, month, year, week, disableStatus])

  useEffect(() => {
    setDisableStatus(true);
    if (code === 'MAIL_IN' && sendToAddress) {
      setDisableStatus(false);
    }
    if (code !== 'MAIL_IN' && (address || selectVal) && time && day && MONTHS[month] && year && DAYS_OF_THE_WEEK[week]) {
      setDisableStatus(false);
    }
  }, [code, sendToAddress, address, selectVal, time, day, month, year, week])

  return (
    <div>
      <Grid container className='' spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography className={subDomain + "-repair-widget-title"}>
            {t(data.title[code])}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className='' spacing={3}>
        <Grid item xs={12} md={7}>
          <Card className={subDomain + '-booking-card'}>
            <div className={subDomain + '-repair-choose-device-container'}>
              <Typography className={subDomain + '-repair-summary-title'}>{t(data.select.location.title[code])}</Typography>
              <div style={{marginBottom: '20px'}}>
                {(code === 'CURBSIDE' || code === 'WALK_IN') && <CustomSelect value={selectVal} handleSetValue={setSelectVal} subDomain={subDomain} options={data.select.location.option} />}
                {(code === 'PICK_UP' || code === 'ONSITE') && <InputComponent value={address} handleChange={(e)=>{handleChangeAddress(e.target.value)}} subDomain={subDomain} />}
                {code === 'MAIL_IN' && <div>
                  {data.select.location.mailInOption.map((item:any, index:number) => {
                    return (
                      <div key={index} className={subDomain + '-select-mail-in-radio'}>
                        <input 
                          type='radio' 
                          id={'radio'+index} 
                          name='region' 
                          value={item.name} 
                          onChange={()=>{handleChangeMailinAddress(item.name, index)}} 
                          checked={index===mailInChecked} 
                        />
                        <label htmlFor={'radio'+index}>{item.name}</label>
                      </div>
                    )
                  })}
                  <div className={subDomain + '-select-mail-in-container'}>
                    <div><u><p className={subDomain + '-select-mail-in-text'}>{t('HOURS')}</p></u></div>
                  </div>
                  {data.select.time.workingHours.map((item:any, index:number) => {
                    return (
                      <div key={index} className={subDomain + '-select-mail-in-container'}>
                        <div style={{width: '50%'}}><p className={subDomain + '-select-mail-in-text'}>{t(item[0])}</p></div>
                        <div style={{width: '50%'}}><p className={subDomain + '-select-mail-in-text'}>{t(item[1])}</p></div>
                      </div>
                    )
                  })}
                </div>}
              </div>
              {code !== 'MAIL_IN' && <Typography className={subDomain + '-repair-summary-title'}>{t(data.select.time.title[code])}</Typography>}
              {code !== 'MAIL_IN' && <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomCalendar subDomain={subDomain} handleParentDate={setDate} timezone={timezone} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomBookTime 
                    themeCol={themeCol} 
                    brandThemeCol={brandThemeCol}
                    repairBooktimeCol={repairBooktimeCol}
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
                    <p style={{textAlign: 'center', margin: '0 10px'}}>{t('YOUR_HAVE_SELECTED')} {time} {t('ON')} {DAYS_OF_THE_WEEK[week]}, {MONTHS[month]} {day}, {year}</p>
                  </div>
                </Grid>
              </Grid>}
            </div>
            <div className={subDomain + '-repair-card-button'}>
              <Button 
                title={publicText.next} bgcolor={mainData.colorPalle.nextButtonCol} borderR='20px' width='120px' 
                height='30px' fontSize='17px' onClick={ChooseNextStep} disable={disableStatus} subDomain={subDomain}
              />
              <p>{t(publicText.enterKey)}</p>
            </div>
          </Card>          
        </Grid>
        <Grid item xs={12} md={5}>
          <Card className={subDomain + '-repair-summary-card'}>
            <RepairSummary 
              step={step} 
              subDomain={subDomain} 
              themeCol={themeCol} 
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default BookTime
