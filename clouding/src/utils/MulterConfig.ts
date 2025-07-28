import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(__dirname, '..', 'uploads');
console.log("ui",uploadDir)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); 
    cb(null, Date.now() + ext); 
  },
});


const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ['image/*', 'application/pdf']; 

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  
  } else {
    cb(new Error('File type not allowed'), false); 
  }
};


export const upload = multer({ storage, fileFilter });
