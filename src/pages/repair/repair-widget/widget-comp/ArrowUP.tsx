import React from 'react'

type Props = {
  color?: string;
}

const ArrowUp = ({color}: Props) => {
  return (
    <svg width="12" height="6" viewBox="0 0 10 5" fill='none' xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path fillRule="evenodd" clipRule="evenodd" d="M0.209801 4.81646C0.276138 4.87464 0.354943 4.9208 0.441703 4.95229C0.528463 4.98379 0.621473 5 0.715405 5C0.809338 5 0.902348 4.98379 0.989108 4.95229C1.07587 4.9208 1.15467 4.87464 1.22101 4.81646L5.00019 1.50919L8.77936 4.81646C8.91346 4.93377 9.09533 4.99967 9.28497 4.99967C9.47461 4.99967 9.65648 4.93377 9.79057 4.81646C9.92467 4.69916 10 4.54006 10 4.37416C10 4.20827 9.92467 4.04917 9.79057 3.93186L5.50579 0.183536C5.43946 0.125358 5.36065 0.0791996 5.27389 0.0477056C5.18713 0.0162116 5.09412 8.4615e-07 5.00019 8.30547e-07C4.90625 8.14945e-07 4.81324 0.0162115 4.72648 0.0477055C4.63973 0.0791995 4.56092 0.125358 4.49458 0.183536L0.209801 3.93186C0.143297 3.98989 0.0905328 4.05883 0.0545314 4.13473C0.01853 4.21062 -7.92126e-07 4.29199 -8.07292e-07 4.37416C-8.22457e-07 4.45633 0.01853 4.5377 0.0545313 4.6136C0.0905327 4.68949 0.143297 4.75843 0.209801 4.81646Z" fill={color}/>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="10" height="5" fill="white" transform="translate(10 5) rotate(-180)"/>
        </clipPath>
      </defs>
    </svg>
  )
}

ArrowUp.defaultProps = {
  color: '#BDBFC3'
}

export default ArrowUp