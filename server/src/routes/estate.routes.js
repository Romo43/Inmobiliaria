import { Router } from 'express'
const router = Router();
import * as estateCtrl from '../controllers/estate.controller'

router.get('/', estateCtrl.allEstates)
router.get('/:id', estateCtrl.findEstate)
router.post('/', estateCtrl.createEstate)
router.patch('/:id', estateCtrl.updateEstate)
router.patch('/:id/:status', estateCtrl.statusEstate)
router.delete('/:id', estateCtrl.deleteEstate)

export default router