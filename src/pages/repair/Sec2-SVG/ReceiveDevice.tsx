import React from 'react'

type Props = {
  color?: string;
}

const ReceiveDevice = ({color}: Props) => {
  return (
    <svg viewBox="0 0 96 154" fill="none" xmlns="http://www.w3.org/2000/svg" className='repair-section2-receive-device'>
      <g clipPath="url(#clip0)">
        <path fillRule="evenodd" clipRule="evenodd" d="M70.6143 82.1485C79.3752 86.2057 83.5557 96.4981 84.4359 106.261C85.2568 115.368 81.6948 124.438 74.978 130.554C68.9242 136.066 60.4591 135.403 52.3528 135.475C42.7619 135.56 31.7048 138.301 25.3823 130.995C18.559 123.111 18.1495 110.635 22.6214 101.119C26.5747 92.7072 36.941 91.5988 45.4831 88.2223C53.9312 84.8829 62.3927 78.3411 70.6143 82.1485Z" fill={color}/>
        <path d="M50.2315 109.974H28.022C27.85 109.979 27.6866 110.051 27.5667 110.177C27.4467 110.302 27.3796 110.47 27.3796 110.645C27.3796 110.819 27.4467 110.987 27.5667 111.112C27.6866 111.238 27.85 111.311 28.022 111.315H50.2315C50.3198 111.318 50.4078 111.303 50.4902 111.27C50.5725 111.237 50.6476 111.188 50.711 111.126C50.7744 111.063 50.8248 110.988 50.8592 110.906C50.8936 110.823 50.9113 110.734 50.9113 110.645C50.9113 110.555 50.8936 110.466 50.8592 110.383C50.8248 110.301 50.7744 110.226 50.711 110.163C50.6476 110.101 50.5725 110.052 50.4902 110.019C50.4078 109.987 50.3198 109.971 50.2315 109.974Z" fill="black"/>
        <path d="M61.3022 14.8914H16.9514C15.1785 14.8914 13.7412 16.6513 13.7412 18.8217V115.345C13.7412 117.516 15.1796 119.276 16.9514 119.276H61.3022C63.0751 119.276 64.5129 117.516 64.5129 115.345V18.8217C64.5129 16.6513 63.0751 14.8914 61.3022 14.8914ZM62.8231 115.345C62.8231 116.373 62.1418 117.207 61.3022 117.207H16.9514C16.1119 117.207 15.431 116.373 15.431 115.345V18.8217C15.431 17.7941 16.1119 16.9601 16.9514 16.9601H23.7507C24.0921 18.1007 24.9791 18.8596 25.9721 18.8596H52.2831C53.2756 18.8596 54.1625 18.1024 54.504 16.9601H61.3022C62.1418 16.9601 62.8231 17.7935 62.8231 18.8217V115.345Z" fill="black"/>
        <path d="M76.634 30.4396L72.1911 24.8899L65.5011 22.6508L70.9674 18.1402L73.1729 11.3477L77.6159 16.8973L84.3059 19.1369L78.8395 23.6476L76.634 30.4396ZM66.5932 22.4453L72.5065 24.4248L76.4337 29.3298L78.383 23.3263L83.2148 19.3398L77.3016 17.3603L73.3743 12.4553L71.425 18.4587L66.5932 22.4453Z" fill="black"/>
        <path d="M66.9864 11.9527L64.205 8.47887L60.0172 7.07753L63.4395 4.25377L64.8198 0L67.6011 3.47387L71.7889 4.87574L68.3672 7.69897L66.9864 11.9527ZM61.1093 6.87363L64.5188 8.01482L66.7839 10.8445L67.9085 7.38311L70.6952 5.08343L67.2858 3.9417L65.0206 1.10874L63.8965 4.57016L61.1093 6.87363Z" fill="black"/>
        <path d="M51.976 38.1839L49.1935 34.7106L45.0057 33.3087L48.4275 30.485L49.8094 26.2312L52.5907 29.7056L56.7785 31.1069L53.3568 33.9329L51.976 38.1839ZM46.0989 33.1048L49.5084 34.2466L51.7735 37.0757L52.8981 33.6143L55.6864 31.3152L52.277 30.174L50.0113 27.3443L48.8872 30.8057L46.0989 33.1048Z" fill="black"/>
        <path d="M17.2392 137.754L12.8437 132.166L6.17285 129.868L11.6775 125.406L13.9406 118.633L18.3361 124.221L25.0075 126.517L19.5033 130.98L17.2392 137.754ZM7.26761 129.672L13.1639 131.703L17.049 136.642L19.0494 130.656L23.9143 126.712L18.0181 124.681L14.1318 119.743L12.1314 125.727L7.26761 129.672Z" fill="black"/>
        <path d="M7.74701 119.18L4.99493 115.682L0.821533 114.244L4.26723 111.45L5.68375 107.211L8.4353 110.712L12.6108 112.15L9.16567 114.943L7.74701 119.18ZM1.91523 114.05L5.31617 115.221L7.55736 118.07L8.71125 114.617L11.5177 112.342L8.11619 111.171L5.87554 108.322L4.72164 111.774L1.91523 114.05Z" fill="black"/>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="95" height="154" fill="white" transform="translate(0.821533)"/>
        </clipPath>
      </defs>
    </svg>
  )
}

ReceiveDevice.defaultProps = {
  color: '#BDBFC3'
}

export default ReceiveDevice