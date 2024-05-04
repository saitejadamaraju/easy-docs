
import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { fetchUserDetails,provideAccessToDocument } from '../controllers/user.controller.js';

const router= express.Router();

router.get('/details',protectRoute,fetchUserDetails);
router.put('/access',protectRoute,provideAccessToDocument);

export default router;