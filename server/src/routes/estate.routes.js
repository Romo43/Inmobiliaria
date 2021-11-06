import { Router } from 'express'
const router = Router();

// Get all estate controllers
import * as estateCtrl from '../controllers/estate.controller'

// Get all estates
router.get('/', estateCtrl.allEstates)
// Get estate by Id
router.get('/:id', estateCtrl.findEstate)
// Create new estate
router.post('/', estateCtrl.createEstate)
// Update all estate by Id
router.patch('/:id', estateCtrl.updateEstate)
// Update estate status by Id and status
router.put('/:id/:status', estateCtrl.statusEstate)
// Delete este by Id
router.delete('/:id', estateCtrl.deleteEstate)

export default router