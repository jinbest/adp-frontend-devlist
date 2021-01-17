import React from 'react'

type Props = {
  children?: any;
  className?: string;
  height?: string;
}

const Card = ({children, className, height}: Props) => {  
  return (
    <div className={'repair-widget-card ' + className} style={{height: height}}>
      {children}
    </div>
  )
}

export default Card;
