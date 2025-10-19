// // file: employees/employee.model.js
// const { DataTypes } = require('sequelize');

// module.exports = model;

// function model(sequelize) {
//     const attributes = {
//         id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // 👈 must exist
//         employeeId: { type: DataTypes.STRING, unique: true },
//         positionId: { type: DataTypes.INTEGER, allowNull: true },
//         departmentId: { type: DataTypes.INTEGER, allowNull: true },  // 👈 FK now
//         hireDate: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
//         accountId: { type: DataTypes.INTEGER, allowNull: false },
//         status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Active' },
//     };

//     const options = {
//         timestamps: false,
//         hooks: {
//             async beforeCreate(employee) {
//                 const last = await sequelize.models.Employee.findOne({
//                     order: [['employeeId', 'DESC']]
//                 });
//                 let nextNumber = 1;
//                 if (last) {
//                     const lastNum = parseInt(last.employeeId?.replace('EMP', '')) || 0;
//                     nextNumber = lastNum + 1;
//                 }
//                 employee.employeeId = `EMP${String(nextNumber).padStart(3, '0')}`;
//             }
//         }
//     };

//     const Employee = sequelize.define('Employee', attributes, options);

//     // === ASSOCIATIONS ===
//     Employee.associate = (models) => {
//         // Employee has many requests
//         Employee.hasMany(models.Request, {
//             foreignKey: 'employeeId',
//             as: 'requests'
//         });

//         // Employee belongs to Account
//         Employee.belongsTo(models.Account, {
//             foreignKey: 'accountId',
//             as: 'account'
//         });

//         Employee.belongsTo(models.Department, { 
//         foreignKey: 'departmentId', 
//         as: 'department' });

//         Department.hasMany(Employee, { foreignKey: 'departmentId', as: 'employees' });
//     };

//     Employee.belongsTo(models.Position, {
//         foreignKey: 'positionId',
//         as: 'position'
//     });
//     return Employee;
// }









const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    employeeId: { type: DataTypes.STRING, unique: true },
    positionId: { type: DataTypes.INTEGER, allowNull: true }, // ✅ FK to Position
    departmentId: { type: DataTypes.INTEGER, allowNull: true },
    hireDate: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
    accountId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Active' },
  };

  const options = {
    timestamps: false,
    hooks: {
      async beforeCreate(employee) {
        const last = await sequelize.models.Employee.findOne({
          order: [['employeeId', 'DESC']]
        });
        let nextNumber = 1;
        if (last) {
          const lastNum = parseInt(last.employeeId?.replace('EMP', '')) || 0;
          nextNumber = lastNum + 1;
        }
        employee.employeeId = `EMP${String(nextNumber).padStart(3, '0')}`;
      }
    }
  };

  const Employee = sequelize.define('Employee', attributes, options);

  // ✅ All associations go *inside* this block
  Employee.associate = (models) => {
    Employee.hasMany(models.Request, { foreignKey: 'employeeId', as: 'requests' });
    Employee.belongsTo(models.Account, { foreignKey: 'accountId', as: 'account' });
    Employee.belongsTo(models.Department, { foreignKey: 'departmentId', as: 'department' });

    // ✅ correct place for Position association
    Employee.belongsTo(db.Position, { as: 'position', foreignKey: 'positionId' });


    // Also: Department has many employees
    models.Department.hasMany(Employee, { foreignKey: 'departmentId', as: 'employees' });
  };

  return Employee;
}
