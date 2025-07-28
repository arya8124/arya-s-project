import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../../src/app';

class File extends Model {}

File.init(
  {
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'File',
    timestamps: true,
  }
);

export default File;
