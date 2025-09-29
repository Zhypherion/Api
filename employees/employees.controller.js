    // // file: employees/employees.controller.js
    // const express = require('express');
    // const router = express.Router();
    // const Joi = require('joi');
    // const validateRequest = require('_middleware/validate-request');
    // const authorize = require('_middleware/authorize');
    // const Role = require('_helpers/role');
    // const employeeService = require('./employee.service');

    // // routes
    // router.get('/', /* authorize(Role.Admin), */ getAll);
    // router.get('/next-id', getNextEmployeeId);  // ✅ put here
    // router.get('/:id', authorize(), getById);
    // router.post('/', authorize(Role.Admin), createSchema, create);
    // router.put('/:id', authorize(Role.Admin), updateSchema, update);
    // router.delete('/:id', authorize(Role.Admin), _delete);

    // module.exports = router;

    // // ===== Schemas =====
    // function createSchema(req, res, next) {
    //     const schema = Joi.object({
    //     accountId: Joi.number().required(),
    //     position: Joi.string().required(),
    //     department: Joi.string().optional(),
    //     departmentId: Joi.number().optional(), // 👈 or use ID
    //     hireDate: Joi.date().required(),
    //     status: Joi.string().valid('Active', 'Inactive').default('Active')
    // });
    //     validateRequest(req, next, schema);
    // }

    // function updateSchema(req, res, next) {
    //     const schema = Joi.object({
    //     accountId: Joi.number().empty(''),
    //     position: Joi.string().empty(''),
    //     department: Joi.string().empty(''),
    //     hireDate: Joi.date().empty(''),
    //     status: Joi.string().valid('Active', 'Inactive').empty('')
    // });
    //     validateRequest(req, next, schema);
    // }

    // // ===== Route Handlers =====
    // function getAll(req, res, next) {
    //     employeeService.getAll()
    //         .then(employee => res.json(employee))
    //         .catch(next);
    // }

    // function getById(req, res, next) {
    //     employeeService.getById(req.params.id)
    //         .then(employee => employee ? res.json(employee) : res.sendStatus(404))
    //         .catch(next);
    // }

    // function getNextEmployeeId(req, res, next) {
    // employeeService.getNextEmployeeId()
    //     .then(nextId => res.json({ nextId }))
    //     .catch(next);
    // }

    // function create(req, res, next) {
    //     employeeService.create(req.body)
    //         .then(employee => res.json(employee))
    //         .catch(next);
    // }

    // function update(req, res, next) {
    //     employeeService.update(req.params.id, req.body)
    //         .then(employee => res.json(employee))
    //         .catch(next);
    // }

    // function _delete(req, res, next) {
    // employeeService.deactivate(req.params.id)
    //     .then(employee => res.json({ message: 'Employee deactivated', employee }))
    //     .catch(next);
    // }








    








// // file: employees/employees.controller.js
// const express = require('express');
// const router = express.Router();
// const Joi = require('joi');
// const validateRequest = require('_middleware/validate-request');
// const authorize = require('_middleware/authorize');
// const Role = require('_helpers/role');
// const employeeService = require('./employee.service');

// // ===== Routes =====
// router.get('/', /* authorize(Role.Admin), */ getAll);
// router.get('/next-id', getNextEmployeeId);
// router.get('/:id', authorize(), getById);
// router.post('/', authorize(Role.Admin), createSchema, create);
// router.put('/:id', authorize(Role.Admin), updateSchema, update);
// router.delete('/:id', authorize(Role.Admin), _delete);

// // ✅ secure transfer route (with schema)
// router.post('/:id/transfer', authorize(Role.Admin), transferSchema, transfer);

// module.exports = router;

// // ===== Schemas =====
// function createSchema(req, res, next) {
//   const schema = Joi.object({
//     accountId: Joi.number().required(),
//     position: Joi.string().required(),
//     department: Joi.string().optional(),
//     departmentId: Joi.number().optional(),
//     hireDate: Joi.date().required(),
//     status: Joi.string().valid('Active', 'Inactive').default('Active')
//   });
//   validateRequest(req, next, schema);
// }

// function updateSchema(req, res, next) {
//   const schema = Joi.object({
//     accountId: Joi.number().empty(''),
//     position: Joi.string().empty(''),
//     department: Joi.string().empty(''),
//     hireDate: Joi.date().empty(''),
//     status: Joi.string().valid('Active', 'Inactive').empty('')
//   });
//   validateRequest(req, next, schema);
// }

