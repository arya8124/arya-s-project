import { Request, Response } from 'express';
import cloudinary from '../cloudinary'; 
import File from '../models/fileModels';  
import fs from 'fs';

export const getUploadPage = (req: Request, res: Response) => {
  res.render('upload');
};

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const newFile = await File.create({
      fileName: req.file.filename,
      fileUrl: result.secure_url, 
    });
    fs.unlinkSync(req.file.path);
    res.status(200).send({
      message: 'File uploaded successfully!',
      file: newFile,
    });

  } catch (err) {
    console.error(err); 
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).send('Error uploading file or saving to database');
  }
};
