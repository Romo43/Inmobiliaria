const router = require('express').Router();

// Get all estate controllers
const API = require('../controllers/estate.controller.js');

// Get all estates
router.get('/', API.allEstates);
// Get estate by Id
router.get('/:id', API.findEstate);
// Create new estate
router.post('/', API.createEstate);
// Update all estate by Id
router.patch('/:id', API.updateEstate);
// Update estate status by Id and status
router.put('/:id', API.statusEstate);
// Delete este by Id
router.delete('/:id', API.deleteEstate)

module.exports = router;