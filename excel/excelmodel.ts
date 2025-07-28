import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';

export class UserInfo extends Model {
  public name!: string;
  public contact_no!: string;
  public email_id!: string;
  public team_id!: string;
}

UserInfo.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true, 
    },
    team_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'DefaultTeam',
    },
  },
  {
    sequelize,
    modelName: 'UserInfo',
    tableName: 'user_info',
    timestamps: false,
  }
);
