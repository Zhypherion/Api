//request.controller.js
const express = require('express');
const router = express.Router();
const requestService = require('./request.service');
const db = require('_helpers/db'); // 👈 ADD THIS LINE
// Routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);

// extra helpers for dropdowns
router.get('/helpers/active-employees', getActiveEmployeesRoute);
router.get('/helpers/all-employees', getAllEmployeesRoute);


router.get('/types', getTypes);

module.exports = router;

// ------------------ ROUTE HANDLERS ------------------

function getAll(req, res, next) {
    requestService.getAll()
        .then(requests => res.json(requests))
        .catch(next);
}

function getById(req, res, next) {
    requestService.getById(req.params.id)
        .then(request => res.json(request))
        .catch(next);
}

function create(req, res, next) {
    requestService.create(req.body)
        .then(request => res.json(request))
        .catch(next);
}

function update(req, res, next) {
    requestService.update(req.params.id, req.body)
        .then(request => res.json(request))
        .catch(next);
}

function getActiveEmployeesRoute(req, res, next) {
    requestService.getActiveEmployees()
        .then(employees => res.json(employees))
        .catch(next);
}

function getAllEmployeesRoute(req, res, next) {
    requestService.getAllEmployees()
        .then(employees => res.json(employees))
        .catch(next);
}

function getTypes(req, res, next) {
  res.json(['Equipment','Leave','Resource']);
}
