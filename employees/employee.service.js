// // file: employees/employee.service.js
// const db = require('_helpers/db');

// module.exports = {
//   getAll,
//   getById,
//   create,
//   update,
//   getNextEmployeeId
// };

// // ===== Service Methods =====

// async function getAll() {
//   const employees = await db.Employee.findAll({
//     include: [
//     {
//       model: db.Account, as: 'account',   // ✅ must match db.js
//       attributes: ['id', 'email', 'status']
//     },
//     { 
//       model: db.Department, as: 'department', 
//       attributes: ['id', 'name'] 
//     }
//   ],
//     order: [['employeeId', 'ASC']]
//   });

//   return employees.map(emp => ({
//     id: emp.id,   // 👈 add this
//     accountId: emp.accountId,
//     account: emp.account ? {
//       id: emp.account.id,
//       email: emp.account.email,
//       status: emp.account.status
//     } : null,
//     employeeId: emp.employeeId,
//     position: emp.position,
//     department: emp.department? emp.department.name: null,
//     hireDate: emp.hireDate,
//     status: emp.status
//   }));
// }

// async function getById(id) {
//   return await db.Employee.findOne({
//     where: { employeeId: id },
//     include: {
//       model: db.Account,
//       as: 'account',   // ✅ correct alias
//       attributes: ['id', 'email', 'status']
//     }
//   });
// }

// // GET /employees/next-id
// async function getNextEmployeeId() {
//   const last = await db.Employee.findOne({
//     order: [['employeeId', 'DESC']]
//   });

//   let nextNumber = 1;
//   if (last) {
//     const lastNum = parseInt(last.employeeId?.replace('EMP', '')) || 0;
//     nextNumber = lastNum + 1;
//   }

//   return `EMP${String(nextNumber).padStart(3, '0')}`;
// }

// async function create(params) {
//   if (!params.accountId) throw 'Employee must be linked to an account';

//   const account = await db.Account.findByPk(params.accountId);
//   if (!account) throw 'Account not found';

//   let departmentId = null;

//   if (params.department) {
//     // find or create department by name
//     const [department] = await db.Department.findOrCreate({
//       where: { name: params.department },
//       defaults: { description: '' }
//     });
//     departmentId = department.id;
//   } else if (params.departmentId) {
//     const department = await db.Department.findByPk(params.departmentId);
//     if (!department) throw 'Department not found';
//     departmentId = department.id;
//   }

//   return await db.Employee.create({
//     accountId: account.id,
//     position: params.position,
//     departmentId: departmentId,  // 👈 must be set here
//     hireDate: params.hireDate,
//     status: params.status
//   });
// }


// async function update(id, params) {
//   const employee = await db.Employee.findOne({ where: { employeeId: id } });
//   if (!employee) throw 'Employee not found';
//   Object.assign(employee, params);
//   await employee.save();
//   return employee;
// }























// // file: employees/employee.service.js
// const db = require('_helpers/db');

// module.exports = {
//   getAll,
//   getById,
//   create,
//   update,
//   getNextEmployeeId,
//   transfer
// };

// // ===== Service Methods =====

// // Return full employee info including departmentId & departmentName
// async function getAll() {
//   const employees = await db.Employee.findAll({
//     include: [
//       {
//         model: db.Account, as: 'account',
//         attributes: ['id', 'email', 'status']
//       },
//       {
//         model: db.Department, as: 'department',
//         attributes: ['id', 'name']
//       }
//     ],
//     order: [['employeeId', 'ASC']]
//   });

//   return employees.map(emp => ({
//     id: emp.id,
//     employeeId: emp.employeeId,
//     accountId: emp.accountId,
//     account: emp.account ? {
//       id: emp.account.id,
//       email: emp.account.email,
//       status: emp.account.status
//     } : null,
//     position: emp.position,
//     // expose both departmentId and department name:
//     departmentId: emp.departmentId,
//     departmentName: emp.department ? emp.department.name : null,
//     hireDate: emp.hireDate,
//     status: emp.status
//   }));
// }

// async function getById(id) {
//   return await db.Employee.findOne({
//     where: { employeeId: id },
//     include: [
//       {
//         model: db.Account,
//         as: 'account',
//         attributes: ['id', 'email', 'status']
//       },
//       {
//         model: db.Department,
//         as: 'department',
//         attributes: ['id', 'name']
//       }
//     ]
//   });
// }

// async function getNextEmployeeId() {
//   const last = await db.Employee.findOne({
//     order: [['employeeId', 'DESC']]
//   });

