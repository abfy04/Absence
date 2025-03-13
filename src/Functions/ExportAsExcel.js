import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const exportAsExcel = async (name,columnNames , sortedData  ,setActiveMenu,fileName,getValues) => {
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
        saveAs(file, `${fileName}.xlsx`);
        setActiveMenu(false);
      };