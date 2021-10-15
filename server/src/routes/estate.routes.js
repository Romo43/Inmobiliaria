import { Router } from 'express'
const router = Router();
import * as estateCtrl from '../controllers/estate.controller'

router.get('/', estateCtrl.home)

export default router