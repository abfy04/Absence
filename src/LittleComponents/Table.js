import { useState } from "react";
import {  Filter} from "lucide-react";
import {useTableContext} from '../Context'
import {sortList} from '../HelperFunctions'


import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import DeleteModal from "./DeleteModal";
import ResetPasswordModal from "./ResetPasswordModal";
import TeachersPopUp from "./TeachersPopUp";
import FilterSection from "./Filter";
import Theader from './Theader'
import Tbody from './Tbody'




export default function Table ({columns,dataset,config}){
  const {name,searchBy,filterBy} = config
  //modals
  const modals = {
    'delete' : <DeleteModal config={{target:name,alerted : (name=== 'group' || name === 'filiere')}} />,
    'reset' :  <ResetPasswordModal  topic={name}/>,
    'moreInfos' : <TeachersPopUp />
  }


  const [filtredList,setFiltredList]=useState(dataset) 
  const [searchedList,setSearchedList]=useState(filtredList) 

 
  const {activeModal} = useTableContext();
 

  const [isFilter,setIsFilter] = useState(false)

  



  //sorting functions
  const [sortedBy,setSortedBy] = useState({col:'',mode:'ASC'})
    const changeCol = (col)=>{
      setSortedBy (prev => prev.col === col ? {...prev,mode: prev.mode === 'ASC' ? 'DESC' : 'ASC'}: {col:col,mode :'ASC'})
    }
    const sortedData = searchedList.sort((a,b)=> sortList(a,b,sortedBy))
    
    return (
   
      <div className=" min-w-full max-w-5xl inline-block align-middle rounded-lg border divide-y divide-gray-100 relative dark:divide-gray-500 dark:border-gray-500">
       <div className="p-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
          <SearchBar data={ filtredList } setData={setSearchedList} columnNames={searchBy} />
          <button className={`flex items-center gap-2 rounded-md px-3 py-1.5 border  ${isFilter ? 'border-gray-700 dark:border-gray-50 text-gray-700 dark:text-gray-50' : 'border-gray-500  text-gray-500'}`} onClick={()=>setIsFilter(!isFilter)}>
            <Filter size={16}/>
            <span>Filters</span>
          </button>
          </div>
          
          
          <Pagination />
       </div>
       {
        isFilter && <FilterSection filterBy={filterBy} items={dataset} setData={setFiltredList} />
        
       }
       <table className="min-w-full max-w-4xl  divide-y divide-gray-100  dark:divide-gray-500 rounded-lg table-auto">
          {/* Table header */}
          <Theader columns={columns} change={changeCol} />
          <Tbody data={sortedData} config={config} columns={columns}/>
        </table>
    
      {

        activeModal  && modals[activeModal]

      }
    </div>
   
       
    )
}