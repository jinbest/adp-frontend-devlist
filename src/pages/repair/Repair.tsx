import React from 'react'
import {Section1, Section2, Section3} from './'

/* eslint-disable */
type Props = {
  subDomain: string;
}

const Repair = ({subDomain}: Props) => {
  return (
    <div>
      <Section1 subDomain={subDomain} />
      <Section2 subDomain={subDomain} />
      <Section3 subDomain={subDomain} />
    </div>
  )
}

export default Repair
