import React from 'react'
import { useState } from 'react';
import { BsEyeFill, BsGraphUp, BsLayersFill, BsPeopleFill, BsArrowUp, BsArrowDown } from 'react-icons/bs';

function Stats() {
        
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <Card icon={<BsEyeFill />} title="$3.456K" subtitle="Total views" percentage="0.43%" />
          <Card icon={<BsGraphUp />} title="$45.2K" subtitle="Total Profit" percentage="4.35%" />
          <Card icon={<BsLayersFill />} title="2.450" subtitle="Total Product" percentage="2.59%" />
          <Card icon={<BsPeopleFill />} title="3.456" subtitle="Total Users" percentage="0.95%" />
        </div>
      );
    }
    
    function Card({ icon, title, subtitle, percentage, increase, onIncrease }) {
        const [currentPercentage, setCurrentPercentage] = useState(percentage);
      
        const handleIncrease = () => {
          const newPercentage = currentPercentage + 1;
          setCurrentPercentage(newPercentage);
          onIncrease(newPercentage);
        };
      
        const handleDecrease = () => {
          const newPercentage = currentPercentage - 1;
          setCurrentPercentage(newPercentage);
          onIncrease(newPercentage);
        };

        return (
            <div className="rounded-lg bg-white shadow-md p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-center rounded-full bg-gray-200 w-12 h-12 mb-4">
                {icon}
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{title}</h4>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm font-medium text-green-500">{currentPercentage}</span>
              <div className="flex items-center">
                  <BsArrowUp className="text-green-500" />
                  <BsArrowDown className="text-red-500" />
              </div>
            </div>
          </div>
        );
      }

export default Stats