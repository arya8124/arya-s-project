import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  refreshToken?: string | null; 
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public  refreshToken?: string | null; 

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users", // Optional: specify the table name
    timestamps: true,
  }
);

export default User;
