import React, {useState, useEffect, useCallback} from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Card } from './'
import { Button } from '../../../components'

type Props = {
  data: any;
  subDomain?: string;
  step: number;
  handleStep: (step:number) => void;
  handleChangeChooseData: (step:number, chooseData:any) => void;
  repairWidgetData: any;
  caseKey: number;
}

const UsefulInfo = ({data, subDomain, step, handleStep, handleChangeChooseData, repairWidgetData, caseKey}: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database.js`)
  const iPhoneWhole = require(`../../../assets/${subDomain}/mock-data/repair-widget/device-model/iPhone-whole.png`)
  const themeCol = mainData.colorPalle.themeColor

  const [message, setMessage] = useState('')

  const ChooseNextStep = () => {
    handleChangeChooseData(8, message)
    handleStep(step+1)
  }

  useEffect(() => {
    setMessage(repairWidgetData.message)
  }, [repairWidgetData])

  const onKeyPress = useCallback((event) => {
    if(event.key === 'Enter' && step === 8) {
      ChooseNextStep();
    }
  }, [step, message]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, [step, message])

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
              <div className='useful-textarea-div'>
                <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder={data.placeholder} className='useful-textarea' />
              </div>
            </div>
            <div className='repair-card-button'>
              <Button 
                title='Next' bgcolor={themeCol} borderR='20px' width='120px' 
                height='30px' fontSize='17px' onClick={ChooseNextStep}
              />
              <p>or press ENTER</p>
            </div>
          </Card>          
        </Grid>
        <Grid item xs={12} md={5}>
          <Card className='repair-summary-card'>
            <div className='repair-choose-device-container'>
              <Typography className='topic-title'>Repair summary</Typography>
              <div className='repair-summary-content-div'>
                {repairWidgetData.chooseRepair && repairWidgetData.chooseRepair.map((item:any, index:number) => {
                  return (
                    <div key={index} className='repair-summary-div'>
                      <div className='repair-summary-img'><img src={iPhoneWhole.default} /></div>
                      <div>
                        <Typography className='repair-summary-title'>{repairWidgetData.deviceModel.name}</Typography>
                        <Typography className='repair-summary-service'>Repair Service:</Typography>
                        <p className='repair-summary-service-child'>{item.name}</p>
                      </div>
                    </div>
                  )
                })}
                <div className='repair-summary-div'>
                  <div>
                    <Typography className='repair-summary-title'>{repairWidgetData.deliveryMethod.method}</Typography>
                    {caseKey === 1 && <Typography className='repair-summary-service'>Pick Up From</Typography>}
                    {caseKey === 0 && <Typography className='repair-summary-service'>Send To</Typography>}
                    {caseKey > 0 && <p className='repair-summary-service-child'>{repairWidgetData.bookData[caseKey].address}</p>}
                    {caseKey === 0 && <p className='repair-summary-service-child' style={{marginBottom: '15px'}}>{repairWidgetData.bookData[caseKey].sendTo}</p>}
                    {caseKey === 0 && <Typography className='repair-summary-service'>Return To</Typography>}
                    {caseKey === 0 && <p className='repair-summary-service-child'>
                      {repairWidgetData.contactDetails.address1}
                    </p>}
                    {caseKey > 0 && <p className='repair-summary-service-child'>
                      {
                        repairWidgetData.bookData[caseKey].week + ', ' + 
                        repairWidgetData.bookData[caseKey].month + ' ' + 
                        repairWidgetData.bookData[caseKey].day + ', ' + 
                        repairWidgetData.bookData[caseKey].year + ' at ' + 
                        repairWidgetData.bookData[caseKey].time
                      }
                    </p>}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default UsefulInfo
