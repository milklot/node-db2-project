const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars');
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars').where("id", id).first();
}

const create = async (newCar) => {
  // DO YOUR MAGIC
  const [id] =  await db('cars').insert(newCar)
    return getById(id)
}

module.exports = {
  getAll,
  getById,
  create
}
