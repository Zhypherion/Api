const db = require('_helpers/db');

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await db.Position.findAll({
    include: [
      {
        model: db.Department,
        as: 'department', // alias (must match your association)
        attributes: ['id', 'name']
      }
    ],
    order: [['hierarchyLevel', 'ASC']]
  });
}

async function getById(id) {
  return await db.Position.findByPk(id);
}

async function create(params) {
  return await db.Position.create(params);
}

async function update(id, params) {
  const position = await getById(id);
  if (!position) throw 'Position not found';
  Object.assign(position, params);
  await position.save();
  return position;
}

async function _delete(id) {
  const position = await getById(id);
  if (!position) throw 'Position not found';
  await position.destroy();
}
