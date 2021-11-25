const router = require('express').Router();
// Verify token
const authCtrl = require("../middlewares/authJwt");
// Get all estate controllers
const estateCtrl = require('../controllers/estate.controller.js');

// Get all public estates
router.get('/public_estates',estateCtrl.allPublicEstates);
// Get all user estates
router.get('/user_estates', [authCtrl.verifyToken, authCtrl.authorizedPersonalOnly], estateCtrl.allUserEstates);
// Get estate by Id
router.get('/:id', estateCtrl.findEstate);
// Create new estate
router.post('/', [authCtrl.verifyToken, authCtrl.authorizedPersonalOnly], estateCtrl.createEstate);
// Update all estate by Id
router.patch('/:id', [authCtrl.verifyToken, authCtrl.authorizedPersonalOnly], estateCtrl.updateEstate);
// Update estate status by Id and status
router.put('/:id', [authCtrl.verifyToken, authCtrl.authorizedPersonalOnly], estateCtrl.updateEstateStatus);
// Delete este by Id
router.delete('/:id', [authCtrl.verifyToken, authCtrl.onlyAdmin], estateCtrl.deleteEstate);

module.exports = router;