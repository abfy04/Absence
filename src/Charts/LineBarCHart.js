export default function LineBarChart({
     data = [
        {name:'first year' , nbr:50},
        {name:'second year' , nbr:70},
        {name:'third year' , nbr:10}
    ]
}){
  const total = data.reduce((acc,val)=> acc+val.nbr,0)
    return (
        <div className="flex gap-3 mx-auto h-56 p-3 w-full rounded-xl">
        {data.map((d, index) => (

            <div key={index} className=" flex flex-col gap-1  justify-end items-center text-center h-full w-full text-purple-700 dark:text-purple-50 " >
                <div className="uppercase  font-medium text-xs ">{d.nbr}</div>
                <div className="bg-purple-300 dark:bg-purple-700 rounded-md  duration-500 w-full " style={{ height: `${d.nbr * 100 / total}%`}}  ></div>
                <div className="h-11 flex justify-center items-center">
                    <span className="text-center uppercase text-xs ">{d.name}</span>
                </div>  
            </div>
          
        ))}
    </div>
    )
}