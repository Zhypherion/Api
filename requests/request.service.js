// const db = require('_helpers/db');

// module.exports = {
//     getAll,
//     getById,
//     create,
//     update,
//     getActiveEmployees,
//     getAllEmployees
// };

// // ------------------ FUNCTIONS ------------------

// // ✅ Fetch all requests with their employees + account info
// async function getAll() {
//     const requests = await db.Request.findAll({
//         include: [
//             {
//                 model: db.Employee,
//                 as: 'employee',
//                 attributes: ['id', 'employeeId', 'position', 'departmentId', 'hireDate', 'status'],
//                 include: [
//                     {
//                         model: db.Account,
//                         as: 'account',
//                         attributes: ['id', 'email', 'status']
//                     },
//                       { 
//                         model: db.Department, 
//                         as: 'department', 
//                         attributes: ['name'] // get department name
//                     }
//                 ]
//             }
//         ],
//         order: [['id', 'ASC']]
//     });

//     return requests;
// }

// // ✅ Fetch a single request by ID
// async function getById(id) {
//     return await db.Request.findByPk(id, {
//         include: [
//             {
//                 model: db.Employee,
//                 as: 'employee',
//                 include: [{ model: db.Account, as: 'account', attributes: ['id', 'email', 'status'] }]
//             }
//         ]
//     });
// }

// // ✅ Create a new request (allows inactive employees)
// async function create(params) {
//     const { type, items, status, employeeId } = params;

//     if (!employeeId) throw new Error('Employee is required');

//     // request.service.js
//     const employee = await db.Employee.findByPk(employeeId, {
//     include: [{ model: db.Account, as: 'account' }]
//     });
    
//     if (!employee) throw new Error('Employee not found');

//     // Log if employee account is inactive
//     if (employee.account?.status !== 'Active') {
//         console.warn(`Creating request for inactive employee: ${employee.employeeId}`);
//     }

//     const request = await db.Request.create({
//         type,
//         items,
//         status: status || 'Pending',
//         employeeId: employee.id
//     });

//     return await getById(request.id);
// }

// // ✅ Update request
// async function update(id, params) {
//     const request = await getById(id);
//     if (!request) throw new Error('Request not found');

//     Object.assign(request, params);
//     await request.save();

//     return await getById(request.id);
// }

// // ✅ Fetch employees with active accounts (for dropdown)
// async function getActiveEmployees() {
//     const employees = await db.Employee.findAll({
//         include: [
//             {
//                 model: db.Account,
//                 as: 'account',
//                 attributes: ['id', 'email', 'status'],
//                 where: { status: 'Active' }
//             }
//         ],
//         order: [['employeeId', 'ASC']]
//     });

//     return employees.map(e => ({
//         id: e.id,
//         employeeId: e.employeeId,
//         account: e.account ? { id: e.account.id, email: e.account.email } : null
//     }));
// }

// // ✅ Fetch all employees (active + inactive)
// async function getAllEmployees() {
//     const employees = await db.Employee.findAll({
//         include: [
//             {
//                 model: db.Account,
//                 as: 'account',
//                 attributes: ['id', 'email', 'status']
//             }
//         ],
//         order: [['employeeId', 'ASC']]
//     });

//     return employees.map(e => ({
//         id: e.id,
//         employeeId: e.employeeId,
//         account: e.account
//             ? { id: e.account.id, email: e.account.email, status: e.account.status }
//             : null
//     }));
// }








// //request.service.js
// const db = require('_helpers/db');

// module.exports = {
//     getAll,
//     getById,
//     create,
//     update,
//     getActiveEmployees,
//     getAllEmployees
// };

// // ------------------ FUNCTIONS ------------------

// // ✅ Fetch all requests with their employees + account info
// async function getAll() {
//     const requests = await db.Request.findAll({
//         include: [
//             {
//                 model: db.Employee,
//                 as: 'employee',
//                 attributes: ['id', 'employeeId', 'position', 'departmentId', 'hireDate', 'status'],
//                 include: [
//                     {
//                         model: db.Account,
//                         as: 'account',
//                         attributes: ['id', 'email', 'status']
//                     },
//                       { 
//                         model: db.Department, 
//                         as: 'department', 
//                         attributes: ['name'] // get department name
//                     }
//                 ]
//             }
//         ],
//         order: [['id', 'ASC']]
//     });

//     return requests;
// }

// // ✅ Fetch a single request by ID
// async function getById(id) {
//     return await db.Request.findByPk(id, {
//         include: [
//             {
//                 model: db.Employee,
//                 as: 'employee',
//                 include: [{ model: db.Account, as: 'account', attributes: ['id', 'email', 'status'] }]
//             }
//         ]
//     });
// }

// // ✅ Create a new request (allows inactive employees)
// async function create(params) {
//     const { type, items, status, employeeId } = params;

//     if (!employeeId) throw new Error('Employee is required');

