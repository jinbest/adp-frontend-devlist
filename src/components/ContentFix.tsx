import React from 'react'

/* eslint-disable */
type Props = {
  title: string;
  content: string;
}

const ContentFix = ({title, content}: Props) => {
  
  return (
    <div className='content-fix'>
      <p className='title'>{title}</p>
      <hr className='horzon-line' />
      <p className='content'>{content}</p>
    </div>
  )
}

ContentFix.defaultProps = {
  title: 'FREE DIAGNOSTICS',
  content: 'We believe in a transparent repqir process. If you\'re not sure what\'s wrong with your device, we\'ll diagnose it for free.',
}

export default ContentFix;
