import React from 'react'

type Props = {
  title: string;
  content: string;
  themeCol?: string;
  subDomain?: string;
}

const ContentFix = ({title, content, themeCol, subDomain}: Props) => {
  
  return (
    <div className={subDomain + '-content-fix'}>
      <p className={subDomain + '-title'}>{title}</p>
      <hr className={subDomain + '-horzon-line'} style={{borderColor: themeCol}} />
      <p className={subDomain + '-content'}>{content}</p>
    </div>
  )
}

ContentFix.defaultProps = {
  title: 'FREE DIAGNOSTICS',
  content: 'We believe in a transparent repqir process. If you\'re not sure what\'s wrong with your device, we\'ll diagnose it for free.',
}

export default ContentFix;
