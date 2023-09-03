import { Router } from 'express';
import { getOpenPositions } from '../controllers/DepartmentController';
import { validateDepartmentName } from '../middlewares/department';

const router = Router();

// Define the route and link it to the controller function
router.get('/positions', validateDepartmentName, getOpenPositions);

export default router;