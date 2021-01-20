import React, {useEffect, useCallback} from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Card } from './'
import { Button } from '../../../components'
import { useT } from '../../../i18n/index'
import { FeatureToggles, Feature } from '@paralleldrive/react-feature-toggles'

type Props = {
  repairWidgetData: any;
  caseKey: number;
  themeCol: string;
  step: number;
  handleStep: (step:number) => void;
  subDomain?: string;
  features: any[];
}


const RepairServiceSummary = ({repairWidgetData, caseKey, step, handleStep, subDomain, features}: Props) => {

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
      if (caseKey === 0 && features.includes('FEATURE_REPAIR_QUOTE')) {
        handleStep(11);
      } else if (caseKey > 0 && features.includes('FEATURE_REPAIR_APPOINTMENT')) {
        ChooseNextStep();
      } else {
        return;
      }
    }
  }, [step, caseKey]);

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
              {caseKey === 1 && <Typography className={subDomain + '-details ' + subDomain + '-bolder'}>{t('PICK_UP_FROM')}</Typography>}
              {caseKey === 0 && <Typography className={subDomain + '-details ' + subDomain + '-bolder'}>{t('SEND_TO')}</Typography>}
              {caseKey > 0 && <Typography className={subDomain + '-details'}>{repairWidgetData.bookData[caseKey].address}</Typography>}
              {caseKey === 0 && <Typography className={subDomain + '-details'}>{repairWidgetData.bookData[caseKey].sendTo}</Typography>}
              {caseKey === 0 && <Typography className={subDomain + '-details ' + subDomain + '-bolder'}>{t('RETURN_TO')}</Typography>}
              {caseKey === 0 && <Typography className={subDomain + '-details'}>{repairWidgetData.contactDetails.address1}</Typography>}
              {caseKey > 0 && <Typography className={subDomain + '-details'}>
                {
                  repairWidgetData.bookData[caseKey].week + ', ' + 
                  repairWidgetData.bookData[caseKey].month + ' ' + 
                  repairWidgetData.bookData[caseKey].day + ', ' + 
                  repairWidgetData.bookData[caseKey].year + ' at ' + 
                  repairWidgetData.bookData[caseKey].time
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
            {caseKey > 0 && 
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
            {caseKey === 0 && 
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
