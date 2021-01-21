import React from 'react';
import Rating from '@material-ui/lab/Rating';

type Props = {
  score: number;
  days: string;
  content: string;
  reviewer: string;
  subDomain?: string;
}

const CardWhyCustomer = ({score, days, content, reviewer, subDomain}: Props) => {
  
  return (
    <div className={subDomain + '-card-why-customer'}>
      <div className={subDomain + '-score-div'}>
        <div className={subDomain + '-rating'}>
          <Rating name="read-only" value={score} max={score} readOnly />
        </div>
        <p>{days}</p>
      </div>
      <p className={subDomain + '-content'}>{content}</p>
      <p className={subDomain + '-reviewer'}>{reviewer}</p>
    </div>
  )
}

CardWhyCustomer.defaultProps = {
  score: 5,
  days: '3 days ago',
  content: 'This was by far the easiest way to sell your old cell phone. Simple fast and got a very good price for my phone.',
  reviewer: 'Philip Sizemore',
  subDomain: 'geebo'
}

export default CardWhyCustomer;
