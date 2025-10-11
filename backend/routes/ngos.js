const express = require('express');
const router = express.Router();
const ngoController = require('../controllers/ngoController');

router.get('/', ngoController.getAllNgos);
router.get('/:id', ngoController.getNgoById);
router.post('/', ngoController.createNgo);
router.put('/:id', ngoController.updateNgo);
router.patch('/:id/status', ngoController.updateNgoStatus);

module.exports = router;
