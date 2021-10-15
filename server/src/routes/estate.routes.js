import { Router } from 'express'
const router = Router();
import * as estateCtrl from '../controllers/estate.controller'

router.get('/home', estateCtrl.home)
router.get('/estates', estateCtrl.allEstates)
router.get('*', estateCtrl.error404)

export default router