import express from 'express';
import { completeProfile, updateProfile, forYou, allCreators, getBusinessById } from '../controllers/business.js';
import { isLoggesIn } from '../middlewares/auth.js';

const router = express.Router();

router.post('/completeProfile', isLoggesIn, completeProfile);
router.put('/updateProfile/:businessId', isLoggesIn, updateProfile);
router.get('/foryou/:id', isLoggesIn, forYou);
router.get('/all', isLoggesIn, allCreators);
router.get('/:id', isLoggesIn, getBusinessById);

export default router;