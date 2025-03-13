import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake?.vfs;
export const exportAsPdf = (columnNames,sortedData,getValues,fileName) => {
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
    
        pdfMake.createPdf(docDefinition).download(`${fileName}.pdf`);
      
      };