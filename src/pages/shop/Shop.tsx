import React, {useState, useEffect} from 'react'
import {Error} from '../error'
import { FeatureToggles, Feature } from '@paralleldrive/react-feature-toggles'
import {Shape, ProductList} from './'

type Props = {
  subDomain: string;
  handleStatus: (status:boolean) => void;
  features: any[];
}

const Shop = ({subDomain, handleStatus, features}: Props) => {

  const [feats, setFeatures] = useState<any[]>([]);  

  useEffect(() => {
    handleStatus(true);
  }, [])

  useEffect(() => {
    const cntFeatures:any[] = [];
    for (let i = 0; i < features.length; i++) {
      if (features[i].isActive) {
        cntFeatures.push(features[i].flag);
      }
    }
    setFeatures(cntFeatures);
  }, [features]);

  console.log(subDomain);

  return (
    <FeatureToggles features={feats}>
      <Feature
        name='FRONTEND_BUY'
        inactiveComponent={()=><Error />}
        activeComponent={()=>
          <div className={subDomain + '-shop-main-page'}>
            <Shape subDomain={subDomain} />
            <section className={subDomain + '-Container'}>
              <div style={{display: 'flex'}}>
                <div style={{width: '20%'}}>
                  filter
                </div>
                <div style={{width: '80%'}}>
                  <ProductList subDomain={subDomain} />
                </div>
              </div>
            </section>
          </div>
        }
      />
    </FeatureToggles>
  )
}

export default Shop
