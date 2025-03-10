import Select from "../Select"
import ErrorMsg from "./ErrorMsg"
const  FieldContainer = ( { label,children, error}) => { 
    return (
      
            <div className="w-full mt-6">
                <div className="relative">
                <span className=" px-1 mb-2 block bg-gray-50 dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-50 ">
                        {label}
                    </span>
                    {children}
                    
                </div>
                <ErrorMsg value={error} />
            </div>
    )
}

const  TextInput = ({type ='text',error, handleChange ,handleFocus ,value , name , placeHolder }) => {
     return (
        <input
                type={type}
                name={name}
                value={value}
                className={`
                bg-gray-100/70 dark:bg-gray-800/70 
                      block px-4 py-2 w-full   appearance-none   rounded-lg 
                      text-gray-700 dark:text-gray-50 
                      border 
                      ${error ? 'border-red-600' : 'border-gray-300 dark:border-gray-600  '}
                      focus:outline-none focus:ring-0 dark:focus:border-purple-600 focus:border-purple-600
                      placeholder:text-gray-300 dark:placeholder:text-gray-600
                  `}
                placeholder={placeHolder}
                onChange={({ target }) => handleChange(name, target.value)}
                onFocus={() => handleFocus(name)}
              />
     )
}


export const TextField = ({error, handleChange ,handleFocus ,value , name , placeHolder ,label ,type})=>{
     return (
        <FieldContainer label={label} error={error}>
            <TextInput 
                type={type}
                error={error} 
                handleChange={handleChange}
                handleFocus={handleFocus}
                value={value}
                name={name}
                placeHolder={placeHolder}
            />

        </FieldContainer>
     )
}

const SelectInput = ({ handleChange , placeholder ,name , value,items})=>{
     return (
        <select
                value={value}
                onChange={({target}) => handleChange(name,target.value)}
                className={`
                bg-gray-100/70 dark:bg-gray-800/70 
                block px-4 py-2 w-full appearance-none  rounded-lg 
                ${value ? ' text-gray-700 dark:text-gray-50 ' : 'text-gray-300 dark:text-gray-600'}
               
                bg-white  dark:bg-gray-900 
                border border-gray-300 dark:border-gray-600 
                focus:outline-none focus:ring-0 focus:border-purple-600 dark:focus:border-purple-600`}
              >
                <option value="" disabled selected className="text-gray-300 dark:text-gray-600">{placeholder}</option>
                {
                    items.map (item =>  
                    <option key={item} className="text-gray-700 dark:text-gray-50" value={item}>
                      {item}
                    </option>
                    )
                }
              </select>
     )
}

export const SelectField = ({label ,handleChange , placeholder ,name , value,items}) =>{
    return (
        <FieldContainer label={label}>
            <SelectInput 
                handleChange={handleChange}
                placeholder={placeholder}
                name={name}
                value={value}
                items={items}
            />
        </FieldContainer>
    )
}

const RadioInput = ({value, name ,handleChange , item})=>{
    return (
<label className="flex items-center space-x-2">
              <input
                type="radio"
                name={name}
                checked={value === item}
                onChange={() => handleChange(name,item)}
                className="w-4 h-4  border-gray-300  accent-purple-600"
              />
              <span className="text-gray-700 dark:text-gray-50">{item}</span>
            </label>
    )
}

export const RatioField = ({value, name ,handleChange , label,items}) =>{
    return (
       <FieldContainer label={label}>
            <div className="space-y-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600  bg-gray-100/70 dark:bg-gray-800/70 ">
                {
                    items.map (item =>
                        <RadioInput
                            key={item} 
                            value={value}
                            name={name}
                            item={item}
                            handleChange={handleChange}
                        />    
                    )
                }
                  
            </div>
       </FieldContainer>
    )
}


export const CustomSelect = ({items,label , name , handleChange , value , placeholder})=>{
     const config = {
        name : name, 
        items : items,
        onChange : handleChange,
        placeholder : placeholder,
        defaultValue : value     
     }
    return (
        <FieldContainer label={label}>
            <Select config={config}/>

        </FieldContainer>
        
    )
}

const NumberInput = ({name,value,handleChange,handleFocus,placeholder,error})=>{
return (
    <input
                type="number"
                name={name}
                value={value}
                className={`
                  bg-gray-100/70 dark:bg-gray-800/70 
                    block px-4 py-2 w-full rounded-lg appearance-none
                  text-gray-700 dark:text-gray-50 
                    border ${error ? 'border-red-600' : 'border-gray-300 dark:border-gray-600  '}
                    focus:outline-none focus:ring-0 dark:focus:border-purple-600 focus:border-purple-600
                  placeholder:text-gray-300 dark:placeholder:text-gray-600
                `}
                placeholder={placeholder}
                onChange={({ target }) => handleChange("age", target.value)}
                onFocus={() => handleFocus("age")}
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "E" || e.key === ".") {
                    e.preventDefault();
                  }
                }}
              />
)
}

export const NumberField = ({name,value,handleChange,handleFocus,placeholder,error,label})=>{
  return (
    <FieldContainer label={label} error={error}>
        <NumberInput 
            name={name}
            value={value}
            handleChange={handleChange}
            handleFocus={handleFocus}
            placeholder={placeholder}
            error={error}
        />
    </FieldContainer>
  )
}