import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Card } from './'
import { InputComponent, Button, PhoneInput } from '../../../components'

type Props = {
  data: any;
  subDomain?: string;
  step: number;
  handleStep: (step:number) => void;
}

const ContactDetails = ({data, subDomain, step, handleStep}: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database.js`)
  const themeCol = mainData.colorPalle.themeColor

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
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputComponent placeholder={data.placeholder.firstName} />
                </Grid>
                <Grid item xs={6}>
                  <InputComponent placeholder={data.placeholder.lastName} />
                </Grid>
                <Grid item xs={12}>
                  <InputComponent placeholder={data.placeholder.emailAdd} />
                </Grid>
                <Grid item xs={12}>
                  <PhoneInput placeholder={data.placeholder.phoneNum} />
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

export default ContactDetails
