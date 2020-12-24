import React from 'react'

/* eslint-disable */
type Props = {
  children?: any;
  className?: string;
}

const Card = ({children, className}: Props) => {  
  return (
    <div className={'repair-widget-card ' + className}>
      {children}
    </div>
  )
}

export default Card;
