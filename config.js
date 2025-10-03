// config.js
module.exports = {
  database: {
    host: process.env.MYSQLHOST || 'localhost',
    port: process.env.MYSQLPORT || 25699,
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || 'root',
    database: process.env.MYSQLDATABASE || 'node-mysql-signup-verification-api-latest',
  },
  secret: process.env.JWT_SECRET || '280062ee-c5f2-43d1-bafb-ecf1f7901952',
  emailFrom: process.env.EMAIL_FROM || 'info@node-mysql-signup-verification-api.com',
  smtpOptions: {
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    auth: {
      user: process.env.SMTP_USER || 'mohamed.swift31@ethereal.email',
      pass: process.env.SMTP_PASS || '3bTvCbEx7b9MFZdT8b',
    },
  },
};
