var express = require('express');
var router = express.Router();
var controller = require('../controllers/dashboard.controller');


router.get('/',controller.index);
//Employee API
router.get('/api/employees',controller.get);
router.post('/api/employees',controller.store);
router.get('/api/employees/:id',controller.detail);
router.post('/api/employees/:id',controller.update);
router.delete('/api/employees/:id',controller.delete);
//Personal API
router.get('/api/personal',controller.getPersonal);
router.post('/api/personal',controller.storePersonal);
// router.get('/api/personal/:id',controller.detailPersonal);
router.post('/api/personal/:id',controller.updatePersonal);
router.delete('/api/personal/:id',controller.deletePersonal);
module.exports = router