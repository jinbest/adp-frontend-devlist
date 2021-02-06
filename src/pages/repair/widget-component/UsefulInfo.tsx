import React, {useState, useEffect, useCallback} from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Card } from './'
import { Button } from '../../../components'
import RepairSummary from './RepairSummary'
import { useT } from '../../../i18n/index'

type Props = {
  data: any;
  subDomain?: string;
  step: number;
  handleStep: (step:number) => void;
  handleChangeChooseData: (step:number, chooseData:any) => void;
  repairWidgetData: any;
}

const UsefulInfo = ({data, subDomain, step, handleStep, handleChangeChooseData, repairWidgetData}: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database.js`);
  const mockData = require(`../../../assets/${subDomain}/mock-data/mockData.js`);
  const themeCol = mainData.colorPalle.themeColor;
  const publicText = mockData.repairWidget.publicText;

  const [message, setMessage] = useState('');
  const t = useT();

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
          <Typography className={subDomain + "-repair-widget-title"}>
            {t(data.title)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className='' spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <div className={subDomain + '-repair-choose-device-container'}>
              <div className={subDomain + '-useful-textarea-div'}>
                <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder={t(data.placeholder)} className={subDomain + '-useful-textarea'} />
              </div>
            </div>
            <div className={subDomain + '-repair-card-button'}>
              <Button 
                title={t(publicText.next)} bgcolor={mainData.colorPalle.nextButtonCol} borderR='20px' width='120px' 
                height='30px' fontSize='17px' onClick={ChooseNextStep} subDomain={subDomain}
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
              showInfo={true}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default UsefulInfo
