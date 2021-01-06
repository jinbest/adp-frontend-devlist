import React, {useState, useEffect} from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Card } from './'
import { InputComponent, Button, PhoneInput } from '../../../components'

type Props = {
  data: any;
  subDomain?: string;
  step: number;
  handleStep: (step:number) => void;
  handleChangeChooseData: (step:number, chooseData:any) => void;
  repairWidgetData: any;
}

const ContactDetails = ({data, subDomain, step, handleStep, handleChangeChooseData, repairWidgetData}: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database.js`)
  const iPhoneWhole = require(`../../../assets/${subDomain}/mock-data/repair-widget/device-model/iPhone-whole.png`)
  const themeCol = mainData.colorPalle.themeColor

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    setFirstName(repairWidgetData.contactDetails.firstName);
    setLastName(repairWidgetData.contactDetails.lastName);
    setEmail(repairWidgetData.contactDetails.email);
    setPhone(repairWidgetData.contactDetails.phone);
  }, [repairWidgetData, step])

  const ChooseNextStep = () => {
    handleChangeChooseData(6, { firstName: firstName, lastName: lastName, email: email, phone: phone })
    handleStep(step+1)
  }

  const handleChangeFirstName = (val:string) => {
    setFirstName(val)
  }

  const handleChangeLastName = (val:string) => {
    setLastName(val)
  }

  const handleChangeEmail = (val:string) => {
    setEmail(val)
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputComponent value={firstName} placeholder={data.placeholder.firstName} handleChange={(e)=>{handleChangeFirstName(e.target.value)}} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputComponent value={lastName} placeholder={data.placeholder.lastName} handleChange={(e)=>{handleChangeLastName(e.target.value)}} />
                </Grid>
                <Grid item xs={12}>
                  <InputComponent value={email} placeholder={data.placeholder.emailAdd} handleChange={(e)=>{handleChangeEmail(e.target.value)}} />
                </Grid>
                <Grid item xs={12}>
                  <PhoneInput handleSetPhone={setPhone} val={phone} placeholder={data.placeholder.phoneNum} />
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
          <Card className='repair-summary-card'>
            <div className='repair-choose-device-container'>
              <Typography className='topic-title'>Repair summary</Typography>
              <div className='repair-summary-content-div'>
                {/* {data.mainTopic.content && data.mainTopic.content.map((item:any, index:number) => {
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
                })} */}
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
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default ContactDetails