//   let nextNumber = 1;
//   if (last) {
//     const lastNum = parseInt(last.employeeId?.replace('EMP', '')) || 0;
//     nextNumber = lastNum + 1;
//   }

//   return `EMP${String(nextNumber).padStart(3, '0')}`;
// }

// async function create(params) {
//   if (!params.accountId) throw 'Employee must be linked to an account';

//   const account = await db.Account.findByPk(params.accountId);
//   if (!account) throw 'Account not found';

//   let departmentId = null;

//   if (params.department) {
//     const [department] = await db.Department.findOrCreate({
//       where: { name: params.department },
//       defaults: { description: '' }
//     });
//     departmentId = department.id;
//   } else if (params.departmentId) {
//     const department = await db.Department.findByPk(params.departmentId);
//     if (!department) throw 'Department not found';
//     departmentId = department.id;
//   }

//   return await db.Employee.create({
//     accountId: account.id,
//     position: params.position,
//     departmentId: departmentId,
//     hireDate: params.hireDate,
//     status: params.status
//   });
// }

// async function update(id, params) {
//   const employee = await db.Employee.findOne({ where: { employeeId: id } });
//   if (!employee) throw 'Employee not found';
//   Object.assign(employee, params);
//   await employee.save();
//   return employee;
// }

// // ✅ Transfer department for an employee
// async function transfer(id, { departmentId }) {
//   const employee = await db.Employee.findOne({ where: { employeeId: id } });
//   if (!employee) throw 'Employee not found';

//   const department = await db.Department.findByPk(departmentId);
//   if (!department) throw 'Department not found';

//   employee.departmentId = department.id;
//   await employee.save();

//   // Return updated employee with department info
//   return await getById(id);
// }

















// // file: employees/employee.service.js working
// const db = require('_helpers/db');

// module.exports = {
//   getAll,
//   getById,
//   create,
//   update,
//   getNextEmployeeId,
//   transfer
// };

// // ===== Service Methods =====

// async function getAll() {
//   const employees = await db.Employee.findAll({
//     include: [
//       {
//         model: db.Account, as: 'account',
//         attributes: ['id', 'email', 'status']
//       },
//       {
//         model: db.Department, as: 'department',
//         attributes: ['id', 'name']
//       }
//     ],
//     order: [['employeeId', 'ASC']]
//   });

//   return employees.map(emp => ({
//     id: emp.id,
//     accountId: emp.accountId,
//     account: emp.account ? {
//       id: emp.account.id,
//       email: emp.account.email,
//       status: emp.account.status
//     } : null,
//     employeeId: emp.employeeId,
//     position: emp.position,
//     departmentId: emp.departmentId,
//     department: emp.department ? emp.department.name : null,
//     hireDate: emp.hireDate,
//     status: emp.status
//   }));
// }

// async function getById(id) {
//   return await db.Employee.findOne({
//     where: { employeeId: id },
//     include: [
//       {
//         model: db.Account,
//         as: 'account',
//         attributes: ['id', 'email', 'status']
//       },
//       {
//         model: db.Department,
//         as: 'department',
//         attributes: ['id', 'name']
//       }
//     ]
//   });
// }

// async function getNextEmployeeId() {
//   const last = await db.Employee.findOne({
//     order: [['employeeId', 'DESC']]
//   });

//   let nextNumber = 1;
//   if (last) {
//     const lastNum = parseInt(last.employeeId?.replace('EMP', '')) || 0;
//     nextNumber = lastNum + 1;
//   }

//   return `EMP${String(nextNumber).padStart(3, '0')}`;
// }

// async function create(params) {
//   if (!params.accountId) throw 'Employee must be linked to an account';

//   const account = await db.Account.findByPk(params.accountId);
//   if (!account) throw 'Account not found';

//   let departmentId = null;

//   if (params.department) {
//     const [department] = await db.Department.findOrCreate({
//       where: { name: params.department },
//       defaults: { description: '' }
//     });
//     departmentId = department.id;
//   } else if (params.departmentId) {
//     const department = await db.Department.findByPk(params.departmentId);
//     if (!department) throw 'Department not found';
//     departmentId = department.id;
//   }

//   return await db.Employee.create({
//     accountId: account.id,
//     position: params.position,
//     departmentId: departmentId,
//     hireDate: params.hireDate,
//     status: params.status
//   });
// }

// async function update(id, params) {
//   const employee = await db.Employee.findOne({ where: { employeeId: id } });
//   if (!employee) throw 'Employee not found';
//   Object.assign(employee, params);
//   await employee.save();
//   return employee;
// }

