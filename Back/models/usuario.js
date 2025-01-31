import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

const usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  correo_electronico: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  contrasenya: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING(255),
    allowNull: true, 
  }
}, {
  tableName: 'usuario', 
  timestamps: false, 
});

export default usuario;
