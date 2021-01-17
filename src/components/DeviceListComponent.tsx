import React from 'react'

type Props = {
  img: string;
  title: string;
  content: string;
}

const DeviceListComponent = ({img, title, content}: Props) => {
  
  return (
    <div className='device-list-component'>
      <img src={img} />
      <p className='title'><b>{title}</b></p>
      <p className='content'>{content}</p>
    </div>
  )
}

DeviceListComponent.defaultProps = {
  img: '',
  title: 'Best offer available',
  content: 'Selected by our price-quality algorithm'
}

export default DeviceListComponent;
