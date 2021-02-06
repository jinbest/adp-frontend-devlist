import React, {useState, useEffect} from 'react'
import {Section1, Section2, Section3} from './'
import {Error} from '../error'
import { FeatureToggles, Feature } from '@paralleldrive/react-feature-toggles'

type Props = {
  subDomain: string;
  handleStatus: (status:boolean) => void;
  features: any[];
}

const Repair = ({subDomain, handleStatus, features}: Props) => {

  const [feats, setFeatures] = useState<any[]>([]);
  document.title = subDomain.charAt(0).toUpperCase() + subDomain.slice(1) + ' - Repair';

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
            <Section3 subDomain={subDomain} />
          </div>
        }
      />
    </FeatureToggles>
  )
}

export default Repair
