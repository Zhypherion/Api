//workflow.controller
const express = require('express');
const router = express.Router();
const workflowService = require('./workflow.service');

// Routes
router.get('/', getAll);                              // get all workflows
router.get('/employee/:employeeId', getByEmployeeId); // get workflows of one employee
router.get('/:id', getById);                          // get workflow by id
router.post('/', create);                             // add new workflow
router.put('/:id', update);                           // update workflow

module.exports = router;

// ------------------ ROUTE HANDLERS ------------------

function getAll(req, res, next) {
    workflowService.getAll()
        .then(workflows => res.json(workflows))
        .catch(next);
}

async function getByEmployeeId(req, res, next) {
  try {
    const workflows = await db.Workflow.findAll({
      where: { employeeId: req.params.employeeId },
      include: [
        { model: db.Request, as: 'request' }
      ]
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