



function StartCards({dataCards}){
 


    return (
      
        
          dataCards.map(
            items=>
            <div className=" border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-lg p-3 space-y-3">
            {
              items.map(d=>
                <div className={` rounded-lg shadow lg:py-4 lg:px-3 py-3 px-2  duration-100 flex-1 flex justify-between  lg:min-h-32   ${d.style}`} key={d.title}>
               <div className="flex  justify-between flex-col gap-2">
               {d.icon}
               <span className=" flex gap-2  font-semibold lg:text-lg">{d.title}</span>
               </div>
             
             
              <span className="text-3xl font-bold text-end block self-end">{d.nbr}</span>
              
           
            
            </div>
              )

            }
           

            </div>
            
            
          )
        
        
       
              
              
      
  
        
        
      
    )
}

export default StartCards