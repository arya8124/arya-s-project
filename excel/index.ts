import { processExcelFile } from './excelprocessor';

const excelFilePath = 'excel2.xlsx';

processExcelFile(excelFilePath).then(() => {
  console.log('Excel file processed and data inserted into the database.');
}).catch((error) => {
  console.error('Error processing the Excel file:', error);
});