// // ✅ Transfer employee to another department (ID or Name works)
// async function transfer(id, { departmentId }) {
//   const employee = await db.Employee.findOne({ where: { employeeId: id } });
//   if (!employee) throw 'Employee not found';

//   let department;

//   if (isNaN(departmentId)) {
//     // if it's a string → treat as department name
//     [department] = await db.Department.findOrCreate({
//       where: { name: departmentId },
//       defaults: { description: '' }
//     });
//   } else {
//     // if it's a number → find by PK
//     department = await db.Department.findByPk(departmentId);
//   }

//   if (!department) throw 'Department not found';

//   employee.departmentId = department.id;
//   await employee.save();

//   return await getById(id);
// }















// file: employees/employee.service.js
const db = require('_helpers/db');

module.exports = {
  getAll,
  getById,
  create,
  update,
  getNextEmployeeId,
  transfer
};

// ===== Service Methods =====

async function getAll() {
  const employees = await db.Employee.findAll({
    include: [
      {
        model: db.Account, as: 'account',
        attributes: ['id', 'email', 'status']
      },
      {
        model: db.Department, as: 'department',
        attributes: ['id', 'name']
      }
    ],
    order: [['employeeId', 'ASC']]
  });

  return employees.map(emp => ({
    id: emp.id,
    accountId: emp.accountId,
    account: emp.account ? {
      id: emp.account.id,
      email: emp.account.email,
      status: emp.account.status
    } : null,
    employeeId: emp.employeeId,
    position: emp.position,
    departmentId: emp.departmentId,
    department: emp.department ? emp.department.name : null,
    hireDate: emp.hireDate,
    status: emp.status
  }));
}

async function getById(id) {
  return await db.Employee.findOne({
    where: { employeeId: id },
    include: [
      {
        model: db.Account,
        as: 'account',
        attributes: ['id', 'email', 'status']
      },
      {
        model: db.Department,
        as: 'department',
        attributes: ['id', 'name']
      }
    ]
  });
}

async function getNextEmployeeId() {
  const last = await db.Employee.findOne({
    order: [['employeeId', 'DESC']]
  });

  let nextNumber = 1;
  if (last) {
    const lastNum = parseInt(last.employeeId?.replace('EMP', '')) || 0;
    nextNumber = lastNum + 1;
  }

  return `EMP${String(nextNumber).padStart(3, '0')}`;
}

async function create(params) {
  if (!params.accountId) throw 'Employee must be linked to an account';

  const account = await db.Account.findByPk(params.accountId);
  if (!account) throw 'Account not found';

  let departmentId = null;

  if (params.department) {
    const [department] = await db.Department.findOrCreate({
      where: { name: params.department },
      defaults: { description: '' }
    });
    departmentId = department.id;
  } else if (params.departmentId) {
    const department = await db.Department.findByPk(params.departmentId);
    if (!department) throw 'Department not found';
    departmentId = department.id;
  }

  return await db.Employee.create({
    accountId: account.id,
    position: params.position,
    departmentId: departmentId,
    hireDate: params.hireDate,
    status: params.status
  });
}

async function update(id, params) {
  const employee = await db.Employee.findOne({ where: { employeeId: id } });
  if (!employee) throw 'Employee not found';
  Object.assign(employee, params);
  await employee.save();
  return employee;
}

// ✅ Transfer employee to another department (ID or Name works)
async function transfer(id, { departmentId }) {
  const employee = await db.Employee.findOne({ where: { employeeId: id } });
  if (!employee) throw 'Employee not found';

  // 🔑 Get old department for the log
  const oldDepartment = employee.departmentId ? await db.Department.findByPk(employee.departmentId) : null;
  const oldDepartmentName = oldDepartment ? oldDepartment.name : 'N/A';

  let department;

  if (isNaN(departmentId)) {
    // if it's a string → treat as department name
    [department] = await db.Department.findOrCreate({
      where: { name: departmentId },
      defaults: { description: '' }
    });
  } else {
    // if it's a number → find by PK
    department = await db.Department.findByPk(departmentId);
  }

  if (!department) throw 'Department not found';

  employee.departmentId = department.id;
  await employee.save();
  
  // 🔑 NEW: Create a Workflow log for the department transfer
  await db.Workflow.create({
      type: 'Department Transfer', 
      details: `Employee ${id} transferred from ${oldDepartmentName} to ${department.name}.`,
      status: 'Approved', // Mark the change as completed
      employeeId: employee.id, 
      requestId: null
  });

  return await getById(id);
}