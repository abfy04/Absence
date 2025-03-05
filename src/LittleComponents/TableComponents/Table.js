import { useState ,useMemo} from "react";
import {  FileSpreadsheet, FileText, Filter} from "lucide-react";
import {useTableContext} from '../../TableContext'
import {sortList} from '../../Functions/HelperFunctions'

import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import DeleteModal from "../Modals/DeleteModal";
import ResetPasswordModal from "../Modals/ResetPasswordModal";
import MoreInfoModal from "../Modals/MoreInfoModal";
import FilterSection from "../Filter";
import Theader from './Theader'
import Tbody from './Tbody'

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake?.vfs;




export default function Table ({dataset,config}){
  const {name,searchBy,filterBy,action,columns} = config
  const {activeModal} = useTableContext();
  const [searchTerm,setSearchTerm] = useState('')
  const [filterTerms,setFilterTerms] = useState({})
  const [sortedBy,setSortedBy] = useState({col:'',mode:'ASC'})
  const [focus,setFocus]=  useState ({
    filterFocus : false,
    searchFocus : false,
  })
  const [activeMenu,setActiveMenu] = useState(false)
  //modals
  const modals = {
    'delete' : <DeleteModal config={{target:name,alerted : (name=== 'group' || name === 'filiere')}} />,
    'reset' :  <ResetPasswordModal  topic={name}/>,
    'moreInfo' : <MoreInfoModal config={config}/>
  }

   
 
  const onSearch = (value)=> setSearchTerm(value)


 const displayedData = useMemo(()=>{
      const filtredData = dataset.filter(item => {
        //search function
        const searchedList = searchBy.length ? searchBy.some(col => String(item[col]).toLowerCase().includes(searchTerm) ) : true
        // filter function
        const filtredList =  Object.keys(filterTerms).every(key => {
            switch (key) {
              case 'minAge':
                return item.age >= filterTerms.minAge;
              case 'maxAge':
                return item.age <= filterTerms.maxAge;
              case 'minTotalAbsence' : 
                return item.totalAbsence >= filterTerms.minTotalAbsence;
              case 'maxTotalAbsence' :
                return item.totalAbsence <= filterTerms.maxTotalAbsence;
              case 'from' : 
                return item.date >= filterTerms.from;
              case 'to' : 
                return item.date <= filterTerms.to;
            
              default:
                return item[key] === filterTerms[key];
            }
         
           
       });
       return searchedList && filtredList
   });
      
      return  filtredData
  
   
 },[filterTerms,searchTerm,dataset,searchBy])


 
  
  
  



  //sorting functions
  
    const changeCol = (col)=>{
      setSortedBy (prev => prev.col === col ? {...prev,mode: prev.mode === 'ASC' ? 'DESC' : 'ASC'}: {col:col,mode :'ASC'})
    }
    const sortedData = displayedData.sort((a,b)=> sortList(a,b,sortedBy))
    
    const keys  = columns.map(col => col.accessor);
      const columnNames = columns.map(col => col.colName)

      const  getValues= (dataa)=>{
        var values = keys.map(key => dataa[key])
        return values
      }
      
      const setName  = ()=>{
        const filterItems = Object.keys(filterTerms)
         const filterApllyed = filterItems.map(key => `${key}_${filterTerms[key]}`)
         return `${name}s_${filterApllyed.join('_')}`
      }
    
     
      
      
      const generatePDF = () => {
        const docDefinition = {
          content: [
            { text: "Employee Report", fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
            { text: "List of employees with their roles", fontSize: 12, margin: [0, 0, 0, 10] },
            {
              table: {
                widths: [...columnNames.map(_ => '*')],
                body: [
                  columnNames.map(colName => ({ text: colName,style: "tableHeader" }))
                  ,
                  
                  
                  ...sortedData.map(el => getValues(el))]
              },
              layout: "lightHorizontalLines",
            },
           
          ],
          styles: {
            tableHeader: {
              bold: true,
              fontSize: 12,
              color: "white",
              alignment: "center",
              fillColor: "#4CAF50", // Background color (alternative way)
              margin: [5, 3, 5, 3], // Padding inside the cell
            },
          },
          pageSize: "A4",
        };
    
        pdfMake.createPdf(docDefinition).download("employee-report.pdf");
      };


      const exportExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(name);
        let maxLength = 0;
       
        // Add Header Row
        const headerRow = worksheet.addRow(columnNames);
      
        // Style Header Row
        headerRow.eachCell((cell) => {
          maxLength = Math.max(maxLength, cell.value.length);
          cell.font = { bold: true, color: { argb: "FFFFFF" }, size: 12 }; // White text
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "4F81BD" } }; // Blue background
          cell.alignment = { horizontal: "center", vertical: "middle" };
          cell.border = {
            top: { style: "thin", color: { argb: "000000" } },
            bottom: { style: "thin", color: { argb: "000000" } },
            left: { style: "thin", color: { argb: "000000" } },
            right: { style: "thin", color: { argb: "000000" } },
          };
        });
      
        // Add Data Rows with Styling
        sortedData.forEach((d) => {
          const row = worksheet.addRow(getValues(d));
          

          row.eachCell((cell) => {
            maxLength = Math.max(maxLength, String(cell.value).length);
           
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.border = {
              top: { style: "thin", color: { argb: "AAAAAA" } },
              bottom: { style: "thin", color: { argb: "AAAAAA" } },
              left: { style: "thin", color: { argb: "AAAAAA" } },
              right: { style: "thin", color: { argb: "AAAAAA" } },
            };
          });
          d.width = maxLength + 2
        });
      
        // Set Column Widths
     // Adjust this value as needed
        worksheet.columns = worksheet.columns.map((_) => ({
            width: maxLength + 3,
        }));
              
      
        // Generate the Excel File
        const buffer = await workbook.xlsx.writeBuffer();
        const file = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(file, `${setName()}.xlsx`);
        setActiveMenu(false);
      };

    return (
   
      <div className=" min-w-full max-w-5xl inline-block align-middle rounded-lg border border-gray-300 divide-y divide-gray-300 relative dark:divide-gray-500 dark:border-gray-500">
       <div className="p-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {
              searchBy && 
              <SearchBar  
                columnNames={searchBy} 
                searchTerm={searchTerm} 
                handleChange={onSearch} 
                isFocus={focus.searchFocus} 
                setIsFocus={setFocus} 
              />
            }
          
            {
              filterBy && sortedData.length>0  &&
              <button className={`relative group flex items-center gap-2 rounded-md px-3 py-1.5 border  ${focus.filterFocus ? 'border-gray-700 dark:border-gray-50 text-gray-700 dark:text-gray-50' : 'dark:border-gray-500 text-gray-300  dark:text-gray-500'}`} onClick={()=>setFocus({...focus,filterFocus: !focus.filterFocus})}>
              <span className='absolute invisible group-hover:visible w-full -left-0  -top-8 z-50 px-2 py-1 rounded-md shadow-md text-xs text-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-50'>Apply filters</span>
                  <Filter size={16}/>
                  <span>Filters</span>
                  <span className={`${Object.keys(filterTerms).length ? ' bg-purple-200 text-purple-700  dark:bg-purple-300 ' : 'text-gray-300 dark:text-gray-400 bg-gray-50  dark:bg-gray-700 '} ${focus.filterFocus && 'border-gray-700 dark:border-gray-50' }  text-sm font-medium absolute -top-1 -right-2 size-5 rounded-lg flex items-center justify-center`}>{Object.keys(filterTerms).length }</span>
            </button>
            }
          </div>
          <div className="relative max-w-40 mr-2 ">
          <button 
              onClick={()=>setActiveMenu(!activeMenu)}
              disabled={!sortedData.length}
              className={` relative bg-gray-700 group  px-3 py-2 text-gray-50 hover:bg-gray-600 text-sm flex items-center gap-2 font-medium dark:text-gray-700 dark:hover:bg-gray-200 dark:bg-gray-50 disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:cursor-not-allowed ${activeMenu ? 'rounded-t-md' : 'rounded-md'}`}
          >
                    <span className='absolute invisible group-hover:visible w-full -left-0  -top-8 z-50 px-2 py-1 rounded-md shadow-md text-xs text-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-50'>Export results </span>
                    <FileText size={18}/>
                    <span >Export</span>
          </button>
          {activeMenu && (
          <div className="absolute  z-50 min-w-full  rounded-b-lg dark:bg-gray-100 bg-gray-600 shadow-lg ring-1 ring-black ring-opacity-5 ">
            <div className="p-2 space-y-1">
                <button 
                  onClick={exportExcel} 
                  className="dark:bg-green-200 dark:hover:bg-green-300 text-green-700  rounded-sm flex gap-2 items-center text-sm font-medium p-2 w-full "
                >
                  <FileSpreadsheet size={16}/>
                  Excel
                </button>
                <button 
                onClick={generatePDF} 
                  className="dark:bg-red-200 dark:hover:bg-red-300 text-red-700  rounded-sm flex gap-2 text-sm font-medium items-center p-2 w-full"
                >
                  <FileText size={16}/>
                  Pdf
                </button>
               
            </div>
          </div>
        )}

          </div>
          

       </div>
       {
        focus.filterFocus  && 
        <FilterSection  
          filterBy={filterBy} 
          setFilterTerms={setFilterTerms} 
          filterTerms={filterTerms}
        />
        
       }
       {
        sortedData.length ? 
        <table className="min-w-full max-w-4xl  divide-y divide-gray-100  dark:divide-gray-500 rounded-lg table-auto">
          {/* Table header */}
          <Theader columns={columns} change={changeCol} isAction ={action}/>
          <Tbody data={sortedData} config={config} columns={columns}/>
        </table>
        :
        <p className="p-3 text-center text-sm font-medium text-gray-300 dark:text-gray-400">`No results found. Try adjusting your search or filter criteria.`</p>

       }

       <div className="py-1.5 px-2 flex items-center justify-between">
          <h2 className="text-gray-700 dark:text-gray-50 text-lg font-bold">{sortedData.length} Results</h2>
          {
            sortedData.length>0 && <Pagination /> 
          }
         
       </div>
    
      {
        activeModal  && modals[activeModal]
      } 

    </div>
   
       
    )
}