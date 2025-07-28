import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/config';

class Task extends Model {
  public id!: number;
  public name!: string;
  public schedule!: string;
  public output!: string;
}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schedule: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Task',
});

export default Task;
