const router = require('express').Router();
const HelmetHelper = require('../helpers/HelmetHelper');
const CommonHelper = require('../helpers/CommonHelper');
const ValidationHelper = require('../helpers/ValidationHelper');

const getListHelmet = async (req, res) => {
  try {
    const data = await HelmetHelper.getAllHelmet();
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Helmet', 'Get List Helmet', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });

    return res.send(CommonHelper.errorResponse(error));
  }
};

const getListTypeHelmet = async (req, res) => {
  try {
    const data = await HelmetHelper.getTypeHelmet();
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Helmet', 'Get Type Helmet', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });

    return res.send(CommonHelper.errorResponse(error));
  }
};

const addHelmet = async (req, res) => {
  try {
    // TODO : Add Validation
    ValidationHelper.helmetAddValidation(req.body);
    const data = await HelmetHelper.addHelmet(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Helmet', 'Add Helmet', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });

    return res.send(CommonHelper.errorResponse(error));
  }
};

const editHelmet = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.helmetEditValidation(req.body);
    // get data from json
    const data = await HelmetHelper.editHelmet(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Helmet', 'Edit Helmet', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const deleteHelmet = async (req, res) => {
  try {
    // get data from json
    const data = await HelmetHelper.deleteHelmet(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Helmet', 'Delete Helmet', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

router.get('/', CommonHelper.preHandler, getListHelmet);
router.get('/type', CommonHelper.preHandler, getListTypeHelmet);
router.post('/add_helmet', CommonHelper.preHandler, addHelmet);
router.put('/edit_helmet/:id', CommonHelper.preHandler, editHelmet);
router.delete('/delete/:id', CommonHelper.preHandler, deleteHelmet);

module.exports = router;
