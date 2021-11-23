const router = require('express').Router();
// Verify token
const authCtrl = require("../middlewares/authJwt");
// Get all estate controllers
const estateCtrl = require('../controllers/estate.controller.js');

// Get all estates
router.get('/', estateCtrl.allEstates);
// Get estate by Id
router.get('/:id', estateCtrl.findEstate);
// Create new estate
router.post('/', [authCtrl.verifyToken, authCtrl.isEmployee], estateCtrl.createEstate);
// Update all estate by Id
router.patch('/:id', [authCtrl.verifyToken, authCtrl.isEmployee], estateCtrl.updateEstate);
// Update estate status by Id and status
router.put('/:id', [authCtrl.verifyToken, authCtrl.isEmployee], estateCtrl.statusEstate);
// Delete este by Id
router.delete('/:id', [authCtrl.verifyToken, authCtrl.isAdmin], estateCtrl.deleteEstate)

module.exports = router;