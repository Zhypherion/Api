// workflow.model.js
module.exports = (sequelize, DataTypes) => {
  const Workflow = sequelize.define('Workflow', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  details: {   // ✅ renamed from items
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
    allowNull: false,
    defaultValue: 'Pending'
  }
});



  return Workflow;
};