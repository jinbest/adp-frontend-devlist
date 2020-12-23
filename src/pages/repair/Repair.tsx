import React from 'react'
import {Section1, Section2, Section3} from './'

/* eslint-disable */
type Props = {
  subDomain: string;
}

const Repair = ({subDomain}: Props) => {
  const SectionItemComponents = [Section1, Section2, Section3]
  return (
    <div>
      {SectionItemComponents.map((SectionItem, index:number) => {
        return (
          <SectionItem subDomain={subDomain} key={index}/>
        )
      })}
    </div>
  )
}

export default Repair
