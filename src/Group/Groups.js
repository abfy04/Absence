import { useState } from "react";
import { Pencil,SquareArrowOutUpRight,Edit,Trash2 } from "lucide-react";
import Alert from "../LittleComponents/Alert";
import DeleteModal from "../LittleComponents/DeleteModal";
import Table from "../LittleComponents/Table";
import { Link } from "react-router-dom";
import Pagination from "../LittleComponents/Pagination";
import SearchBar from "../LittleComponents/SearchBar";
import { groups } from "../Users";
export default function Filieres(){
    const [selectedItem,setSelectedItem] = useState(null)
    const [activeModal,setActiveModal]= useState(false);

    const [data,setData] = useState(groups)





  
    const cols = [
      {colName:'Libel',accessor : 'libel'},
      {colName:'Filiere',accessor : 'filiere'},
      {colName:'Year',accessor : 'year'},
      {colName:'Number students',accessor : 'numberStudents'},
      {colName:'Number Absence',accessor : 'nbrAbsence'},
      {colName:'Today Absence',accessor : 'todayAbsence'},
      {colName:'Yesterday Absence',accessor : 'YesterdayAbsence'},
    
    ]
    return (
      <>
      <div>
          <h1 className="text-2xl text-gray-700 font-bold mb-10 mt-7 dark:text-gray-50 ">2003 Groups</h1>
          <Alert msg={'if you delete any group ,all values associated with this group will be lost'}/>
      </div>
     <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50">Groups List </h1>
        <Link to={'/addGroup'} className="bg-gray-700 rounded-md px-4 py-3 text-gray-50 hover:bg-gray-600 text-sm flex items-center gap-2 mr-2 font-medium dark:text-gray-700 dark:hover:bg-gray-200 dark:bg-gray-50">
          <Pencil size={18} />
          <span >Add new Group</span>
        </Link>
     </div>
    
    <div class=" min-w-full inline-block align-middle rounded-lg border divide-y divide-gray-100 dark:divide-gray-500 dark:border-gray-500">
       <div className="p-1.5 flex items-center justify-between">
          <SearchBar data={groups} setData={setData} columnNames={['libel','filiere','year']} />
          <Pagination />
       </div>
      <div class="   ">
        <Table data={data} columns={cols} setItem={setSelectedItem} item={selectedItem} modal={setActiveModal} dropDown>
        <div>
            <Link to={`/groupProfile/${selectedItem?.id}`} className="rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex gap-2 items-center text-xs p-2"><SquareArrowOutUpRight size={14}/> See More</Link>
            <Link to={`/editGroup/${selectedItem?.id}`} className="rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex gap-2 items-center text-xs p-2"><Edit size={14}/> Edit</Link>
          </div>
          <button onClick={()=>setActiveModal('delete')}  className="text-red-500  hover:bg-red-100 w-full flex gap-2 text-xs items-center rounded-sm p-2  mt-2"> <Trash2 size={14}/>Delete</button>
        </Table>
      </div>
      {
              activeModal && 
              <DeleteModal  setActiveModal={setActiveModal} setSelectedItem={setSelectedItem} selectedItem={selectedItem}  topic = 'filiere'>
                  <Alert msg={'if you delete any group ,all values associated with this group will be lost'}/>
              </DeleteModal>
      }
    </div>
 





















       
     

      </>
      
       
     
    );
  };
