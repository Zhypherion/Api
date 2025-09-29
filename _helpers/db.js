const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize, DataTypes } = require('sequelize');

const db = {};

initialize();

async function initialize() {
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({ host, port, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

  // init models
  db.Account = require('../accounts/account.model')(sequelize, DataTypes);
  db.RefreshToken = require('../accounts/refresh-token.model')(sequelize, DataTypes);
  db.Employee = require('../employees/employee.model')(sequelize, DataTypes); // ✅
  db.Request = require('../requests/request.model')(sequelize, DataTypes);   // ✅ NEW
  db.Workflow = require('../workflows/workflow.model')(sequelize, DataTypes);
  db.Department = require('../departments/department.model')(sequelize, DataTypes);
  
  // define relationships
  db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
  db.RefreshToken.belongsTo(db.Account);

  db.Account.hasMany(db.Employee, { foreignKey: 'accountId', as: 'employees', onDelete: 'CASCADE' });
  db.Employee.belongsTo(db.Account, { foreignKey: 'accountId', as: 'account' });
  //db.Employee.hasMany(db.Workflow, { as: 'workflows', foreignKey: 'employeeId' });

  // Employee → Request relation
  db.Employee.hasMany(db.Request, { foreignKey: 'employeeId', as: 'requests', onDelete: 'CASCADE' });
  db.Request.belongsTo(db.Employee, { foreignKey: 'employeeId', as: 'employee' });
  
  // Department ↔ Employee relation
  db.Department.hasMany(db.Employee, { foreignKey: 'departmentId', as: 'employees' });
  db.Employee.belongsTo(db.Department, { foreignKey: 'departmentId', as: 'department' });

  


   // Employee ↔ Workflow relation
  db.Employee.hasMany(db.Workflow, { 
    foreignKey: 'employeeId', 
    as: 'workflows', 
    onDelete: 'CASCADE' 
  });
  db.Workflow.belongsTo(db.Employee, { 
    foreignKey: 'employeeId', 
    as: 'employee' 
  });

  // Request ↔ Workflow relation (optional but useful)
  db.Request.hasMany(db.Workflow, { 
    foreignKey: 'requestId', 
    as: 'workflows', 
    onDelete: 'CASCADE' 
  });
  db.Workflow.belongsTo(db.Request, { 
    foreignKey: 'requestId', 
    as: 'request' 
  });

  await sequelize.sync({ alter: true });
}
                    
module.exports = db;
  