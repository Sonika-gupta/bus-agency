const defaultBus = require("./defaultBus");
const { getPostgresValues } = require("./helpers");
const { Pool } = require("pg");
const connectionObj = {
  user: "postgres",
  password: "1234",
  database: "bus_agency",
}
const pool = new Pool(connectionObj);
pool.connect();

function requestDb(response, query, values = []) {
  console.log("Querying: ", query);
  pool.query(query, values, (error, result) => {
    if (error) {
      response.status(500).send(error);
      throw error;
    } else {
      response.status(200).send(result.rows);
    }
  });
}

const readBuses = (request, response) => {
  const query = "SELECT * FROM buses ORDER BY last_modified";
  return requestDb(response, query);
};
const readBusById = (request, response) => {
  const query = `SELECT * FROM buses WHERE id = $1`;
  requestDb(response, query, [request.params.id]);
};
const createBus = (request, response) => {
  const props = Object.keys(defaultBus).join(",");
  const values = getPostgresValues(defaultBus, request.body).join(',')
  const query = `INSERT INTO buses (${props}) VALUES (${values})`;
  console.log(props, values);
  requestDb(response, query);
};
const updateBus = (request, response) => {
  const { id, key, value } = request.body;
  const query = `UPDATE buses SET $1 = '$2' where id = $3`;
  requestDb(response, query, [key, value, id]);
};
const deleteBus = (request, response) => {
  const query = `DELETE FROM buses WHERE id = $1`;
  requestDb(response, query, [request.body.id]);
};
/* const deleteBuses = (request, response) => {
  const ids = request.body.ids
  const query = `DELETE FROM buses WHERE id IN (${ids.join(', ')})`
  requestDb(query, response, { message: `Buses ${ids} Deleted` })
} */
const readSeats = (request, response) => {
  const query = `SELECT * FROM seats WHERE busId = $1`;
  requestDb(response, query, [request.params.busId]);
};
const updateSeat = (request, response) => {
  const { id, key, value } = request.body;
  const query = `UPDATE seats SET $1 = '$2' where id = $3`;
  requestDb(response, query, [key, value, id]);
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
