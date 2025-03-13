

export default function FormContainer ({children,title = 'General Info'}) {
    return (
<div className="relative border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-lg  min-h-full px-3 py-3 flex-1 grid place-items-center">
<h3 className=" text-gray-700 dark:text-gray-50 px-2 py-1 text-center self-start">{title}</h3>
{children}
</div>
    )
}