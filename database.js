const defaultBus = require("./defaultBus");
const { camelCase, getPostgresValues } = require("./helpers");
const { Pool } = require("pg");
const connectionObj = {
  user: "postgres",
  password: "1234",
  database: "bus_agency",
}
const pool = new Pool(connectionObj);
pool.connect();

function requestDb(text, response) {
  console.log("Querying: ", text);
  pool.query(text, (error, result) => {
    if (error) {
      response.status(500);
      throw error;
    } else {
      response.status(200).send(result.rows);
    }
  });
}

const readBuses = (request, response) => {
  const query = "SELECT * FROM buses ORDER BY last_modified";
  return requestDb(query, response);
};
const readBusById = (request, response) => {
  const id = request.params.id;
  const query = `SELECT * FROM buses WHERE id =${id}`;
  requestDb(query, response);
};
const createBus = (request, response) => {

  const props = Object.keys(defaultBus).join(",");
  const values = getPostgresValues(defaultBus, request.body).join(',')
  const query = `INSERT INTO buses (${props}) VALUES (${values}) RETURNING *`;
  console.log(props, values);
  requestDb(query, response);
};
const updateBus = (request, response) => {
  const { id, key, value } = request.body;
  const query = `UPDATE buses SET ${key} = '${value}' where id = ${id}`;
  requestDb(query, response, { message: `Bus ${id} modified` });
};
const deleteBus = (request, response) => {
  const id = request.body.id;
  const query = `DELETE FROM buses WHERE id = ${id}`;
  requestDb(query, response, { message: `Bus ${id} Deleted` });
};
/* const deleteBuses = (request, response) => {
  const ids = request.body.ids
  const query = `DELETE FROM buses WHERE id IN (${ids.join(', ')})`
  requestDb(query, response, { message: `Buses ${ids} Deleted` })
} */
const readSeats = (request, response) => {
  const busId = request.params.busId;
  const query = `SELECT * FROM seats WHERE busId = ${busId}`;
  requestDb(query, response);
};
const updateSeat = (request, response) => {
  const { id, key, value } = request.body;
  const query = `UPDATE seats SET ${key} = '${value}' where id = ${id}`;
  requestDb(query, response, { message: `Seat ${id} modified` });
};

module.exports = {
  readBuses,
  readBusById,
  createBus,
  updateBus,
  deleteBus,
  //   deleteBuses,
  readSeats,
  updateSeat,
};