// // ✅ Transfer schema
// function transferSchema(req, res, next) {
//   const schema = Joi.object({
//     departmentId: Joi.alternatives().try(Joi.number(), Joi.string()).required()
//   });
//   validateRequest(req, next, schema);
// }

// // ===== Route Handlers =====
// function getAll(req, res, next) {
//   employeeService.getAll()
//     .then(employee => res.json(employee))
//     .catch(next);
// }

// function getById(req, res, next) {
//   employeeService.getById(req.params.id)
//     .then(employee => employee ? res.json(employee) : res.sendStatus(404))
//     .catch(next);
// }

// function getNextEmployeeId(req, res, next) {
//   employeeService.getNextEmployeeId()
//     .then(nextId => res.json({ nextId }))
//     .catch(next);
// }

// function create(req, res, next) {
//   employeeService.create(req.body)
//     .then(employee => res.json(employee))
//     .catch(next);
// }

// function update(req, res, next) {
//   employeeService.update(req.params.id, req.body)
//     .then(employee => res.json(employee))
//     .catch(next);
// }

// function _delete(req, res, next) {
//   employeeService.deactivate(req.params.id)
//     .then(employee => res.json({ message: 'Employee deactivated', employee }))
//     .catch(next);
// }

// // ✅ Transfer handler
// function transfer(req, res, next) {
//   employeeService.transfer(req.params.id, req.body)
//     .then(employee => res.json({ message: 'Employee transferred successfully', employee }))
//     .catch(next);
// }













// file: employees/employees.controller.js
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('_helpers/role');
const employeeService = require('./employee.service');

// ===== Routes =====
router.get('/', /* authorize(Role.Admin), */ getAll);
router.get('/next-id', getNextEmployeeId);
router.get('/:id', authorize(), getById);
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:id', authorize(Role.Admin), updateSchema, update);
router.delete('/:id', authorize(Role.Admin), _delete);

// ✅ new transfer route
router.post('/:id/transfer', authorize(Role.Admin), transferSchema, transfer);

module.exports = router;

// ===== Schemas =====
function createSchema(req, res, next) {
  const schema = Joi.object({
    accountId: Joi.number().required(),
    position: Joi.string().required(),
    department: Joi.string().optional(),
    departmentId: Joi.number().optional(),
    hireDate: Joi.date().required(),
    status: Joi.string().valid('Active', 'Inactive').default('Active')
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    accountId: Joi.number().empty(''),
    position: Joi.string().empty(''),
    department: Joi.string().empty(''),
    departmentId: Joi.number().empty(''),
    hireDate: Joi.date().empty(''),
    status: Joi.string().valid('Active', 'Inactive').empty('')
  });
  validateRequest(req, next, schema);
}

// ✅ transfer schema (allow ID or name)
function transferSchema(req, res, next) {
  const schema = Joi.object({
    departmentId: Joi.alternatives().try(Joi.number(), Joi.string()).required()
  });
  validateRequest(req, next, schema);
}

// ===== Route Handlers =====
function getAll(req, res, next) {
  employeeService.getAll()
    .then(employee => res.json(employee))
    .catch(next);
}

function getById(req, res, next) {
  employeeService.getById(req.params.id)
    .then(employee => employee ? res.json(employee) : res.sendStatus(404))
    .catch(next);
}

function getNextEmployeeId(req, res, next) {
  employeeService.getNextEmployeeId()
    .then(nextId => res.json({ nextId }))
    .catch(next);
}

function create(req, res, next) {
  employeeService.create(req.body)
    .then(employee => res.json(employee))
    .catch(next);
}

function update(req, res, next) {
  employeeService.update(req.params.id, req.body)
    .then(employee => res.json(employee))
    .catch(next);
}

function _delete(req, res, next) {
  // 🔄 Deactivate instead of hard delete
  employeeService.update(req.params.id, { status: 'Inactive' })
    .then(employee => res.json({ message: 'Employee deactivated', employee }))
    .catch(next);
}

// ✅ Transfer handler
function transfer(req, res, next) {
  employeeService.transfer(req.params.id, req.body)
    .then(employee => res.json({ message: 'Employee transferred successfully', employee }))
    .catch(next);
}
