// const config = require('config.json');
// const mysql = require('mysql2/promise');
// const { Sequelize, DataTypes } = require('sequelize');

// const db = {};

// initialize();

// async function initialize() {
//   const { host, port, user, password, database } = config.database;
//   const connection = await mysql.createConnection({ host, port, user, password });
//   await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

//   const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

//   // init models
//   db.Account = require('../accounts/account.model')(sequelize, DataTypes);
//   db.RefreshToken = require('../accounts/refresh-token.model')(sequelize, DataTypes);
//   db.Employee = require('../employees/employee.model')(sequelize, DataTypes); // ✅
//   db.Request = require('../requests/request.model')(sequelize, DataTypes);   // ✅ NEW
//   db.Workflow = require('../workflows/workflow.model')(sequelize, DataTypes);
//   db.Department = require('../departments/department.model')(sequelize, DataTypes);
  
//   // define relationships
//   db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
//   db.RefreshToken.belongsTo(db.Account);

//   db.Account.hasMany(db.Employee, { foreignKey: 'accountId', as: 'employees', onDelete: 'CASCADE' });
//   db.Employee.belongsTo(db.Account, { foreignKey: 'accountId', as: 'account' });
//   //db.Employee.hasMany(db.Workflow, { as: 'workflows', foreignKey: 'employeeId' });

//   // Employee → Request relation
//   db.Employee.hasMany(db.Request, { foreignKey: 'employeeId', as: 'requests', onDelete: 'CASCADE' });
//   db.Request.belongsTo(db.Employee, { foreignKey: 'employeeId', as: 'employee' });
  
//   // Department ↔ Employee relation
//   db.Department.hasMany(db.Employee, { foreignKey: 'departmentId', as: 'employees' });
//   db.Employee.belongsTo(db.Department, { foreignKey: 'departmentId', as: 'department' });

  


//    // Employee ↔ Workflow relation
//   db.Employee.hasMany(db.Workflow, { 
//     foreignKey: 'employeeId', 
//     as: 'workflows', 
//     onDelete: 'CASCADE' 
//   });
//   db.Workflow.belongsTo(db.Employee, { 
//     foreignKey: 'employeeId', 
//     as: 'employee' 
//   });

//   // Request ↔ Workflow relation (optional but useful)
//   db.Request.hasMany(db.Workflow, { 
//     foreignKey: 'requestId', 
//     as: 'workflows', 
//     onDelete: 'CASCADE' 
//   });
//   db.Workflow.belongsTo(db.Request, { 
//     foreignKey: 'requestId', 
//     as: 'request' 
//   });

//   await sequelize.sync({ alter: true });
// }
                    
// module.exports = db;
  









// // const config = require('config.json');
// const config = require('../config')
// const mysql = require('mysql2/promise');
// const { Sequelize, DataTypes } = require('sequelize');
// const fs = require('fs'); // Required to read the certificate file
// const path = require('path'); // Required to construct the file path

// const db = {};

// initialize();

// async function initialize() {
//     // Read the CA certificate file content
//     // Assumes ca.pem is located in a 'certs' folder in the project root
//     const caCert = fs.readFileSync(path.join(__dirname, '../certs/ca.pem'), 'utf8');

//     const { host, port, user, password, database } = config.database;

//     // --- 1. Connection Options for mysql2/promise (Initial DB creation) ---
//     // This connection is used to create the database if it doesn't exist
//     const connectionOptions = {
//         host,
//         port,
//         user,
//         password,
//         ssl: {
//             ca: [caCert], // Pass the certificate content as an array
//             rejectUnauthorized: true // Enforces security now that the cert is provided
//         }
//     };

//     try {
//         const connection = await mysql.createConnection(connectionOptions);
//         await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
//     } catch (error) {
//         // Log the error and re-throw it to stop the server from starting with a failed connection
//         console.error('Database connection failed during initial setup (mysql2):', error.message);
//         throw error;
//     }


//     // --- 2. Sequelize Initialization ---
//     // This is the ORM connection used by the rest of the application
//     const sequelize = new Sequelize(database, user, password, {
//         dialect: 'mysql',
//         host: host,
//         port: port,
//         logging: false, // You can set this to console.log to debug SQL
//         dialectOptions: {
//             ssl: {
//                 ca: caCert, // Pass the certificate content
//                 rejectUnauthorized: true // Enforces security now that the cert is provided
//             }
//         }
//     });

//     // init models
//     db.Account = require('../accounts/account.model')(sequelize, DataTypes);
//     db.RefreshToken = require('../accounts/refresh-token.model')(sequelize, DataTypes);
//     db.Employee = require('../employees/employee.model')(sequelize, DataTypes);
//     db.Request = require('../requests/request.model')(sequelize, DataTypes);
//     db.Workflow = require('../workflows/workflow.model')(sequelize, DataTypes);
//     db.Department = require('../departments/department.model')(sequelize, DataTypes);
    
//     // define relationships
//     db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
//     db.RefreshToken.belongsTo(db.Account);

