//hooks
import { useState ,useMemo} from "react";
import { useHotkeys } from "react-hotkeys-hook";
//icon
import { Filter} from "lucide-react";
//contenxt
import {useModalContext} from '../../Functions/ModalContext'
//functions
import {sortList} from '../../Functions/Sotring'
import { filterFunction } from "../../Functions/filterData";
//Components
import { Pagination, Theader } from "./TableComponents";
import SearchBar from "../Common/SearchBar";

import DeleteModal from "../Modals/DeleteModal";
import ResetPasswordModal from "../Modals/ResetPasswordModal";
import MoreInfoModal from "../Modals/MoreInfoModal";
import FilterSection from "./Filter";
import Tbody from './Tbody'
import { Export } from "./Export";

export default function Table ({dataset,config}){
  const {name,searchBy,filterBy,columns} = config

  const {activeModal} = useModalContext();

  const [searchTerm,setSearchTerm] = useState('')
  const [filterTerms,setFilterTerms] = useState({})
  const [sortedBy,setSortedBy] = useState({col:'',mode:'ASC'})
  const [filterFocus,setFilterFocus] = useState(false)
  //modals
  const modals = {
    'delete' : <DeleteModal name={name} />,
    'resetPassword' :  <ResetPasswordModal  topic={name}/>,
    'schedule' : <MoreInfoModal config={config}/>
  }

  const onSearch = (value)=> setSearchTerm(value)

  const displayedData = useMemo( ()=> 
    filterFunction(dataset,searchBy,filterTerms,searchTerm) , 
    [dataset,searchBy,filterTerms,searchTerm]
  )
  //sorting functions
  const changeCol = (col)=>{
    setSortedBy (prev => prev.col === col ? {...prev,mode: prev.mode === 'ASC' ? 'DESC' : 'ASC'}: {col:col,mode :'ASC'})
  }
  const sortedData = displayedData.sort((a,b)=> sortList(a,b,sortedBy))
    
  useHotkeys("shift+f", () => setFilterFocus(!filterFocus));
   
  return (
      <div className=" min-w-full max-w-5xl inline-block align-middle overflow-y-visible rounded-lg   relative  space-y-4 mt-5">
       <div className="py-1.5 flex items-center justify-between ">
       <h2 className="text-lg font-bold">{sortedData.length} Results</h2>
       <div className="flex items-center divide-x divide-gray-300 gap-3">
       <div className="flex items-center gap-2">
            {
              searchBy && 
              <SearchBar  
                columnNames={searchBy} 
                searchTerm={searchTerm} 
                handleChange={onSearch} 
              />
            }
            {
              filterBy && sortedData.length>0  &&
              <button className={`relative group flex items-center  rounded-md p-2 outline-none  border  ${filterFocus ? 'border-purple-600  text-purple-600' : 'dark:border-gray-600 border-gray-300 text-gray-300  dark:text-gray-600'}`} onClick={()=>setFilterFocus(!filterFocus)}>
                  <Filter size={20}/>
            </button>
            }
          </div>
          
          <Export 
            isDisabled={!sortedData.length} 
            name={name}
            columns={columns}
            sortedData={sortedData}
          />

         

         

       </div>
          

       </div>
        {/* filter Zone */}
       {
        filterFocus  && 
        <FilterSection  
          filterBy={filterBy} 
          setFilterTerms={setFilterTerms} 
          filterTerms={filterTerms}
        />
       }
      {
        sortedData.length ? 
        <div className="  relative rounded-lg ">
        <table className="min-w-full max-w-4xl divide-y rounded-lg table-auto divide-gray-100  dark:divide-gray-500  ">
          <Theader columns={columns} change={changeCol} />
          <Tbody data={sortedData} config={config} columns={columns}/>
        </table>
        </div>
        
        :
        <p className="px-3 py-10 text-center text-sm font-medium text-gray-300 dark:text-gray-600">`No results found. Try adjusting your search or filter criteria.`</p>
       }
       {
        sortedData.length > 0 &&  <Pagination />
       }
      
      {
        activeModal  && modals[activeModal]
      } 
    </div>  
    )
}