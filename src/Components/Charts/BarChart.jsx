import React, { useState, useRef, useEffect } from "react";
import { XOctagon } from "lucide-react";

const BarChart = ({ data, withModal= true }) => {
  const [isOpen, setIsOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null); // Track which button triggered the popup
    const total = data.reduce((acc,val)=> acc+val.value,0)
    // Handle button click
    const handleButtonClick = (item) => {
      console.log(item);
      
      setCurrentItem(item); 
      setIsOpen(true); // Open the popup
    };
    
    return (
       <>
          <div className="flex gap-3 mx-auto w-full h-64  rounded-xl p-4 ">
            {data.map((item, index) => (
              <div key={index} className=" flex flex-col space-y-2  justify-end items-center text-center h-full w-full cursor-pointer" >
                  <div className="uppercase  font-medium dark:text-purple-50 text-purple-700 ">{item.value}</div>
                  <div 
                    className="bg-purple-300 rounded-md hover:bg-purple-200 dark:hover:bg-purple-600 dark:bg-purple-700 duration-500 w-full " 
                    style={{ height: `${item.value * 100 / total}%`}}  
                    onClick={() => withModal ? handleButtonClick(item): null }
                  ></div>
                  <div className="h-12 flex justify-center items-center">
                    <span className="text-center uppercase font-medium text-sm dark:text-purple-50 text-purple-700 hidden md:block">{item.label}</span>
                    <span className="text-center uppercase font-medium text-sm dark:text-purple-50 text-purple-700 block md:hidden">{item?.shortCut}</span>
                  </div>  
              </div>  
            ))}
          </div>
          {isOpen && <SubChart currentItem={currentItem} setIsOpen={setIsOpen}/>}
       </>
      
        
    )
};

export default BarChart;


const SubChart = ( {currentItem,setIsOpen}) =>{
 
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50">
      <div
        ref={popoverRef}
        className="bg-white border border-gray-300 rounded-lg shadow-lg  max-w-md dark:border-gray-600 dark:bg-gray-900 divide-y divide-gray-300 dark:divide-gray-600"
      >
        <div className="flex justify-between items-center py-3 gap-5 px-4 ">
          <h3 className="lg:text-lg text-sm font-semibold text-gray-700 dark:text-gray-50">
            Today Abcense of {currentItem?.label}
          </h3>
          {/* Close Button */}
          <button
            className="text-gray-300 hover:text-red-700 focus:outline-none dark:text-gray-600 dark:hover:text-red-700"
            onClick={() => setIsOpen(false)}
          >
            <XOctagon size={32}/>
          </button>
        </div>
     
        <div className="flex gap-3 mx-auto h-72  p-4">
          {currentItem?.groups.map((group, index) => (
            <div key={index} className=" flex flex-col  justify-end items-center text-center h-full w-full " >
                <div className="uppercase  font-medium text-gray-700 dark:text-gray-50">{group.value}</div>
                <div className="bar w-full  bg-purple-300 dark:bg-purple-700 dark:hover:bg-purple-600 rounded-md hover:bg-purple-200 duration-150 " style={{ height: `${group.value}%`}}  ></div>
                <div className="uppercase py-3 font-medium text-gray-700 dark:text-gray-50">{group.label}</div>  
            </div>
          ))}
        </div>
      </div> 
    </div>
  )
}
