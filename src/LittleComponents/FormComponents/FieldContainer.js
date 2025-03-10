import ErrorMsg from "./ErrorMsg"
export default function FieldContainer ( { label,children, error}) { 
    return (
      
            <div className="w-full mt-6">
                <div className="relative">
                    {children}
                    <span className="absolute -top-[0.7rem] left-3 px-1 bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-50 ">
                        {label}
                    </span>
                </div>
                <ErrorMsg value={error} />
            </div>
            
       
        
    )
}