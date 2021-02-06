import React from 'react'
import {Shape, Section1, Section2, Section3, Section4, Section5, Section6} from './'

type Props = {
  subDomain: string;
  features: any[];
}

const Home = ({subDomain, features}: Props) => {
  const SectionItemComponents = [Section4, Section5, Section6];
  document.title = subDomain.charAt(0).toUpperCase() + subDomain.slice(1);
  
  return (
    <div>
      <Shape subDomain={subDomain} />
      <Section1 subDomain={subDomain} features={features} />
      <Section2 subDomain={subDomain} features={features} />
      <Section3 subDomain={subDomain} features={features} />
      {SectionItemComponents.map((SectionItem, index:number) => {
        return (
          <SectionItem subDomain={subDomain} key={index}/>
        )
      })}
    </div>
  )
}

export default Home
