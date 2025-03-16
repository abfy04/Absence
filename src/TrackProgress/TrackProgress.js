import { useState,useEffect,useRef } from "react";
import SearchBar from "../Components/TableComponents/SearchBar";
import HalfDonutChart from "../Charts/HalfDonutChart";
import { progressData } from "./progressData";

const activeStyle = 'border-b-purple-600 text-purple-600 font-semibold';
const desactiveStyle = 'border-b-gray-300 text-gray-300 dark:border-b-gray-600 dark:text-gray-600'

const years = ['All','First Year','Second Year','Third Year']
export default function TrackProgress (){
    const [search ,setSearch] = useState('')
    const dropDownRef = useRef(null)
    
    const handleSearch = (value) => setSearch(value)
    const [activeSection,setActiveSection] = useState('All')
    const [year,setYear] = useState('All')
    const [isYearFilterDropDownActive,setIsYearFilterDropDownActive] = useState(false)

    const handleChangeSection = (newSection)=> setActiveSection(newSection)
    const getTheStyle = (section)=> section === activeSection ? activeStyle : desactiveStyle
    const handleChangeYear= (Year) =>{
        setYear(Year)
        setIsYearFilterDropDownActive(false)
    }

    const filtredData =progressData.filter (item =>{
        const filterByStatus = activeSection === 'All' ? item : item.status === activeSection
        const filtredBySearch = item.groupName.toLowerCase().startsWith(search)
        const filterByYear = year === 'All' ? item : item.year === year
        return filterByStatus && filtredBySearch && filterByYear
    })

    useEffect(() => {
            const handleClickOutside = (event) => {
              if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setIsYearFilterDropDownActive(false)
              }
            };
        
            document.addEventListener("mousedown", handleClickOutside);
          return () => {
              document.removeEventListener("mousedown", handleClickOutside);
            };
    }, []);


          const Tab = ({section})=>{
            return (
                <button 
                    onClick={()=>handleChangeSection(section)} 
                    className={`  border-b-2  px-3 py-1    ${getTheStyle(section)}`}
                >
                    {section}
                </button>
            )
        }

    return (
        <div className='select-none max-w-6xl mx-auto space-y-7 text-gray-700 dark:text-gray-50'>
            <div className="w-full flex items-center justify-between">
                <h1 className="font-semibold text-2xl">Mr.Daaif Progress</h1>
                <div className=" flex items-center  gap-3">
                    <SearchBar
                        columnNames={['groupName']}
                        searchTerm={search}
                        handleChange={handleSearch}
                    />
                    <div className="relative z-50 min-w-32">
                        <span 
                            onClick={()=>setIsYearFilterDropDownActive(!isYearFilterDropDownActive)}
                            className="block px-3 p-2 rounded-lg border text-sm font-semibold border-gray-300 dark:border-gray-600"
                        >
                            {year}
                        </span>
                        {
                            isYearFilterDropDownActive &&
                            <div
                                ref={dropDownRef}
                                className="space-y-2 z-50 absolute border w-full border-gray-300 dark:border-gray-600 rounded-lg  p-2 bg-gray-50 dark:bg-gray-700 mt-2" 
                            >
                                {
                                    years.filter(item => item !== year).map(
                                        el =>   <span 
                                                    onClick={()=>handleChangeYear(el)}
                                                    className="px-2 py-1 text-sm font-semibold block bg-gray-100 rounded-md border hover:border-purple-300 dark:hover:border-purple-700"
                                                >
                                                    {el}
                                                </span>
                                    )
                                }
                            </div>
                        }
                       
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-1 mb-7">
                <Tab section={'All'}/>
                <Tab section={'Not Started'}/>
                <Tab section={'Incomplited'}/>
                <Tab section={'Complited'}/>
            </div>
            {
                filtredData.length ?
                <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
                {
                    filtredData.map(
                        item => <HalfDonutChart data={item} />
                    )
                }
                </div>
                :
                <p className="p-3 text-center text-sm font-medium text-gray-300 dark:text-gray-400">`No results found. Try adjusting your search or filter criteria.`</p>

            } 
        </div>
    )
}

