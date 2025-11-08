// //request.model.js
// module.exports = (sequelize, DataTypes) => {
//   const Request = sequelize.define('Request', {
//     type: { type: DataTypes.ENUM('Equipment', 'Leave', 'Resource'),allowNull: false },
//     items: { type: DataTypes.STRING, allowNull: false },
//     status: { type: DataTypes.STRING, defaultValue: 'Pending' },
//     employeeId: { type: DataTypes.INTEGER, allowNull: false }
//   });

//   Request.associate = (models) => {
//     Request.belongsTo(models.Employee, {
//       foreignKey: 'employeeId',
//       as: 'employee'
//     });
//   };

//   return Request;
// };





module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    type: { 
      type: DataTypes.ENUM('Equipment', 'Leave', 'Resource'),
      allowNull: false 
    },
    items: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    status: { 
      type: DataTypes.STRING, 
      defaultValue: 'Pending' 
    },
    employeeId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },

    // ✅ NEW FIELDS (optional)
    approvedBy: { type: DataTypes.INTEGER, allowNull: true },
    approvedAt: { type: DataTypes.DATE, allowNull: true },
    rejectedBy: { type: DataTypes.INTEGER, allowNull: true },
    rejectedAt: { type: DataTypes.DATE, allowNull: true },
    rejectionReason: { type: DataTypes.STRING, allowNull: true },
  });

  // Relationships
  Request.associate = (models) => {
    Request.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
      as: 'employee'
    });

    // Optional: if you have an Account model for admin/manager users
    // Request.belongsTo(models.Account, {
    //   foreignKey: 'approvedBy',
    //   as: 'approver'
    // });
  };

  return Request;
};
