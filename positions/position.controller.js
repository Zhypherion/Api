const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('_helpers/role');
const positionService = require('./position.service');

router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:id', authorize(Role.Admin), updateSchema, update);
router.delete('/:id', authorize(Role.Admin), _delete);

module.exports = router;

function createSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    status: Joi.string().valid('Active', 'Inactive').default('Active'),
    hierarchyLevel: Joi.string().valid('Worker', 'Supervisor', 'Manager').required(),
    departmentId: Joi.number().required(),
    // workflowId: Joi.number().optional().allow(null) 
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().empty(''),
    status: Joi.string().valid('Active', 'Inactive').empty(''),
    hierarchyLevel: Joi.string().valid('Worker', 'Supervisor', 'Manager').empty(''),
    departmentId: Joi.number().empty('') // Assuming you added this
    // // 👇 ADD: workflowId
    // workflowId: Joi.number().optional().allow(null).empty('')
  });
  validateRequest(req, next, schema);
}

function getAll(req, res, next) {
  positionService.getAll().then(p => res.json(p)).catch(next);
}
function getById(req, res, next) {
  positionService.getById(req.params.id).then(p => res.json(p)).catch(next);
}
function create(req, res, next) {
  positionService.create(req.body).then(p => res.json(p)).catch(next);
}
function update(req, res, next) {
  positionService.update(req.params.id, req.body).then(p => res.json(p)).catch(next);
}
function _delete(req, res, next) {
  positionService.delete(req.params.id).then(() => res.json({ message: 'Deleted' })).catch(next);
}
