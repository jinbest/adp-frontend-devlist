import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Card } from './'
import { InputComponent, Button } from '../../../components'

type Props = {
  subDomain?: string;
  step: number;
  handleStep: (step:number) => void;
}

const ContactDetails = ({subDomain, step, handleStep}: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database.js`)
  const themeCol = mainData.colorPalle.themeColor

  const ChooseNextStep = () => {
    handleStep(step+1)
  }

  return (
    <div>
      <Grid container className='' spacing={3}>
        <Grid item xs={12} md={7}>
          <Typography className="repair-widget-title">
            Please Enter Your Contact Details
          </Typography>
        </Grid>
      </Grid>
      <Grid container className='' spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <div className='repair-choose-device-container'>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputComponent placeholder='First Name*' />
                </Grid>
                <Grid item xs={6}>
                  <InputComponent placeholder='Last Name*' />
                </Grid>
                <Grid item xs={12}>
                  <InputComponent placeholder='E-mail Address*' />
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
            
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default ContactDetails
