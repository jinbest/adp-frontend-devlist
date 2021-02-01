import React, {useState, useEffect, useCallback} from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Card } from './'
import { InputComponent, Button, PhoneInput } from '../../../components'
import RepairSummary from './RepairSummary'
import { useT } from '../../../i18n/index'
import { FeatureToggles, Feature } from '@paralleldrive/react-feature-toggles'
import { repairWidgetStore, storesDetails } from '../../../store'
import { repairWidgetAPI } from '../../../services'

type Props = {
  data: any;
  subDomain?: string;
  step: number;
  handleStep: (step:number) => void;
  handleChangeChooseData: (step:number, chooseData:any) => void;
  repairWidgetData: any;
  code: string;
  features: any[];
}

const ContactDetails = ({data, subDomain, step, handleStep, handleChangeChooseData, repairWidgetData, features, code}: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database.js`);
  const mockData = require(`../../../assets/${subDomain}/mock-data/mockData.js`);
  const themeCol = mainData.colorPalle.themeColor;
  const publicText = mockData.repairWidget.publicText;

  const t = useT();

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address1, setStreetAddress1] = useState('')
  const [address2, setStreetAddress2] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [disableStatus, setDisableStatus] = useState(true);

  useEffect(() => {
    setFirstName(repairWidgetData.contactDetails.firstName);
    setLastName(repairWidgetData.contactDetails.lastName);
    setEmail(repairWidgetData.contactDetails.email);
    setPhone(repairWidgetData.contactDetails.phone);
    setStreetAddress1(repairWidgetData.contactDetails.address1);
    setStreetAddress2(repairWidgetData.contactDetails.address2);
    setCountry(repairWidgetData.contactDetails.country);
    setCity(repairWidgetData.contactDetails.city);
    setProvince(repairWidgetData.contactDetails.province);
    setPostalCode(repairWidgetData.contactDetails.postalCode);
  }, [repairWidgetData, step]);

  const handleButton = (param: string) => {   
    setDisableStatus(true); 
    const tp: string = (param === 'appointment') ? 'APPOINTMENT' : 'QUOTE';
    const repairs: any[] = [];
    let repair_id = 1;
    for (let i = 0; i < repairWidgetStore.deviceCounter; i++) {
      for (let j = 0; j < repairWidgetStore.chooseRepair[i].length; j++) {
        repairs.push({
          "repair_id": repair_id,
          "product_id": repairWidgetStore.deviceModel[i].id,
          "cost": repairWidgetStore.chooseRepair[i][j].cost,
          "duration": repairWidgetStore.chooseRepair[i][j].estimate,
          "product_name": repairWidgetStore.deviceBrand[i].name + ',' + repairWidgetStore.deviceModel[i].name,
          "repair_name": repairWidgetStore.chooseRepair[i][j].name
        });
        repair_id += 1;
      }      
    }
    const apiData:any = {
      "store_id": storesDetails.store_id,
      "location_id": storesDetails.location_id,
      "customer_id": 1,
      "type": tp,
      "is_voided": storesDetails.is_voided,
      "delivery_method": repairWidgetStore.deliveryMethod.code,
      "customer_email": email,
      "customer_first_name": firstName,
      "customer_last_name": lastName,
      "customer_phone": phone,
      "customer_address_1": address1,
      "customer_address_2": address2,
      "customer_city": city,
      "customer_state": province,
      "customer_postcode": postalCode,
      "customer_country": country,
      "customer_note": null,
      "customer_contact_method": repairWidgetStore.receiveQuote.code,
      "repairs": repairs
    }
    repairWidgetAPI
      .postAppointmentQuote(apiData)
      .then((res:any) => {
        console.log('api-repairWidgetAPI => Appointment and Quote:', res.data);
        handleChangeChooseData(6, { 
          firstName: firstName, 
          lastName: lastName, 
          email: email, 
          phone: phone,
          address1: address1,
          address2: address2,
          country: country,
          city: city,
          province: province,
          postalCode: postalCode
        });
        storesDetails.changeType(tp);
        if (param === 'appointment') {
          handleStep(step+1);
        } else {
          handleStep(11);
        }
      })
      .catch((error) => {
        setDisableStatus(false);
        console.log("Error in post Appointment and Quote", error);
      });
  }

  const onKeyPress = useCallback((event) => {
    if(event.key === 'Enter' && !disableStatus && step === 6) {
      if (features.includes('FRONTEND_REPAIR_APPOINTMENT') || code === 'MAIL_IN') {
        handleButton('appointment');
      } else if (features.includes('FRONTEND_REPAIR_QUOTE')) {
        handleButton('quote');
      }      
    }
  }, [step, firstName, lastName, email, phone, address1, address2, country, city, province, postalCode, disableStatus]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, [step, firstName, lastName, email, phone, address1, address2, country, city, province, postalCode, disableStatus]);

  useEffect(() => {
    setDisableStatus(true);
    if ( firstName && lastName && email && phone && ((code === 'MAIL_IN' && address1) || (code !== 'MAIL_IN')) ) {
      setDisableStatus(false)
    }
  }, [firstName, lastName, email, phone, address1, code]);

  const handleChangeFirstName = (val:string) => {
    setFirstName(val);
  }

  const handleChangeLastName = (val:string) => {
    setLastName(val);
  }

  const handleChangeEmail = (val:string) => {
    setEmail(val);
  }

  const handleChangeAddress1 = (val:string) => {
    setStreetAddress1(val);
  }

  const handleChangeAddress2 = (val:string) => {
    setStreetAddress2(val);
  }

  const handleChangeCountry = (val:string) => {
    setCountry(val);
  }

  const handleChangeCity = (val:string) => {
    setCity(val);
  }

  const handleChangeProvince = (val:string) => {
    setProvince(val);
  }

  const handleChangePostalCode = (val:string) => {
    setPostalCode(val);
  }

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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputComponent value={firstName} placeholder={t(data.placeholder.firstName)} handleChange={(e)=>{handleChangeFirstName(e.target.value)}} subDomain={subDomain} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputComponent value={lastName} placeholder={t(data.placeholder.lastName)} handleChange={(e)=>{handleChangeLastName(e.target.value)}} subDomain={subDomain} />
                </Grid>
                <Grid item xs={12}>
                  <InputComponent value={email} placeholder={t(data.placeholder.emailAdd)} handleChange={(e)=>{handleChangeEmail(e.target.value)}} subDomain={subDomain} />
                </Grid>
                <Grid item xs={12}>
                  <PhoneInput handleSetPhone={setPhone} val={phone} placeholder={t(data.placeholder.phoneNum)} />
                </Grid>
              </Grid>
            </div>
            {code !== 'MAIL_IN' && <div className={subDomain + '-repair-choose-device-container'}>
              <FeatureToggles features={features}>
                <Feature
                  name='FRONTEND_REPAIR_APPOINTMENT'
                  inactiveComponent={()=><></>}
                  activeComponent={()=><Button 
                    title={'BOOK_AN_APPOINTMENT'} bgcolor={mainData.colorPalle.nextButtonCol} borderR='20px' maxWidth='300px' 
                    height='30px' fontSize='17px' margin='0 auto 10px' onClick={()=>handleButton('appointment')} disable={disableStatus} subDomain={subDomain}
                  />}
                />
              </FeatureToggles>
              <FeatureToggles features={features}>
                <Feature
                  name='FRONTEND_REPAIR_QUOTE'
                  inactiveComponent={()=><></>}
                  activeComponent={()=><Button 
                    title={'REQUEST_A_QUOTE'} bgcolor={mainData.colorPalle.nextButtonCol} borderR='20px' maxWidth='300px' 
                    height='30px' fontSize='17px' margin='0 auto' onClick={()=>handleButton('quote')} disable={disableStatus} subDomain={subDomain}
                  />}
                />
              </FeatureToggles>              
            </div>}
            {code === 'MAIL_IN' && <div className={subDomain + '-repair-choose-device-container'}>
              <Grid container spacing={2}>                
                <Grid item xs={12}>
                  <InputComponent value={address1} placeholder={t(data.placeholder.address1)} handleChange={(e)=>{handleChangeAddress1(e.target.value)}} subDomain={subDomain} />
                </Grid>
                <Grid item xs={12}>
                <InputComponent value={address2} placeholder={t(data.placeholder.address2)} handleChange={(e)=>{handleChangeAddress2(e.target.value)}} subDomain={subDomain} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputComponent value={country} placeholder={t(data.placeholder.country)} handleChange={(e)=>{handleChangeCountry(e.target.value)}} subDomain={subDomain} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputComponent value={city} placeholder={t(data.placeholder.city)} handleChange={(e)=>{handleChangeCity(e.target.value)}} subDomain={subDomain} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputComponent value={province} placeholder={t(data.placeholder.province)} handleChange={(e)=>handleChangeProvince(e.target.value)} subDomain={subDomain} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputComponent value={postalCode} placeholder={t(data.placeholder.postalCode)} handleChange={(e)=>{handleChangePostalCode(e.target.value)}} subDomain={subDomain} />
                </Grid>
              </Grid>
            </div>}
            {code === 'MAIL_IN' && <div className={subDomain + '-repair-card-button'}>
              <Button 
                title={publicText.next} bgcolor={mainData.colorPalle.nextButtonCol} borderR='20px' width='120px' 
                height='30px' fontSize='17px' onClick={()=>handleButton('appointment')} disable={disableStatus} subDomain={subDomain}
              />
              <p>{t(publicText.enterKey)}</p>
            </div>}
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

export default ContactDetails
