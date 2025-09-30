//workflow.controller
const express = require('express');
const router = express.Router();
const workflowService = require('./workflow.service');
const db = require('_helpers/db'); // 👈 REQUIRED IMPORT

// Routes
router.get('/', getAll);                              // get all workflows
router.get('/employee/:employeeId', getByEmployeeId); // get workflows of one employee
router.get('/:id', getById);                          // get workflow by id
router.post('/', create);                             // add new workflow
router.put('/:id', update);                           // update workflow

module.exports = router;

// ------------------ ROUTE HANDLERS ------------------

function getAll(req, res, next) {
    workflowService.getAll()
        .then(workflows => res.json(workflows))
        .catch(next);
}

// 🔑 FIXED: Logic to convert public employeeId (EMP001) to internal ID
async function getByEmployeeId(req, res, next) {
  try {
    // 1. Find the Employee's internal primary key (id) using the public string employeeId
    const employee = await db.Employee.findOne({
      where: { employeeId: req.params.employeeId }, 
      attributes: ['id'] // Only fetch the internal primary key
    });

    if (!employee) {
        // If the employee ID doesn't exist, return an empty array gracefully
        return res.json([]); 
    }

    // 2. Use the Employee's internal ID to find the workflows
    const workflows = await db.Workflow.findAll({
      where: { employeeId: employee.id }, // Use the internal numeric employee.id
      include: [
        { model: db.Request, as: 'request' }
      ],
      order: [['id', 'DESC']]
    });
    res.json(workflows);
  } catch (err) {
    next(err); 
  }
}

function getById(req, res, next) {
    workflowService.getById(req.params.id)
        .then(workflow => res.json(workflow))
        .catch(next);
}

function create(req, res, next) {
    workflowService.create(req.body)
        .then(workflow => res.json(workflow))
        .catch(next);
}

function update(req, res, next) {
    workflowService.update(req.params.id, req.body)
        .then(workflow => res.json(workflow))
        .catch(next);
}