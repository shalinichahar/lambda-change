import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="w-full mt-auto">
        <hr className="border-blue-100"/>
        <div className="py-2 flex justify-end pr-4 pt-3 pb-3 text-[11px]">
          <a
            href="#table-of-contents"
            className={`flex items-center text-fb-info-1 ${isHovered ? 'underline' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <FontAwesomeIcon 
              icon={faArrowCircleUp} 
              className="mr-2 text-[#1268F3]" 
              style={{ width: '15px', height: '12px' }}
            />
            Table of contents
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
