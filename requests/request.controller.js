// //request.controller.js
// const express = require('express');
// const router = express.Router();
// const requestService = require('./request.service');
// const db = require('_helpers/db'); // 👈 ADD THIS LINE
// // Routes
// router.get('/', getAll);
// router.get('/:id', getById);
// router.post('/', create);
// router.put('/:id', update);

// // extra helpers for dropdowns
// router.get('/helpers/active-employees', getActiveEmployeesRoute);
// router.get('/helpers/all-employees', getAllEmployeesRoute);


// router.get('/types', getTypes);

// module.exports = router;

// // ------------------ ROUTE HANDLERS ------------------

// function getAll(req, res, next) {
//     requestService.getAll()
//         .then(requests => res.json(requests))
//         .catch(next);
// }

// function getById(req, res, next) {
//     requestService.getById(req.params.id)
//         .then(request => res.json(request))
//         .catch(next);
// }

// function create(req, res, next) {
//     requestService.create(req.body)
//         .then(request => res.json(request))
//         .catch(next);
// }

// function update(req, res, next) {
//     requestService.update(req.params.id, req.body)
//         .then(request => res.json(request))
//         .catch(next);
// }

// function getActiveEmployeesRoute(req, res, next) {
//     requestService.getActiveEmployees()
//         .then(employees => res.json(employees))
//         .catch(next);
// }

// function getAllEmployeesRoute(req, res, next) {
//     requestService.getAllEmployees()
//         .then(employees => res.json(employees))
//         .catch(next);
// }

// function getTypes(req, res, next) {
//   res.json(['Equipment','Leave','Resource']);
// }














//Original is above uncomment above if below is wrong


const express = require('express');
const router = express.Router();
const requestService = require('./request.service');
const db = require('_helpers/db');

// Routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);

// ✅ NEW: Approve / Reject routes
router.put('/:id/approve', approve);
router.put('/:id/reject', reject);

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

// ✅ APPROVE request
function approve(req, res, next) {
  const id = req.params.id;

  db.Request.findByPk(id)
    .then(request => {
      if (!request) return res.status(404).json({ message: 'Request not found' });

      request.status = 'Approved';
      request.approvedAt = new Date();
      request.approvedBy = req.user?.id || null; // optional if using auth middleware

      return request.save();
    })
    .then(() => res.json({ message: 'Request approved successfully' }))
    .catch(next);
}

// ✅ REJECT request
function reject(req, res, next) {
  const id = req.params.id;
  const { reason } = req.body; // optional reason

  db.Request.findByPk(id)
    .then(request => {
      if (!request) return res.status(404).json({ message: 'Request not found' });

      request.status = 'Rejected';
      request.rejectedAt = new Date();
      request.rejectedBy = req.user?.id || null;
      request.rejectionReason = reason || 'No reason provided';

      return request.save();
    })
    .then(() => res.json({ message: 'Request rejected successfully' }))
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
  res.json(['Equipment', 'Leave', 'Resource']);
}







// const express = require('express');
// const router = express.Router();
// const requestService = require('./request.service');
// const db = require('_helpers/db');

// // Routes
// router.get('/', getAll);
// router.get('/:id', getById);
// router.post('/', create);
// router.put('/:id', update);

// // extra helpers
// router.get('/helpers/active-employees', getActiveEmployeesRoute);
// router.get('/helpers/all-employees', getAllEmployeesRoute);
// router.get('/types', getTypes);

// module.exports = router;

// // ------------------ ROUTE HANDLERS ------------------

// function getAll(req, res, next) {
//   const { employeeId } = req.query; // 👈 optional filter
//   requestService.getAll(employeeId ? { employeeId } : {})
//     .then(requests => res.json(requests))
//     .catch(next);
// }

// function getById(req, res, next) {
//   requestService.getById(req.params.id)
//     .then(request => res.json(request))
//     .catch(next);
// }

// function create(req, res, next) {
//   requestService.create(req.body)
//     .then(request => res.json(request))
//     .catch(next);
// }

// function update(req, res, next) {
//   requestService.update(req.params.id, req.body)
//     .then(request => res.json(request))
//     .catch(next);
// }

// function getActiveEmployeesRoute(req, res, next) {
//   requestService.getActiveEmployees()
//     .then(employees => res.json(employees))
//     .catch(next);
// }

// function getAllEmployeesRoute(req, res, next) {
//   requestService.getAllEmployees()
//     .then(employees => res.json(employees))
//     .catch(next);
// }

// function getTypes(req, res, next) {
//   res.json(['Equipment', 'Leave', 'Resource']);
// }
