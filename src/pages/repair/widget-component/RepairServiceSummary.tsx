import React, {useEffect, useCallback} from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Card } from './'
import { Button } from '../../../components'
import { useT } from '../../../i18n/index'
import { FeatureToggles, Feature } from '@paralleldrive/react-feature-toggles'

type Props = {
  repairWidgetData: any;
  code: string;
  themeCol: string;
  step: number;
  handleStep: (step:number) => void;
  subDomain?: string;
  features: any[];
}


const RepairServiceSummary = ({repairWidgetData, code, step, handleStep, subDomain, features}: Props) => {

  const mockData = require(`../../../assets/${subDomain}/mock-data/mockData.js`);
  const mainData = require(`../../../assets/${subDomain}/Database.js`);
  const publicText = mockData.repairWidget.publicText;
  const textThemeCol = mainData.colorPalle.textThemeCol;

  const t = useT();

  const ChooseNextStep = () => {
    handleStep(step+1)
  }

  const onKeyPress = useCallback((event) => {
    if(event.key === 'Enter' && step === 9) {
      if (code === 'MI' && features.includes('FEATURE_REPAIR_QUOTE')) {
        handleStep(11);
      } else if (code !== 'MI' && features.includes('FEATURE_REPAIR_APPOINTMENT')) {
        ChooseNextStep();
      } else {
        return;
      }
    }
  }, [step, code]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, [step])

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Card className={subDomain + '-repair-service-summary-card'}>
        <div className={subDomain + '-repair-choose-device-container'}>
          <Typography className={subDomain + '-repair-service-summary-title'}>
            {t(publicText.repairServiceSummary)}
          </Typography>
          <Grid container className={subDomain + '-repair-service-summary-detail-container'} spacing={3}>
            <Grid item xs={12} sm={6} className={subDomain + '-every-container'}>
              <Typography className={subDomain + '-topic'}>{t(publicText.yourInfo)}</Typography>
              <Typography className={subDomain + '-details'}>
                {repairWidgetData.contactDetails.firstName + ' ' + repairWidgetData.contactDetails.lastName}
              </Typography>
              <Typography className={subDomain + '-details'}>{repairWidgetData.contactDetails.email}</Typography>
              <Typography className={subDomain + '-details'}>{repairWidgetData.contactDetails.phone}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={subDomain + '-every-container'}>
              <Typography className={subDomain + '-topic'}>{t(publicText.preferredContactMethod)}</Typography>
              <Typography className={subDomain + '-details'}>{t(repairWidgetData.receiveQuote.method)}</Typography>
            </Grid>
          </Grid>
          <Grid container className={subDomain + '-repair-service-summary-detail-container'} spacing={3}>
            <Grid item xs={12} sm={6} className={subDomain + '-every-container'}>
              <Typography className={subDomain + '-topic'}>{t(publicText.deliveryMethod)}</Typography>
              <Typography className={subDomain + '-details'} style={{color: textThemeCol}}>{t(repairWidgetData.deliveryMethod.method)}</Typography>
              {code === 'PU' && <Typography className={subDomain + '-details ' + subDomain + '-bolder'}>{t('PICK_UP_FROM')}</Typography>}
              {code === 'MI' && <Typography className={subDomain + '-details ' + subDomain + '-bolder'}>{t('SEND_TO')}</Typography>}
              {code !== 'MI' && <Typography className={subDomain + '-details'}>{repairWidgetData.bookData[code].address}</Typography>}
              {code === 'MI' && <Typography className={subDomain + '-details'}>{repairWidgetData.bookData[code].sendTo}</Typography>}
              {code === 'MI' && <Typography className={subDomain + '-details ' + subDomain + '-bolder'}>{t('RETURN_TO')}</Typography>}
              {code === 'MI' && <Typography className={subDomain + '-details'}>{repairWidgetData.contactDetails.address1}</Typography>}
              {code !== 'MI' && <Typography className={subDomain + '-details'}>
                {
                  repairWidgetData.bookData[code].week + ', ' + 
                  repairWidgetData.bookData[code].month + ' ' + 
                  repairWidgetData.bookData[code].day + ', ' + 
                  repairWidgetData.bookData[code].year + ' at ' + 
                  repairWidgetData.bookData[code].time
                }
              </Typography>}
            </Grid>
            {repairWidgetData.message && <Grid item xs={12} sm={6} className={subDomain + '-every-container'}>
              <Typography className={subDomain + '-topic'}>{t(publicText.message)}</Typography>
              <Typography className={subDomain + '-details'}>{repairWidgetData.message}</Typography>
            </Grid>}
          </Grid>
          <div className={subDomain + '-repair-service-summary-detail-container'}>
            <div className={subDomain + '-repair-service-summary-flex-container ' + subDomain + '-bordered'}>
              <Typography className={subDomain + '-topic'}>{t(publicText.device)}</Typography>
              <Typography className={subDomain + '-topic'}>{t(publicText.repairService)}</Typography>
            </div>
            {repairWidgetData.deviceBrand && repairWidgetData.deviceBrand.map((item:any, index:number) => {
              return (
                <React.Fragment key={index}>
                  {repairWidgetData.chooseRepair[index].map((chooseItem:any, chooseIndex:number) => {
                    return (
                      <div className={subDomain + '-repair-service-summary-flex-container'} key={chooseIndex}>
                        <Typography className={subDomain + '-details'}>
                          {item.name + ' ' + repairWidgetData.deviceModel[index].name}
                        </Typography>
                        <Typography className={subDomain + '-details'}>{t(chooseItem.name)}</Typography>
                      </div>
                    )
                  })}
                </React.Fragment>
              )
            })}
          </div>
          <div className={subDomain + '-repair-choose-device-container'}>            
            {code !== 'MI' && 
              <FeatureToggles features={features}>
                <Feature
                  name='FEATURE_REPAIR_APPOINTMENT'
                  inactiveComponent={()=><></>}
                  activeComponent={()=><Button 
                    title={publicText.scheduleAppointment} bgcolor={mainData.colorPalle.nextButtonCol} borderR='20px' maxWidth='400px' 
                    height='30px' fontSize='17px' margin='0 auto' onClick={ChooseNextStep} subDomain={subDomain}
                  />}
                />
              </FeatureToggles>
            }
            {code === 'MI' && 
              <FeatureToggles features={features}>
                <Feature
                  name='FEATURE_REPAIR_QUOTE'
                  inactiveComponent={()=><></>}
                  activeComponent={()=><Button 
                    title={publicText.requestQuote} bgcolor={mainData.colorPalle.nextButtonCol} borderR='20px' maxWidth='400px' 
                    height='30px' fontSize='17px' margin='0 auto' onClick={()=>handleStep(11)} subDomain={subDomain}
                  />}
                />
              </FeatureToggles>
            }
          </div>
        </div>
      </Card>
    </div>
  )
}

export default RepairServiceSummary
