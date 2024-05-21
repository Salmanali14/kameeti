import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

export default function CustomSlider({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    const intervalId = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(intervalId);
  }, [images]);

 

  const handleChangeIndex = (index) => {
    setActiveIndex(index);
    
    
    if (index === images.length - 0) {
      setTimeout(() => {
        setActiveIndex(0);
      }, 0);
    }
  };
  

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === (images.length - 1) ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? (images.length - 1) : prevIndex - 1));
  };

  const renderDots = () => {
    return images.map((_, index) => (
      <span
        key={index}
        className={`inline-block w-3 h-3 rounded-full mx-1 ${activeIndex === index ? 'bg-[#A87F0B]' : 'bg-white'}`}
      />
    ));
  };

  return (
    <div className="w-full h-full relative rounded-[20px] overflow-hidden">
      <VirtualizeSwipeableViews
        index={activeIndex}
        onChangeIndex={handleChangeIndex}
        slideRenderer={({ index, key }) => (
          <div key={key} className="flex justify-center flex-col items-center rounded-[20px] h-[90vh]  bg-customBlack">
            <img src={images[index]?.imgURL} alt={images[index]?.imgAlt} className="w-auto h-[130px]" />
            <div className="w-full p-4 text-center">
              <h2 className='text-[25px] text-[#A87F0B] font-bold'>{images[index]?.title}</h2>
              <p className='text-[15px] text-[#847F7F]'>{images[index]?.description}</p>
            </div>
          </div>
        )}
        enableMouseEvents={true}
        resistance={true} // Enable resistance for swipe
        loop={true} // Enable looping
      />
      <button className="absolute bottom-[10px] transform -translate-y-1/2 left-5 font-bold text-[#A87F0B]" onClick={handlePrev}>
        Prev
      </button>

      <button className="absolute bottom-[10px] transform -translate-y-1/2 right-5 font-bold text-[#A87F0B]" onClick={handleNext}>
        Next
      </button>

      <div className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2">{renderDots()}</div>
    </div>
  );
}
