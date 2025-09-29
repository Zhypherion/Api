module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    type: { type: DataTypes.ENUM('Equipment', 'Leave', 'Resource'),allowNull: false },
    items: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'Pending' },
    employeeId: { type: DataTypes.INTEGER, allowNull: false }
  });

  Request.associate = (models) => {
    Request.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
      as: 'employee'
    });
  };

  return Request;
};
