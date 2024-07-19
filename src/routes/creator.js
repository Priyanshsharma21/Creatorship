import express from 'express';
import { completeProfile, updateProfile, forYou, allBusiness, getCreatorById } from '../controllers/creator.js';
import { isLoggesIn } from '../middlewares/auth.js';

const router = express.Router();

router.post('/completeProfile', isLoggesIn, completeProfile);
router.put('/updateProfile/:creatorId', isLoggesIn, updateProfile);
router.get('/foryou/:id', isLoggesIn, forYou);
router.get('/all', isLoggesIn, allBusiness);
router.get('/:id', isLoggesIn, getCreatorById);

export default router;