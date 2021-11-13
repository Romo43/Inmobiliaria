import { Router } from "express"
const router = Router()
// Get all employee controllers
import * as employeeCtrl from "../controllers/employee.controller"

// LoginS
router.post("/login", employeeCtrl.login)

export default router