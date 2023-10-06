import express from 'express';
import { getAllMedicines, addMedicine, updateMedicine } from '../controllers/medicineController';

const router = express.Router();

router.get('/', getAllMedicines);
router.post('/', addMedicine);
router.put('/:id', updateMedicine);

export default router;