import express, { Request, Response } from 'express';
import cloudinary from '../cloudinary'; 
import { upload } from '../utils/MulterConfig'; 
import File from '../models/fileModels'; 
import{getUploadPage,uploadFile} from '../controllers/fileControllers';

const router = express.Router();
console.log("kjhjiuk")
router.get('/', getUploadPage, (req: Request, res: Response): void => {
  res.render('upload');
});
console.log("ytuio")

router.post('/upload', upload.single('file'), async (req: Request, res: Response): Promise<any> => {
  console.log("hhhh")
  if (!req.file) {
    return res.status(200).send('No file uploaded.');
  }
  
  console.log("nnnnnnn")

  // Upload file to Cloudinary
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    await File.create({
      fileName: req.file.filename,
      fileUrl: uploadResult.secure_url, 
    });
    console.log("hello ",uploadResult);
    res.send('File uploaded successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading to Cloudinary or saving to database.');
  }
});

export default router;
