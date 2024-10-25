import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import Collapse from '../images/main/collapse.png';
import Dots from '../images/main/dots.png';
import Up from '../images/main/up.png';
import Down from '../images/main/down.png';

const HeroShortBlock = () => {

  const [formData, setFormData] = useState({
    task1: false,
    task2: false,
    task3: false,
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    }); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission or other logic here
    console.log('Form submitted:', formData);
  };

  return (
    <>

      {/* <!-- ====== Calendar Section Start ====== --> */}
      <div className='heroSecBlock'>
              <div className='prioritySec'>
                <span>HIGH PRIORITY</span>
                <img src={Dots}/>
              </div>
              <h5>Hero section</h5>
              <div className='checklistSec'>
                <div className='checkHeading'>
                  <span>Checklist</span> <span>(0/3)</span>
                </div>
                <img src={Up} />
              </div>
              <div className='checklistFooter'>
                <div className='check-date'>
                  <button>Feb 10th</button>
                </div>
                <div className='checkProgress'>
                  <button>PsROGRESS</button>
                  <button>TO-DO</button>
                  <button>DONE</button>
                </div>
              </div>
          </div>
      {/* <!-- ====== Calendar Section End ====== --> */}
    </>
  );
};

export default HeroShortBlock;
