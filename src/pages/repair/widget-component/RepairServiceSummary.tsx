import React, {useEffect, useState, useCallback} from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Card } from './'
import { Button } from '../../../components'
import { useT } from '../../../i18n/index'
import { FeatureToggles, Feature } from '@paralleldrive/react-feature-toggles'
import { repairWidgetStore, storesDetails } from '../../../store'
import { repairWidgetAPI } from '../../../services'

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
  const [disableStatus, setDisableStatus] = useState(false);
  const t = useT();

  const handleSubmit = () => {
    setDisableStatus(true);
    const tp: string = (code === 'MAIL_IN') ? 'QUOTE' : 'APPOINTMENT';
    const apiData:any = {
      "store_id": storesDetails.store_id,
      "location_id": storesDetails.location_id,
      "customer_id": 1,
      "type": tp,
      "is_voided": storesDetails.is_voided,
      "delivery_method": repairWidgetStore.deliveryMethod.code,
      "customer_email": repairWidgetStore.contactDetails.email,
      "customer_first_name": repairWidgetStore.contactDetails.firstName,
      "customer_last_name": repairWidgetStore.contactDetails.lastName,
      "customer_phone": repairWidgetStore.contactDetails.phone,
      "customer_address_1": repairWidgetStore.contactDetails.address1,
      "customer_address_2": repairWidgetStore.contactDetails.address2,
      "customer_city": repairWidgetStore.contactDetails.city,
      "customer_state": repairWidgetStore.contactDetails.province,
      "customer_postcode": repairWidgetStore.contactDetails.postalCode,
      "customer_country": repairWidgetStore.contactDetails.country,
      "customer_note": null,
      "customer_contact_method": repairWidgetStore.receiveQuote.code,
      "repairs": [{
        "repair_id": 1,
        "product_id": 1,
        "cost": 20.00,
        "duration": '30 hours'
      }]
    }
    repairWidgetAPI
      .postAppointmentQuote(apiData)
      .then((res:any) => {
        console.log('api-repairWidgetAPI => Appointment and Quote:', res.data);
        if (code === 'MAIL_IN' && features.includes('FRONTEND_REPAIR_QUOTE')) {
          handleStep(11);
        } else if (code !== 'MAIL_IN' && features.includes('FRONTEND_REPAIR_APPOINTMENT')) {
          ChooseNextStep();
        } else {
          return;
        }
      })
      .catch((error) => {
        setDisableStatus(false);
        console.log("Error in post Appointment and Quote", error);
      });
  }

  const ChooseNextStep = () => {
    handleStep(step+1)
  }

  const onKeyPress = useCallback((event) => {
    if(event.key === 'Enter' && step === 9) {
      handleSubmit();
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
              {code === 'PICK_UP' && <Typography className={subDomain + '-details ' + subDomain + '-bolder'}>{t('PICK_UP_FROM')}</Typography>}
              {code === 'MAIL_IN' && <Typography className={subDomain + '-details ' + subDomain + '-bolder'}>{t('SEND_TO')}</Typography>}
              {code !== 'MAIL_IN' && <Typography className={subDomain + '-details'}>{repairWidgetData.bookData[code].address}</Typography>}
              {code === 'MAIL_IN' && <Typography className={subDomain + '-details'}>{repairWidgetData.bookData[code].sendTo}</Typography>}
              {code === 'MAIL_IN' && <Typography className={subDomain + '-details ' + subDomain + '-bolder'}>{t('RETURN_TO')}</Typography>}
              {code === 'MAIL_IN' && <Typography className={subDomain + '-details'}>{repairWidgetData.contactDetails.address1}</Typography>}
              {code !== 'MAIL_IN' && <Typography className={subDomain + '-details'}>
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
                          {repairWidgetData.deviceModel[index].name.toString().includes(item.name.toString()) ? 
                            repairWidgetData.deviceModel[index].name : 
                            item.name + ' ' + repairWidgetData.deviceModel[index].name}
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
            {code !== 'MAIL_IN' && 
              <FeatureToggles features={features}>
                <Feature
                  name='FRONTEND_REPAIR_APPOINTMENT'
                  inactiveComponent={()=><></>}
                  activeComponent={()=><Button 
                    title={publicText.scheduleAppointment} bgcolor={mainData.colorPalle.nextButtonCol} borderR='20px' maxWidth='400px' 
                    height='30px' fontSize='17px' margin='0 auto' onClick={handleSubmit} subDomain={subDomain} disable={disableStatus}
                  />}
                />
              </FeatureToggles>
            }
            {code === 'MAIL_IN' && 
              <FeatureToggles features={features}>
                <Feature
                  name='FRONTEND_REPAIR_QUOTE'
                  inactiveComponent={()=><></>}
                  activeComponent={()=><Button 
                    title={publicText.requestQuote} bgcolor={mainData.colorPalle.nextButtonCol} borderR='20px' maxWidth='400px' 
                    height='30px' fontSize='17px' margin='0 auto' onClick={handleSubmit} subDomain={subDomain} disable={disableStatus}
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
