

export default function FormContainer ({children,title ,icon:Icon}) {
    return (
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm ">
            <div className="flex items-center gap-2  border-b border-gray-300 dark:border-gray-600  bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50  text-purple-600 dark:text-purple-400 rounded-t-lg  px-8 py-4">
                <Icon className="w-5 h-5" />
                <h3 className="text-lg font-semibold ">{title}</h3>
            </div>
            <div className='px-8 py-4 dark:bg-gray-900 bg-white rounded-b-lg'>
                {children}
            </div>
        </div>
    )
}

