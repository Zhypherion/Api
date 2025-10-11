// file: positions/position.model.js
module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('Position', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Active' },
    hierarchyLevel: { 
      type: DataTypes.ENUM('Worker', 'Supervisor', 'Manager'),
      allowNull: false,
      defaultValue: 'Worker'
    }
  });
  return Position;
};
