import React from 'react'

type Props = {
  img: string;
  title: string;
  content: string;
  subDomain?: string;
}

const DeviceListComponent = ({img, title, content, subDomain}: Props) => {
  
  return (
    <div className={subDomain + '-device-list-component'}>
      <img src={img} />
      <p className={subDomain + '-title'}><b>{title}</b></p>
      <p className={subDomain + '-content'}>{content}</p>
    </div>
  )
}

DeviceListComponent.defaultProps = {
  img: '',
  title: 'Competitive Pricing',
  content: 'We’re proud to offer the largest selection of fully tested and graded pre-owned devices in Winnipeg. All backed by a one year warranty and lifetime IMEI guarantee',
  subDomain: 'geebo'
}

export default DeviceListComponent;
