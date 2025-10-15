// file: positions/position.model.js
module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('Position', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Active' },
    departmentId: { type: DataTypes.INTEGER, allowNull: true },
    hierarchyLevel: { 
      type: DataTypes.ENUM('Worker', 'Supervisor', 'Manager'),
      allowNull: false,
      defaultValue: 'Worker'
    }
    // workflowId: { type: DataTypes.INTEGER, allowNull: true } // Assuming workflow is optional initiall
  });

Position.associate = (models) => {
    Position.belongsTo(models.Department, {
      foreignKey: 'departmentId',
      as: 'department'
    });
    // Position.belongsTo(models.Workflow, {
    //     foreignKey: 'workflowId',
    //     as: 'workflow'
    // });
  };
  return Position;
};




// module.exports = (sequelize) => {
//   const { DataTypes } = require('sequelize');

//   const Position = sequelize.define('Position', {
//     name: { type: DataTypes.STRING, allowNull: false },
//     status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Active' },
//     hierarchyLevel: { type: DataTypes.STRING, allowNull: false },
//     departmentId: { type: DataTypes.INTEGER, allowNull: true }
//   });

//   Position.associate = (models) => {
//     Position.belongsTo(models.Department, {
//       foreignKey: 'departmentId',
//       as: 'department'
//     });
//   };

//   return Position;
// };
