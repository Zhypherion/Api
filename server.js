// require('rootpath')();
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const errorHandler = require('_middleware/error-handler');
// const employeesController = require('./employees/employees.controller');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cookieParser());

// // allow cors requests from any origin and with credentials
// app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// // api routes
// app.use('/accounts', require('./accounts/accounts.controller'));
// app.use('/employees', require('./employees/employees.controller'));  // ✅ enable employees API
// app.use('/requests', require('./requests/request.controller'));  // ✅ enable requests API
// app.use('/workflows', require('./workflows/workflow.controller'));  // ✅ enable workflows API
// app.use('/departments', require('./departments/departments.controller'));
// app.use('/positions', require('./positions/position.controller'));





// // swagger docs route
// app.use('/api-docs', require('_helpers/swagger'));

// // global error handler
// app.use(errorHandler);

// // start server
// const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
// app.listen(port, () => console.log('Server listening on port ' + port));










// file: server.js
require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

// ===== Middleware =====
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// ===== CORS Configuration =====
const allowedOrigins = [
  'http://localhost:4200',                      // Angular local dev
  'https://frontend-seven-eta-11.vercel.app'    // Deployed frontend (Vercel)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'CORS policy: This origin is not allowed - ' + origin;
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  credentials: true,
}));

// ✅ Handle preflight requests globally
app.options('*', cors());

// ===== API Routes =====
app.use('/accounts', require('./accounts/accounts.controller'));
app.use('/employees', require('./employees/employees.controller'));
app.use('/requests', require('./requests/request.controller'));
app.use('/workflows', require('./workflows/workflow.controller'));
app.use('/departments', require('./departments/departments.controller'));
app.use('/positions', require('./positions/position.controller'));

// ===== Swagger Docs (optional) =====
app.use('/api-docs', require('_helpers/swagger'));

// ===== Global Error Handler =====
app.use(errorHandler);

// ===== Start Server =====
const port = process.env.NODE_ENV === 'production'
  ? (process.env.PORT || 80)
  : 4000;

app.listen(port, () => console.log(`✅ Server running on port ${port}`));
