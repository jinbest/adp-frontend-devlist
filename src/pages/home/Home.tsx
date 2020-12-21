import React from 'react'
import {Shape, Section1, Section2, Section3, Section4, Section5, Section6} from './'

/* eslint-disable */
type Props = {
  subDomain: string;
}

const Home = ({subDomain}: Props) => {
  const SectionItemComponents = [Section1, Section2, Section3, Section4, Section5, Section6]
  
  return (
    <div>
      <Shape subDomain={subDomain} />
      {SectionItemComponents.map((SectionItem, index:number) => {
        return (
          <SectionItem subDomain={subDomain} key={index}/>
        )
      })}
    </div>
  )
}

export default Home
