import React from 'react'
import {Section1, Section2, Section3} from './'

type Props = {
  subDomain: string;
  handleStatus: (status:boolean) => void;
}

const Repair = ({subDomain, handleStatus}: Props) => {
  return (
    <div>
      <Section1 subDomain={subDomain} handleStatus={handleStatus} />
      <Section2 subDomain={subDomain} />
      <Section3 subDomain={subDomain} />
    </div>
  )
}

export default Repair
