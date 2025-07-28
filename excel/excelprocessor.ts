import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { UserInfo } from './excelmodel';

export const processExcelFile = async (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    console.error('File does not exist:', filePath);
    return;
  }

  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  if (!worksheet['!ref']) {
    console.error('Worksheet is empty or invalid.');
    return;
  }

  const range = xlsx.utils.decode_range(worksheet['!ref']);

  for (let row = range.s.r; row <= range.e.r; row++) {
    try {
      const data: (string | null)[] = [];
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cell = worksheet[xlsx.utils.encode_cell({ r: row, c: col })];
        data.push(cell ? cell.v : null);
      }

      if (data.every((value) => value === null || (typeof value === 'string' && value.trim() === ''))) {
        continue; 
      }

      if (!data[4] || typeof data[4] !== 'string' || data[4].trim() === '') {
        data[4] = ''; 
      }

      console.log('Processing row:', data);
      await insertDataIntoDatabase(data);
    } catch (error) {
      console.error(`Error processing row ${row}:`, error);
    }
  }
};

const insertDataIntoDatabase = async (data: (string | null)[]) => {
  try {
    await UserInfo.create({
      name: data[0] as string,
      contact_no: data[1] ? String(data[1]) : '',
      email_id: data[2] as string,
      team_id: data[4] ? (data[4] as string) : null, 
    });
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data into database:', error);
  }
};