//     // request.service.js
//     const employee = await db.Employee.findByPk(employeeId, {
//     include: [{ model: db.Account, as: 'account' }]
//     });
//     
//     if (!employee) throw new Error('Employee not found');

//     // Log if employee account is inactive
//     if (employee.account?.status !== 'Active') {
//         console.warn(`Creating request for inactive employee: ${employee.employeeId}`);
//     }

//     const request = await db.Request.create({
//         type,
//         items,
//         status: status || 'Pending',
//         employeeId: employee.id
//     });

//     // 🔑 NEW: Create a corresponding Workflow log for the new request
//     await db.Workflow.create({
//         type: `Request: ${type}`, // e.g., 'Request: Leave'
//         details: `Request created by ${employee.employeeId} with status: ${request.status}. Items: ${items}`,
//         status: 'Pending', 
//         employeeId: employee.id, 
//         requestId: request.id
//     });

//     return await getById(request.id);
// }

// // ✅ Update request
// async function update(id, params) {
//     const request = await getById(id);
//     if (!request) throw new Error('Request not found');

//     Object.assign(request, params);
//     await request.save();

//     return await getById(request.id);
// }

// // ✅ Fetch employees with active accounts (for dropdown)
// async function getActiveEmployees() {
//     const employees = await db.Employee.findAll({
//         include: [
//             {
//                 model: db.Account,
//                 as: 'account',
//                 attributes: ['id', 'email', 'status'],
//                 where: { status: 'Active' }
//             }
//         ],
//         order: [['employeeId', 'ASC']]
//     });

//     return employees.map(e => ({
//         id: e.id,
//         employeeId: e.employeeId,
//         account: e.account ? { id: e.account.id, email: e.account.email } : null
//     }));
// }

// // ✅ Fetch all employees (active + inactive)
// async function getAllEmployees() {
//     const employees = await db.Employee.findAll({
//         include: [
//             {
//                 model: db.Account,
//                 as: 'account',
//                 attributes: ['id', 'email', 'status']
//             }
//         ],
//         order: [['employeeId', 'ASC']]
//     });

//     return employees.map(e => ({
//         id: e.id,
//         employeeId: e.employeeId,
//         account: e.account
//             ? { id: e.account.id, email: e.account.email, status: e.account.status }
//             : null
//     }));
// }














// request.service.js
const db = require('_helpers/db');

module.exports = {
  getAll,
  getById,
  create,
  update,
  getActiveEmployees,
  getAllEmployees
};

// ------------------ FUNCTIONS ------------------

// ✅ Fetch all requests with their employees + account info
async function getAll() {
  const requests = await db.Request.findAll({
    include: [
      {
        model: db.Employee,
        as: 'employee',
        attributes: ['id', 'employeeId', 'departmentId', 'hireDate', 'status'], // ❌ removed 'position'
        include: [
          {
            model: db.Account,
            as: 'account',
            attributes: ['id', 'email', 'status']
          },
          { 
            model: db.Department, 
            as: 'department', 
            attributes: ['name'] // get department name
          },
          {
            model: db.Position, // ✅ properly include position
            as: 'position',
            attributes: ['id', 'name', 'hierarchyLevel']
          }
        ]
      }
    ],
    order: [['id', 'ASC']]
  });

  return requests;
}

// ✅ Fetch a single request by ID
async function getById(id) {
  return await db.Request.findByPk(id, {
    include: [
      {
        model: db.Employee,
        as: 'employee',
        include: [
          { model: db.Account, as: 'account', attributes: ['id', 'email', 'status'] },
          { model: db.Department, as: 'department', attributes: ['id', 'name'] },
          { model: db.Position, as: 'position', attributes: ['id', 'name', 'hierarchyLevel'] }
        ]
      }
    ]
  });
}

// ✅ Create a new request (allows inactive employees)
async function create(params) {
  const { type, items, status, employeeId } = params;

  if (!employeeId) throw new Error('Employee is required');

  const employee = await db.Employee.findByPk(employeeId, {
    include: [{ model: db.Account, as: 'account' }]
  });

  if (!employee) throw new Error('Employee not found');

  if (employee.account?.status !== 'Active') {
    console.warn(`Creating request for inactive employee: ${employee.employeeId}`);
  }

  const request = await db.Request.create({
    type,
    items,
    status: status || 'Pending',
    employeeId: employee.id
  });

  // 🔑 Create Workflow log
  await db.Workflow.create({
    type: `Request: ${type}`,
    details: `Request created by ${employee.employeeId} with status: ${request.status}. Items: ${items}`,
    status: 'Pending',
    employeeId: employee.id,
    requestId: request.id
  });

  return await getById(request.id);
}

// ✅ Update request
async function update(id, params) {
  const request = await getById(id);
  if (!request) throw new Error('Request not found');

  Object.assign(request, params);
  await request.save();

  return await getById(request.id);
}

