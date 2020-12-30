import React from 'react'
import { Typography } from '@material-ui/core'
import { Card } from './'


const ThankyouMobile = () => {

  return (
    <div style={{width: '70%', margin: 'auto'}}>
      <Card>
        <div className='repair-choose-device-container'>
          <Typography style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bold', marginBottom: '5px'}}>
            Thank you for choosing Mobile Tech Lab for your repair!
          </Typography>
          <Typography style={{textAlign: 'center', fontSize: '18px', fontWeight: 'normal'}}>
            You will receive an email at devicelist@outlook.com shortly, with a detailed service quote.
          </Typography>
        </div>
      </Card>
    </div>
  )
}

export default ThankyouMobile
