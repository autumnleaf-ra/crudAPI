const Boom = require('boom');

const CommonHelper = require('./CommonHelper');
const Database = require('../services/Database');
const Prisma = require('../services/Prisma');

// Get All Helmet - DB
const getAllHelmet = async () => {
  try {
    const data = await Database.getListHelmet();

    if (data.length === 0) {
      return Boom.notFound('Helmet not found');
    }

    return {
      count: data.length,
      list: data
    };
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'getAllHelmet', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getTypeHelmet = async () => {
  try {
    const data = await Database.getTypeHelmet();

    if (data.length === 0) {
      return Boom.notFound('Type Helmet not found');
    }

    return {
      count: data.length,
      list: data
    };
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'getTypeHelmet', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const addHelmet = async (req) => {
  try {
    await Database.addHelmet(req.body.type, req.body.name, req.body.price, req.body.stock);
    return `Added '${req.body.name}' as '${req.body.price}' to helmet with stock ${req.body.stock}`;
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'addHelmet', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const editHelmet = async (req) => {
  try {
    const editAction = await Database.editHelmet(req.params.id, req.body.price, req.body.stock);

    if (!editAction) {
      return Boom.notFound(`Helmet with id ${req.params.id} not found `);
    }
    return `Helmet with id ${req.params.id} has been updated price to ${req.body.price} and stock to ${req.body.stock} `;
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'editHelmet', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const deleteHelmet = async (req) => {
  try {
    const deleteAction = await Database.deleteHelmet(req.params.id);

    if (!deleteAction) {
      return Boom.notFound(`Helmet with id ${req.params.id} not found `);
    }
    return `Delete id ${req.params.id} successfully`;
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'deleteHelmet', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

// Get All Helmet - Prisma
const getAllHelmetV2 = async () => {
  try {
    const data = await Prisma.getListHelmet();

    if (data.length === 0) {
      return Boom.notFound('Helmet not found');
    }

    const newData = data.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      stock: item.stock,
      type: item.type.name
    }));

    return {
      count: data.length,
      list: newData
    };
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'getAllHelmet', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getListTypeHelmetV2 = async () => {
  try {
    const data = await Prisma.getTypeHelmet();

    if (data.length === 0) {
      return Boom.notFound('Helmet not found');
    }

    return {
      count: data.length,
      list: data
    };
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'getAllHelmet', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const addHelmetV2 = async (req) => {
  try {
    await Prisma.addHelmet(req.body.type, req.body.name, req.body.price, req.body.stock);
    return `Added '${req.body.name}' as '${req.body.price}' to helmet with stock ${req.body.stock}`;
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'addHelmet', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const editHelmetV2 = async (req) => {
  try {
    const editAction = await Prisma.editHelmet(req.params.id, req.body.price, req.body.stock);

    if (!editAction) {
      return Boom.notFound(`Helmet with id ${req.params.id} not found `);
    }
    return `Helmet with id ${req.params.id} has been updated price to ${req.body.price} and stock to ${req.body.stock} `;
  } catch (error) {
    CommonHelper.log(['PhoneBook Helper', 'editPhonebook', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const deleteHelmetV2 = async (req) => {
  try {
    const deleteAction = await Prisma.deleteHelmet(req.params.id);

    if (!deleteAction) {
      return Boom.notFound(`Helmet with id ${req.params.id} not found `);
    }
    return `Delete id ${req.params.id} successfully`;
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'deleteHelmet', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

module.exports = {
  getAllHelmet,
  getTypeHelmet,
  addHelmet,
  editHelmet,
  deleteHelmet,
  getAllHelmetV2,
  getListTypeHelmetV2,
  addHelmetV2,
  editHelmetV2,
  deleteHelmetV2
};
