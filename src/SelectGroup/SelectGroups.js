// import SearchBar from "../Components/TableComponents/SearchBar"
// import { useState,useRef,useEffect } from "react"
// import { groups } from "./GroupsData";
// const activeStyle = 'border-b-purple-600 text-purple-600 font-semibold';
// const desactiveStyle = 'border-b-gray-300 text-gray-300 dark:border-b-gray-600 dark:text-gray-600'

import AddUser2 from "../Users/AddUser2";

// const years = ['All','First Year','Second Year','Third Year']
// export default function SelectGroups (){
//     const [Groups,setGroups] = useState(groups)
//     const [search ,setSearch] = useState('')
//     const dropDownRef = useRef(null)
    
//     const handleSearch = (value) => setSearch(value)
//     const [activeSection,setActiveSection] = useState('All Groups')
//     const [year,setYear] = useState('All')
//     const [isYearFilterDropDownActive,setIsYearFilterDropDownActive] = useState(false)

//     const handleChangeSection = (newSection)=> setActiveSection(newSection)
//     const getTheStyle = (section)=> section === activeSection ? activeStyle : desactiveStyle
//     const handleChangeYear= (Year) =>{
//         setYear(Year)
//         setIsYearFilterDropDownActive(false)
//     }

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//           if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
//             setIsYearFilterDropDownActive(false)
//           }
//         };
    
//         document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//           document.removeEventListener("mousedown", handleClickOutside);
//         };
// }, []);

//     const filtredData =Groups.filter (item =>{
//         const isSelected = activeSection !== 'All Groups' && activeSection === 'Selected' ? true : false
//         const filterByIsSelected = activeSection === 'All Groups' ? item : item.isSelected === isSelected
//         const filtredBySearch = item.libel.toLowerCase().startsWith(search)
//         const filterByYear = year === 'All' ? item : item.year === year
//         return  filtredBySearch && filterByYear && filterByIsSelected
//     })

//     const toggleSelectGroup = (group) =>{
//         const currentGroup = group
//         if (group.isSelected) {
//             currentGroup.isSelected = false
//         }else {
//             currentGroup.isSelected = true
//         }
//         const newGroups = Groups.filter(grp => grp?.idGroup !== group.idGroup)
//         setGroups([...newGroups,currentGroup])
//     }


// const Tab = ({section})=>{
//     return (
//         <button 
//             onClick={()=>handleChangeSection(section)} 
//             className={`  border-b-2  px-3 py-1    ${getTheStyle(section)}`}
//         >
//             {section}
//         </button>
//     )
// }

//     return (
//         <div className='select-none max-w-6xl mx-auto space-y-7 text-gray-700 dark:text-gray-50'>
//             <div className="w-full flex items-center justify-between">
//                 <h1 className="font-semibold text-2xl">Manage Mr.Daaif Groups</h1>
               
//             </div>
//             <div className="w-full flex items-center justify-between mb-7">
//                 <div className="flex items-center gap-1 ">
//                     <Tab section={'All Groups'}/>
//                     <Tab section={'Selected'}/>
//                     <Tab section={'Not Selected'}/>
//                 </div>
//                 <div className=" flex items-center  gap-3">
//                     <SearchBar
//                         columnNames={['libel']}
//                         searchTerm={search}
//                         handleChange={handleSearch}
//                     />
//                     <div className="relative z-50 min-w-32">
//                         <span 
//                             onClick={()=>setIsYearFilterDropDownActive(!isYearFilterDropDownActive)}
//                             className={`block px-3 p-2 rounded-lg border text-sm font-semibold  ${isYearFilterDropDownActive ? 'border-purple-600' : 'border-gray-300 dark:border-gray-600'}`}
//                         >
//                             {year}
//                         </span>
//                         {
//                             isYearFilterDropDownActive &&
//                             <div
//                                 ref={dropDownRef}
//                                 className="space-y-2 z-50 absolute border w-full border-gray-300 dark:border-gray-600 rounded-lg  p-2 bg-gray-50 dark:bg-gray-800 mt-2" 
//                             >
//                                 {
//                                     years.filter(item => item !== year).map(
//                                         el =>   <span 
//                                                     onClick={()=>handleChangeYear(el)}
//                                                     className="px-2 py-1 text-sm font-semibold block bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-700"
//                                                 >
//                                                     {el}
//                                                 </span>
//                                     )
//                                 }
//                             </div>
//                         }
                       
//                     </div>
//                 </div>

//             </div>
            
            
//             {
//                 filtredData.length ?
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {
//                     filtredData.map(
//                         item => 
//                         <div 
//                             onClick={()=>toggleSelectGroup(item)}
//                             className={`p-4 rounded-lg border cursor-pointer  shadow-lg ${item.isSelected ? 'bg-purple-300 hover:bg-purple-200 border-purple-700 dark:bg-purple-700 text-purple-700 dark:text-purple-50' : 'border-gray-300 dark:border-gray-600 bg-gray-50 hover:bg-gray-100/80 dark:bg-gray-900'}`}
//                         >
//                             <div className="flex items-center justify-between gap-2">
//                                 <h1 className=" font-semibold">{item.filiere}</h1>
//                                 <span className={`text-sm font-medium  ${item.isSelected ? 'text-purple-600 dark:text-purple-200' : 'text-gray-300 dark:text-gray-600'}`}>{item.year}</span>
//                             </div>
//                             <div className="my-3">
//                                 <h1 className="text-xl font-bold text-center">{item.libel}</h1>
//                             </div>

//                         </div>
//                     )
//                 }
//                 </div>
//                 :
//                 <p className="p-3 text-center text-sm font-medium text-gray-300 dark:text-gray-400">`No results found. Try adjusting your search or filter criteria.`</p>

//             } 
//         </div>
//     )
// }

export default function selectGroups(){
    return (
        <AddUser2 />
    )
}