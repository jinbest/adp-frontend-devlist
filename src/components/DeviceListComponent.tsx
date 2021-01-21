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
  title: 'Best offer available',
  content: 'Selected by our price-quality algorithm',
  subDomain: 'geebo'
}

export default DeviceListComponent;
