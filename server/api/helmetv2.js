const router = require('express').Router();
const HelmetHelper = require('../helpers/HelmetHelper');
const CommonHelper = require('../helpers/CommonHelper');
const ValidationHelper = require('../helpers/ValidationHelper');

const getListHelmetV2 = async (req, res) => {
  try {
    // get data from json
    const data = await HelmetHelper.getAllHelmetV2();
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Helmet', 'Get List Helmet', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const getListTypeHelmetV2 = async (req, res) => {
  try {
    const data = await HelmetHelper.getListTypeHelmetV2();
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Helmet', 'Get Type Helmet', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });

    return res.send(CommonHelper.errorResponse(error));
  }
};

const addHelmetV2 = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.helmetAddValidation(req.body);
    // get data from json
    const data = await HelmetHelper.addHelmetV2(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Helmet Helper', 'Add Helmet', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const editHelmetV2 = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.helmetEditValidation(req.body);
    // get data from json
    const data = await HelmetHelper.editHelmetV2(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Helmet', 'Edit Helmet', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const deleteHelmetV2 = async (req, res) => {
  try {
    // get data from json
    const data = await HelmetHelper.deleteHelmetV2(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Helmet', 'Delete Helmet', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

router.get('/', CommonHelper.preHandler, getListHelmetV2);
router.get('/type', CommonHelper.preHandler, getListTypeHelmetV2);
router.post('/add_helmet', CommonHelper.preHandler, addHelmetV2);
router.put('/edit_helmet/:id', CommonHelper.preHandler, editHelmetV2);
router.delete('/delete/:id', CommonHelper.preHandler, deleteHelmetV2);

module.exports = router;
