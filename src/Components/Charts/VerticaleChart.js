export default function VerticaleChart({dataa2}){
    const totalAbsence = dataa2.reduce((acc,val)=> acc + val.absence , 0)
    const totalRetard = dataa2.reduce((acc,val)=> acc + val.retard , 0)
    return (
        <div className="flex flex-col-reverse  items-center justify-end w-full gap-2 h-full  min-h-56 pt-6">
            <div className="flex  gap-5   ">
                <div className="flex items-center gap-2">
                    <span className="size-5 bg-red-500 dark:bg-red-300 rounded-md "></span>
                    <span className="text-red-500 dark:text-red-300  text-sm font-semibold">Absence</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="size-5 bg-orange-400 dark:bg-orange-300 rounded-md "></span>
                    <span className="text-orange-400 dark:text-orange-300  text-sm font-semibold">Retard</span>
                </div>
            </div>
            <div className=" p-3  flex items-end justify-center gap-10  w-full h-full  flex-1">
                {dataa2.map((d, index) => {
                    const absenceSegmentHeight = `${d.absence * 100 / totalAbsence}%`
                    const lateSegmentHeight = `${d.retard * 100 / totalRetard}%`
                    return ( 
                        <div key={index} className=" flex flex-col space-y-1 md:space-y-2  justify-end items-center  min-h-52  min-w-20" >
                            <div className=" flex items-end gap-2 duration-150 h-52 "  >
                                <div className={`bg-red-500 items-center justify-center flex dark:bg-red-300 duration-500 rounded-md w-16 text-lg font-bold text-red-50 dark:text-red-700 min-h-4 `} style={{height : absenceSegmentHeight}} >
                                   { d.absence}
                                </div>
                                <div className={`bg-orange-400 flex items-center justify-center duration-500 dark:bg-orange-300 rounded-md w-16 text-lg font-bold text-orange-50 dark:text-orange-700 min-h-4 `} style={{height : lateSegmentHeight}} >
                                   {d.retard }
                                </div>
                            </div>
                            <div className="h-7 flex justify-center items-center">
                                <span className="text-center uppercase text-sm font-semibold text-gray-700 dark:text-gray-50">{d.name}</span>
                            </div> 
                        </div>  
                )})}      
            </div>
        </div>
    )
}