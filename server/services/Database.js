const MySQL = require('promise-mysql2');
const CommonHelper = require('../helpers/CommonHelper');

const connectionPool = MySQL.createPool({
  host: process.env.MYSQL_CONFIG_HOST || 'localhost',
  user: process.env.MYSQL_CONFIG_USER || 'root',
  password: process.env.MYSQL_CONFIG_PASSWORD || 'password',
  database: process.env.MYSQL_CONFIG_DATABASE || 'helmet_store',
  port: Number(process.env.MYSQL_PORT) || 3306,
  connectionLimit: Number(process.env.MYSQL_CONN_LIMIT) || 0
});

const helmetTable = process.env.HELMET_TABLE || 'helmets';
const helmetTypeTable = process.env.HELMET_TYPE_TABLE || 'type';

// Helmet

const getListHelmet = async () => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const querySelect =
      'helmets.id, helmets.name, helmets.price, helmets.stock, helmets.name, type.name as type FROM helmets INNER JOIN type ON helmets.type_id=type.id';
    const [rawResult] = await connection.query(`SELECT ${querySelect}`);
    const result = Object.values(JSON.parse(JSON.stringify(rawResult)));

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'getListHelmet', 'INFO'], {
      message: { timeTaken },
      result
    });

    return result;
  } catch (error) {
    CommonHelper.log(['Database', 'getListHelmet', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getTypeHelmet = async () => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const [rawResult] = await connection.query(`SELECT * FROM ${helmetTypeTable}`);
    const result = Object.values(JSON.parse(JSON.stringify(rawResult)));

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'getListTypeHelmet', 'INFO'], {
      message: { timeTaken },
      result
    });

    return result;
  } catch (error) {
    CommonHelper.log(['Database', 'getListTypeHelmet', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const addHelmet = async (type, name, price, stock) => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const query = `INSERT INTO ${helmetTable} (type_id, name, price, stock) VALUES (?, ?, ?, ?)`;
    const values = [type, name, price, stock];
    await connection.query(query, values);

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'addHelmet', 'INFO'], {
      message: { timeTaken }
    });
  } catch (error) {
    CommonHelper.log(['Database', 'addHelmet', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const editHelmet = async (id, price, stock) => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const query = `UPDATE ${helmetTable} SET price = ?, stock = ? WHERE id = ?`;
    const values = [price, stock, id];
    const [result] = await connection.query(query, values);

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'editHelmet', 'INFO'], {
      message: { timeTaken }
    });
    return result?.affectedRows > 0;
  } catch (error) {
    CommonHelper.log(['Database', 'editHelmet', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const deleteHelmet = async (id) => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const query = `DELETE FROM ${helmetTable} WHERE id = ?`;
    const values = [id];
    const [result] = await connection.query(query, values);

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'deleteHelmet', 'INFO'], {
      message: { timeTaken }
    });
    return result?.affectedRows > 0;
  } catch (error) {
    CommonHelper.log(['Database', 'deleteHelmet', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  getListHelmet,
  getTypeHelmet,
  addHelmet,
  editHelmet,
  deleteHelmet
};
