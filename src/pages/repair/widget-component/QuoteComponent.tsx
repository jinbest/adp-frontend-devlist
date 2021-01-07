import React from 'react'
import { Typography } from '@material-ui/core'
import { Card } from '.'

type Props = {
  data: any;
  subDomain?: string;
  quoteKey: number;
  repairWidgetData: any;
}


const QuoteComponent = ({data, quoteKey, repairWidgetData}: Props) => {

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Card className='repair-service-summary-card'>
        <div className='quote-container'>
          <div className='quote-image'>
            <img src={data[quoteKey].img} alt='quote-img' />
          </div>
          <Typography className='repair-service-summary-title'>
            {data[quoteKey].title}
          </Typography>
          <Typography className='quote-component-content'>
            You will receive an <b>email</b> at <b>{repairWidgetData.contactDetails.email}</b> shortly, {data[quoteKey].text}
          </Typography>
        </div>
      </Card>
    </div>
  )
}

export default QuoteComponent
