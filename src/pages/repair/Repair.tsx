import React, {useState, useEffect} from 'react'
import {Section1, Section2, Section4} from './'
import {Error} from '../error'
import { FeatureToggles, Feature } from '@paralleldrive/react-feature-toggles'
import { storesDetails } from '../../store'

type Props = {
  subDomain: string;
  handleStatus: (status:boolean) => void;
  features: any[];
}

const Repair = ({subDomain, handleStatus, features}: Props) => {

  const [feats, setFeatures] = useState<any[]>([]);
  document.title = storesDetails.storesDetails.name + ' - Repair';

  useEffect(() => {
    const cntFeatures:any[] = [];
    for (let i = 0; i < features.length; i++) {
      if (features[i].isActive) {
        cntFeatures.push(features[i].flag);
      }
    }
    setFeatures(cntFeatures);
  }, [features]);

  return (
    <FeatureToggles features={feats}>
      <Feature
        name='FRONTEND_REPAIR'
        inactiveComponent={()=><Error />}
        activeComponent={()=>
          <div>
            <Section1 subDomain={subDomain} handleStatus={handleStatus} />
            <Section2 subDomain={subDomain} />
            {/* <Section3 subDomain={subDomain} /> */}
            <Section4 subDomain={subDomain} handleStatus={handleStatus} />
          </div>
        }
      />
    </FeatureToggles>
  )
}

export default Repair