// ✅ Fetch employees with active accounts (for dropdown)
async function getActiveEmployees() {
  const employees = await db.Employee.findAll({
    include: [
      {
        model: db.Account,
        as: 'account',
        attributes: ['id', 'email', 'status'],
        where: { status: 'Active' }
      },
      {
        model: db.Position,
        as: 'position',
        attributes: ['id', 'name']
      }
    ],
    order: [['employeeId', 'ASC']]
  });

  return employees.map(e => ({
    id: e.id,
    employeeId: e.employeeId,
    position: e.position ? e.position.name : null,
    account: e.account ? { id: e.account.id, email: e.account.email } : null
  }));
}

// ✅ Fetch all employees (active + inactive)
async function getAllEmployees() {
  const employees = await db.Employee.findAll({
    include: [
      {
        model: db.Account,
        as: 'account',
        attributes: ['id', 'email', 'status']
      },
      {
        model: db.Position,
        as: 'position',
        attributes: ['id', 'name']
      }
    ],
    order: [['employeeId', 'ASC']]
  });

  return employees.map(e => ({
    id: e.id,
    employeeId: e.employeeId,
    position: e.position ? e.position.name : null,
    account: e.account
      ? { id: e.account.id, email: e.account.email, status: e.account.status }
      : null
  }));
}










// const db = require('_helpers/db');

// module.exports = {
//   getAll,
//   getById,
//   create,
//   update,
//   getActiveEmployees,
//   getAllEmployees
// };

// // ✅ Fetch all requests (admin = all, employee = own)
// async function getAll(filter = {}) {
//   const whereClause = {};

//   // Filter only by employeeId if provided
//   if (filter.employeeId) {
//     whereClause.employeeId = filter.employeeId;
//   }

//   const requests = await db.Request.findAll({
//     where: whereClause,
//     include: [
//       {
//         model: db.Employee,
//         as: 'employee',
//         attributes: ['id', 'employeeId', 'departmentId', 'hireDate', 'status'],
//         include: [
//           { model: db.Account, as: 'account', attributes: ['id', 'email', 'status'] },
//           { model: db.Department, as: 'department', attributes: ['name'] },
//           { model: db.Position, as: 'position', attributes: ['id', 'name', 'hierarchyLevel'] }
//         ]
//       }
//     ],
//     order: [['id', 'ASC']]
//   });

//   return requests;
// }

// // ✅ Fetch single request
// async function getById(id) {
//   return await db.Request.findByPk(id, {
//     include: [
//       {
//         model: db.Employee,
//         as: 'employee',
//         include: [
//           { model: db.Account, as: 'account', attributes: ['id', 'email', 'status'] },
//           { model: db.Department, as: 'department', attributes: ['id', 'name'] },
//           { model: db.Position, as: 'position', attributes: ['id', 'name', 'hierarchyLevel'] }
//         ]
//       }
//     ]
//   });
// }

// // ✅ Create a new request
// async function create(params) {
//   const { type, items, status, employeeId } = params;
//   if (!employeeId) throw new Error('Employee is required');

//   const employee = await db.Employee.findByPk(employeeId, {
//     include: [{ model: db.Account, as: 'account' }]
//   });
//   if (!employee) throw new Error('Employee not found');

//   const request = await db.Request.create({
//     type,
//     items,
//     status: status || 'Pending',
//     employeeId: employee.id
//   });

//   await db.Workflow.create({
//     type: `Request: ${type}`,
//     details: `Request created by ${employee.employeeId} with status: ${request.status}. Items: ${items}`,
//     status: 'Pending',
//     employeeId: employee.id,
//     requestId: request.id
//   });

//   return await getById(request.id);
// }

// // ✅ Update request
// async function update(id, params) {
//   const request = await getById(id);
//   if (!request) throw new Error('Request not found');

//   Object.assign(request, params);
//   await request.save();
//   return await getById(request.id);
// }

// // ✅ Helpers for dropdowns
// async function getActiveEmployees() {
//   const employees = await db.Employee.findAll({
//     include: [
//       {
//         model: db.Account,
//         as: 'account',
//         attributes: ['id', 'email', 'status'],
//         where: { status: 'Active' }
//       },
//       { model: db.Position, as: 'position', attributes: ['id', 'name'] }
//     ],
//     order: [['employeeId', 'ASC']]
//   });

//   return employees.map(e => ({
//     id: e.id,
//     employeeId: e.employeeId,
//     position: e.position ? e.position.name : null,
//     account: e.account ? { id: e.account.id, email: e.account.email } : null
//   }));
// }

// async function getAllEmployees() {
//   const employees = await db.Employee.findAll({
//     include: [
//       { model: db.Account, as: 'account', attributes: ['id', 'email', 'status'] },
//       { model: db.Position, as: 'position', attributes: ['id', 'name'] }
//     ],
//     order: [['employeeId', 'ASC']]
//   });

//   return employees.map(e => ({
//     id: e.id,
//     employeeId: e.employeeId,
//     position: e.position ? e.position.name : null,
//     account: e.account
//       ? { id: e.account.id, email: e.account.email, status: e.account.status }
//       : null
//   }));
// }
