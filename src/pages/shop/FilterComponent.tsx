import React,  {useState} from "react";
import { CustomCheckBox, CustomSlider, ColorSelector, TabButton } from './';

type Props = {
  subDomain?: string;
}

const FilterComponent = ({subDomain}:Props) => {
  const mockData = require(`../../assets/${subDomain}/mock-data/mockData`);
  const mainCol = mockData.shopPageData.shopEachItem.color;

  const [swit, setSwit] = useState(false);

  return (
    <div className={`${subDomain}-filter-component`}>

      <p className="content-title">Apply Trade-In Value</p>
      <label className="switch">
        <input type="checkbox" checked={swit} onChange={()=>{setSwit(!swit)}} />
        <span className="slider round"></span>
      </label>

      <p className="content-title">Product Condition</p>
      <CustomCheckBox subDomain={subDomain} options={['New', 'Mint', 'Good', 'Fair']} />

      <p className="content-title">Brand</p>
      <CustomCheckBox subDomain={subDomain} options={['Apple', 'Samsung', 'Google', 'LG', 'OnePlus', 'Essential']} />

      <p className="content-title">Colors</p>
      <ColorSelector />

      <p className="content-title">Storage</p>
      <div style={{display: 'flex', flexWrap: 'wrap', width: '200px'}}>
        <TabButton col={mainCol} title={'32 GB'} />
        <TabButton col={mainCol} title={'64 GB'} />
        <TabButton col={mainCol} title={'128 GB'} />
        <TabButton col={mainCol} title={'256 GB'} />
        <TabButton col={mainCol} title={'512 GB'} />
      </div>

      <p className="content-title">Product Type</p>
      <CustomCheckBox subDomain={subDomain} options={['Phone', 'Tablet', 'Computer', 'Accessories']} />

      <p className="content-title">Availability</p>
      <CustomCheckBox subDomain={subDomain} options={['Online', 'In-Store']} />

      <div style={{padding: '10px 20px'}}>
        <CustomCheckBox subDomain={subDomain} options={['71 Greenford Avenue', '123 Main Street']} />
        <div style={{padding: '10px 0'}}>
          <a href="#" style={{color: mainCol}}>Set my Location</a>
        </div>
      </div>

      <p className="content-title">Price</p>
      <CustomSlider col={mainCol} />

    </div>
  )
}

export default FilterComponent