//     db.Account.hasMany(db.Employee, { foreignKey: 'accountId', as: 'employees', onDelete: 'CASCADE' });
//     db.Employee.belongsTo(db.Account, { foreignKey: 'accountId', as: 'account' });

//     // Employee <-> Request relation
//     db.Employee.hasMany(db.Request, { foreignKey: 'employeeId', as: 'requests', onDelete: 'CASCADE' });
//     db.Request.belongsTo(db.Employee, { foreignKey: 'employeeId', as: 'employee' });
    
//     // Department <-> Employee relation
//     db.Department.hasMany(db.Employee, { foreignKey: 'departmentId', as: 'employees' });
//     db.Employee.belongsTo(db.Department, { foreignKey: 'departmentId', as: 'department' });

//     // Employee <-> Workflow relation
//     db.Employee.hasMany(db.Workflow, { 
//         foreignKey: 'employeeId', 
//         as: 'workflows', 
//         onDelete: 'CASCADE' 
//     });
//     db.Workflow.belongsTo(db.Employee, { 
//         foreignKey: 'employeeId', 
//         as: 'employee' 
//     });

//     // Request <-> Workflow relation
//     db.Request.hasMany(db.Workflow, { 
//         foreignKey: 'requestId', 
//         as: 'workflows', 
//         onDelete: 'CASCADE' 
//     });
//     db.Workflow.belongsTo(db.Request, { 
//         foreignKey: 'requestId', 
//         as: 'request' 
//     });

//     // Sync all models with the database
//     await sequelize.sync({ alter: true });
// }
                    
// module.exports = db;











const config = require('config.json');
// const config = require('../config');
const mysql = require('mysql2/promise');
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

const db = {};

initialize();

async function initialize() {
    // --- 0. Load CA certificate ---
    let caCert;
    try {
        if (process.env.MYSQL_SSL_CA) {
    // Decode Base64 back to PEM text
    caCert = Buffer.from(process.env.MYSQL_SSL_CA, 'base64').toString('utf-8');
} else {
    // Fallback to local file (dev only)
    const caCertPath = path.join(__dirname, '../certs/ca.pem');
    if (fs.existsSync(caCertPath)) {
        caCert = fs.readFileSync(caCertPath, 'utf-8');
    }
}
    } catch (err) {
        console.warn('⚠️ No CA certificate found, SSL may fail if required.');
    }

    const { host, port, user, password, database } = config.database;

    // --- 1. mysql2 Connection (create DB if missing) ---
    const connectionOptions = {
        host,
        port,
        user,
        password,
        ssl: caCert ? { ca: caCert, rejectUnauthorized: true } : undefined
    };

    try {
        const connection = await mysql.createConnection(connectionOptions);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
        await connection.end();
        console.log(`✅ Database "${database}" ensured.`);
    } catch (error) {
        console.error('❌ Database connection failed during initial setup (mysql2):', error.message);
        throw error;
    }

    // --- 2. Sequelize ORM Connection ---
    const sequelize = new Sequelize(database, user, password, {
        dialect: 'mysql',
        host,
        port,
        logging: false,
        dialectOptions: caCert
            ? { ssl: { ca: caCert, rejectUnauthorized: true } }
            : {}
    });

    // --- 3. Init Models ---
    db.Account = require('../accounts/account.model')(sequelize, DataTypes);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize, DataTypes);
    db.Employee = require('../employees/employee.model')(sequelize, DataTypes);
    db.Request = require('../requests/request.model')(sequelize, DataTypes);
    db.Workflow = require('../workflows/workflow.model')(sequelize, DataTypes);
    db.Department = require('../departments/department.model')(sequelize, DataTypes);

    // --- 4. Define Relationships ---
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    db.Account.hasMany(db.Employee, { foreignKey: 'accountId', as: 'employees', onDelete: 'CASCADE' });
    db.Employee.belongsTo(db.Account, { foreignKey: 'accountId', as: 'account' });

    db.Department.hasMany(db.Employee, { foreignKey: 'departmentId', as: 'employees' });
    db.Employee.belongsTo(db.Department, { foreignKey: 'departmentId', as: 'department' });

    db.Employee.hasMany(db.Request, { foreignKey: 'employeeId', as: 'requests', onDelete: 'CASCADE' });
    db.Request.belongsTo(db.Employee, { foreignKey: 'employeeId', as: 'employee' });

    db.Employee.hasMany(db.Workflow, { foreignKey: 'employeeId', as: 'workflows', onDelete: 'CASCADE' });
    db.Workflow.belongsTo(db.Employee, { foreignKey: 'employeeId', as: 'employee' });

    db.Request.hasMany(db.Workflow, { foreignKey: 'requestId', as: 'workflows', onDelete: 'CASCADE' });
    db.Workflow.belongsTo(db.Request, { foreignKey: 'requestId', as: 'request' });

    // --- 5. Sync Models ---
    await sequelize.sync({ alter: true });
    console.log('✅ Sequelize models synced.');
}

module.exports = db;
